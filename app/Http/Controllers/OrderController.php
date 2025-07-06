<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fingerprint' => 'required|string',
        ]);

        $orders = Order::where('fingerprint', $validated['fingerprint'])->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'cart_id' => 'required|exists:carts,id',
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone' => 'nullable|string|max:20',
                'address' => 'required|string|max:500',
                'city' => 'required|string|max:100',
                'postal_code' => 'required|string|max:20',
                'fingerprint' => 'required|string',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        try {
            return \DB::transaction(function () use ($validated) {
                $cart = Cart::with('items.product')->findOrFail($validated['cart_id']);
                $totalAmount = $cart->items->sum(fn($item) => $item->product->price * $item->quantity);

                if ($totalAmount <= 0) {
                    return response()->json(['error' => 'Cart is empty or total amount is zero'], 400);
                }

                $order = Order::create(array_merge($validated, ['total_amount' => $totalAmount, 'status' => 'pending']));

                $cart->items->each(function($cartItem) use ($order) {
                    $order->items()->create([
                        'product_id' => $cartItem->product_id,
                        'quantity' => $cartItem->quantity,
                        'price' => round($cartItem->product->price, 2),
                    ]);
                });
                $order->load('items');

                $cart->items()->delete();
                $cart->delete();

                return response()->json(new OrderResource($order));
            });
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json(['error' => 'Failed to create order: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): JsonResponse
    {
        return response()->json(new OrderResource($order));
    }
}
