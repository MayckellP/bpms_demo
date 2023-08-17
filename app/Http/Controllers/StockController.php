<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

/* Models */
use App\Models\Client;
use App\Models\Stock;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use App\Models\ClaimOrder;

class StockController extends Controller
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

        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myOrders = Order::where('user_id', $userId)->get();

        $monthlyCosts = Order::selectRaw('DATE_FORMAT(created_at, "%Y-%m") AS month, SUM(price) AS total_price')
        ->groupBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m")'))
        ->orderBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m")'))
        ->get();

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
        $request->validate([
            'model' => ['required', 'string'],
            'category' => ['required', 'string'],
            'description' => ['required', 'string'],
            'color' => ['required', 'string'],
            'quantity' => ['required'],
            'price' => ['required'],
            'image' => 'required|image|mimes:png,jpg,jpeg,svg,webp|max:1024'
        ]);

        $myFoto ="";
        if($request->hasFile('image')){
            $image = $request->file('image');
            $routeToImg = 'images/3.warehouse_view/';
            $imageName = date('YmdHis'). ".".$image->getClientOriginalExtension();
            $image->move($routeToImg, $imageName); 
            $myFoto = $imageName;  
        } 
        
        $newProduct = new Stock();
        $newProduct->model = $request->model;
        $newProduct->category = $request->category;
        $newProduct->description = $request->description;
        $newProduct->color = $request->color;
        $newProduct->quantity = $request->quantity;
        $newProduct->price = $request->price;
        $newProduct->image = $myFoto;
        $newProduct->save();

        return Inertia::render('Dept_Warehouse/Stock');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $myStock = Stock::all();
        $limitQuantity = 5000;
        $alertStock = Stock::where('quantity', '<=', $limitQuantity)->get();

        return Inertia::render('Warehouse/Stock', ['myStock' => $myStock, 'alertStock' => $alertStock]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //ID FOR THE USER
        $userId = Auth::id();

        $request->validate([
            'model' => ['required', 'string'],
            'category' => ['required', 'string'],
            'description' => ['required', 'string'],
            'color' => ['required', 'string'],
            'quantity' => ['required'],
        ]);

        $updateData = Stock::find($id);
        $updateData->model = $request->model;
        $updateData->category = $request->category;
        $updateData->description = $request->description;
        $updateData->color = $request->color;
        $updateData->quantity = $request->quantity;
        $updateData->save();

    

    return Redirect::route('orders.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
