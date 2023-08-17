<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/* Models */
use App\Models\Client;
use App\Models\Logistic;
use App\Models\Stock;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use App\Models\ClaimOrder;

class LogisticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //ID FOR THE USER
        $userId = Auth::id();

        //COMMAND TO SHOW GRAPHIC
        $filterChart = DB::table('orders')
        ->select('model', 'color', DB::raw('SUM(quantity) as total_cantidad'))
        ->groupBy('model', 'color')
        ->where('user_id', $userId)
        ->orderBy('total_cantidad', 'DESC')
        ->limit(3)->get();

        $productsChartLogistic = DB::table('logistics')
        ->join('orders', 'logistics.id_order', '=', 'orders.id')
        ->select('orders.model', 'orders.color', DB::raw('SUM(logistics.quantity) AS total_quantity'))
        ->groupBy('orders.model', 'orders.color')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();

        $productsSold = Order::select('model', 'color', DB::raw('SUM(quantity) as total_quantity'))
        ->groupBy('model', 'color')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();

        $productsRequested = Stock::select('model', 'color', DB::raw('SUM(quantity) as total_quantity'))
        ->groupBy('model', 'color')
        ->orderBy('total_quantity', 'DESC')
        ->limit(3)
        ->get();

        $monthlyCosts = Order::selectRaw('DATE_FORMAT(created_at, "%Y-%m") AS month, SUM(price) AS total_price')
        ->groupBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m")'))
        ->orderBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m")'))
        ->get();

        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myOrders = Order::where('user_id', $userId)->get();

        //SHOW CLAIMORDERS
        /* $myClaims = ClaimOrder::with('Order.user')->whereHas('Order.user')->get(); */

        return Inertia::render('GlobalViews/Dashboard',
        [
            'filterChart' => $filterChart,
            'myOrders' => $myOrders,
            'productsChartLogistic' => $productsChartLogistic,
            'productsSold' => $productsSold,
            'productsRequested' => $productsRequested,
            'monthlyCosts' => $monthlyCosts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(isset($request->receiver)){
            if(isset($request->foto_1)){
                $request->validate([
                    'foto_1' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:1024',
                ]);  
        
                $myFoto ="" ;
                if($request->hasFile('foto_1')){
                    $image = $request->file('foto_1');
                    $routeToImg = 'images/deliveredProduct_img/';
                    $imageName = date('YmdHis'). ".".$image->getClientOriginalExtension();
                    $image->move($routeToImg, $imageName); 
                    $myFoto = $imageName;  
                }
                //------------------------------------------------------------- ADD NEW DATAS IN ORDER_DETAILS TABLE
                $ordersDetail = OrderDetail::where('order_id', $request->order_id)->get();
                foreach($ordersDetail as $detail){
                    $detail->receiver = $request->receiver;
                    $detail->foto_1 = $myFoto;
                    $detail->save();
                
                    $detail->sent_to = $detail->updated_at;
                    $detail->save();
                }
        
            } 

        }else{
            $logisticDetails = new Logistic();
            $logisticDetails->id_order = $request->order_id;
            $logisticDetails->auto = $request->auto;
            $logisticDetails->driver = $request->driver;
            $logisticDetails->route_address = $request->route_address;
            $logisticDetails->quantity = $request->quantity;
            $logisticDetails->save();

            //------------------------------------------------------------- ADD NEW DATAS IN ORDER_DETAILS TABLE
            $ordersDetail = OrderDetail::where('order_id', $logisticDetails->id_order)->get();
            foreach($ordersDetail as $detail){
                $detail->confirmed = $logisticDetails->created_at;
                $detail->save();
            }
        }

        return to_route('logistic.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $userName = Auth::user()->name;

        $routesCountDate = Logistic::selectRaw('DATE(created_at) as date')->where('logistics.driver', $userName)
        ->groupBy('date')->orderBy('date', 'desc')->get();

        $routesCountAuto = Logistic::selectRaw('DATE(created_at) as date, auto')->where('logistics.driver', $userName)
        ->groupBy('date', 'auto')->get();

        $routes = DB::table('logistics')->where('logistics.driver', $userName)
        ->join('orders', 'logistics.id_order', '=', 'orders.id')
        ->join('users', 'orders.user_id', '=', 'users.id')
        ->join('order_details', 'order_details.order_id', '=', 'orders.id')
        ->select('logistics.*', 'orders.model', 'orders.color', 'users.name as client', 'order_details.confirmed', 'order_details.sent_to')
        ->orderBy('order_details.confirmed', 'desc')
        ->get();


        return Inertia::render('Logistic/RoutesDetails', 
            [
                'routesCountDate' => $routesCountDate,
                'routes' => $routes,
                'routesCountAuto' => $routesCountAuto
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Logistic $logistic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Logistic $logistic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logistic $logistic)
    {
        //
    }
}
