<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/* Models */
use App\Models\Client;
use App\Models\Stock;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use App\Models\ClaimOrder;



class ClientController extends Controller
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
        $stock = Stock::all();
        $filterStock = Stock::distinct()->pluck('model');
        return Inertia::render('Client/QuickPurchase', compact('stock', 'filterStock'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'model' => 'required',
            'category' => 'required',
            'quantity' => 'required',
            'color' => 'required',
            'address' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'required'
        ]);

        $showID = $request->user()->orders()->create($validated);

        
        $orderDetail = new OrderDetail();

        $orderDetail->order_id = $showID->id;;
        $orderDetail->created_at = $showID->created_at;

        $orderDetail->save(); 

        return to_route('client.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
