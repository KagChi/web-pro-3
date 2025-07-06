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
    public function index(): JsonResponse
    {
        $carts = Cart::with('items.product')->get();
        return response()->json(CartResource::collection($carts));
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
    public function update(Request $request, Cart $cart): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        
        if ($validated['quantity'] === 0) {
            $cart->removeItem($product);
        } else {
            $cart->addItem($product, $validated['quantity']);
        }
        
        $cart->load('items.product');
        return response()->json(new CartResource($cart));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart): JsonResponse
    {
        $cart->delete();
        return response()->json(null, 204);
    }
}
