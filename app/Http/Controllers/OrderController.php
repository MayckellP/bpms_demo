<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\User;
use App\Models\Stock;
use App\Models\ClaimOrder;
use App\Models\OrderDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::id();

        /*--------------------------------------------------------------------SQL REGISTER AS CLIENT  */

        /*----------------------------------------SQL ORDERS DELIVERED  */
        $myOrdersCompleted = DB::table('orders')->where('user_id', $user_id)
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed',  
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->whereNotNull('sent_to')->get();

        /*----------------------------------------SQL ORDERS IN PROCCESS  */
        $completeTable = DB::table('orders')->where('user_id', $user_id)
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed',  
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->whereNull('order_details.sent_to')->get();


        /*--------------------------------------------------------------------SQL REGISTER AS LOGISTIC  */

        /*----------------------------------------SQL NEW ORDERS  */
        $allCompleteTable = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed',  
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->whereNull('order_details.confirmed')->get();

        /*----------------------------------------SQL ORDERS IN PROCCESS  */
        $allOrdersInProcess = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed',  
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->whereNotNull('order_details.confirmed')->whereNull('order_details.sent_to')->get();

        /*----------------------------------------SQL ORDERS DELIVERED  */
        $allMyOrdersCompleted = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed',  
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->whereNotNull('sent_to')->get();

        $myClients = Order::join('users', 'orders.user_id', '=', 'users.id')
        ->select('users.name', 'orders.user_id')->distinct()->get();

        return Inertia::render('GlobalViews/Orders', 
        [
            'myOrdersCompleted' => $myOrdersCompleted,
            'completeTable' => $completeTable,
            'myClients' => $myClients,
            'allCompleteTable' => $allCompleteTable,
            'allMyOrdersCompleted' => $allMyOrdersCompleted,
            'allOrdersInProcess' => $allOrdersInProcess
        ]);
        
    }

  
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $orderDetailID = $id;
        $user_id = Auth::id();

        $completeTable = DB::table('orders')
        ->join('order_details', 'orders.id', '=', 'order_details.order_id')
        ->select('orders.*', 
        'order_details.confirmed',  
        'order_details.sent_to', 
        'order_details.receiver',
        'foto_1', 'foto_2')->get();
        return Inertia::render('GlobalViews/OrderDetails', 
            [
             'completeTable' => $completeTable, 
             'orderDetailID' => $orderDetailID]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
