<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Http\Resources\CartResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $fingerprint = $request->query('fingerprint');
        
        if (!$fingerprint) {
            return response()->json(['error' => 'Fingerprint is required'], 400);
        }
        
        $cart = Cart::with('items.product')
            ->where('fingerprint', $fingerprint)
            ->first();
            
        return response()->json($cart ? new CartResource($cart) : null);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fingerprint' => 'required|string',
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::firstOrCreate(['fingerprint' => $validated['fingerprint']]);
        $product = Product::findOrFail($validated['product_id']);
        
        $existingItem = $cart->items()->where('product_id', $validated['product_id'])->first();
        
        if ($existingItem) {
            $existingItem->update(['quantity' => $existingItem->quantity + $validated['quantity']]);
        } else {
            $cart->addItem($product, $validated['quantity']);
        }
        
        $cart->load('items.product');
        
        return response()->json(new CartResource($cart), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart): JsonResponse
    {
        $cart->load('items.product');
        return response()->json(new CartResource($cart));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fingerprint' => 'required|string',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0',
        ]);

        $cart = Cart::where('fingerprint', $validated['fingerprint'])->first();
        
        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        $product = Product::findOrFail($validated['product_id']);
        
        $existingItem = $cart->items()->where('product_id', $validated['product_id'])->first();
        
        if ($validated['quantity'] === 0) {
            if ($existingItem) {
                $existingItem->delete();
            }
        } else {
            if ($existingItem) {
                $existingItem->update(['quantity' => $validated['quantity']]);
            } else {
                $cart->addItem($product, $validated['quantity']);
            }
        }
        
        $cart->load('items.product');
        return response()->json(new CartResource($cart));
    }

    /**
     * Get the count of items in the cart.
     */
    public function getItemsCount(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fingerprint' => 'required|string',
        ]);

        $cart = Cart::where('fingerprint', $validated['fingerprint'])->first();
        
        if (!$cart) {
            return response()->json(['count' => 0]);
        }

        $count = $cart->items->sum('quantity');
        
        return response()->json(['count' => $count]);
    }
}
