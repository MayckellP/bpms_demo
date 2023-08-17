<?php

namespace App\Http\Controllers;

use App\Models\CartStore;
use Illuminate\Http\Request;

//NEW
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Client;
use App\Models\OrderDetail;
use App\Models\Stock;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class CartStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         //ID FOR THE USER
         $userId = Auth::id();
         $myCarts = CartStore::where('user_id', $userId)->get();
 
         foreach ($myCarts as $myCart) {
             $newOrder = new Order();
             $orderDetail = new OrderDetail();
 
             if($myCart->auxiliar_user === null){
                 $newOrder->user_id = $myCart->user_id;
             } else {
                 $newOrder->user_id = $myCart->auxiliar_user;
             }
             $newOrder->model = $myCart->model;
             $newOrder->price = $myCart->price;
             $newOrder->category = $myCart->category;
             $newOrder->quantity = $myCart->quantity;
             $newOrder->description = $myCart->description; 
             $newOrder->color = $myCart->color;
             $newOrder->image = $myCart->image; 
             $newOrder->address = $myCart->address;   
 
             $newOrder->save();
 
 
             $orderDetail->order_id = $newOrder->id;
 
             $orderDetail->save(); 
         }
 
         $myCarts = CartStore::where('user_id', $userId)->delete();
         
         return to_route('cartUpdate');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //ID FOR THE USER
        $userId = Auth::id();

        //COMMAND TO SHOW THE ORDERS FOR EVERY CLIENT 
        $myCart = CartStore::where('user_id', $userId)->get();

        //CALL STOCK DATABASE
        $stockProduct = Stock::whereIn(DB::raw('(id, model)'), function ($query) {
            $query->select(DB::raw('MIN(id), model'))
                ->from('stocks')
                ->groupBy('model');
        })->get();

        $stockCategory = Stock::select('category')->distinct()->get();
        $stockModel = Stock::select('model')->distinct()->get();
        $mostPopularProduct = Order::select('model', 'color', 'category', 'description', 'image', DB::raw('SUM(quantity) as most_popular'))
        ->groupBy('model', 'color', 'category', 'description', 'price', 'image')
        ->orderByDesc('most_popular')
        ->first(); 
        $stockColor = Stock::all();
        $clients = Client::all();

        return Inertia::render('Client/Store', compact('myCart', 'stockProduct', 'stockColor', 'clients', 'stockCategory', 'stockModel', 'mostPopularProduct'));
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'model' => 'required',
            'price' => 'required',
            'category' => 'required',
            'description' => 'required',
            'quantity' => 'required',
            'color' => 'required',
            'image' => 'required',
            'address' => 'required',
        ]);

        $newOrder = $request->user()->cartOrders()->create($validated);
        /* $newOrder->auxiliar_user = $request->auxiliar_user; */
        $newOrder->save();
        return to_route('cartUpdate');
    }

    /**
     * Display the specified resource.
     */
    public function show(CartStore $cartStore)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartStore $cartStore)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CartStore $cartStore)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table('cart_stores')->where('id', $id)->delete();
        return to_route('cartUpdate');
    }
}
