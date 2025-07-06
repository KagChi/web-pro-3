<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

Route::apiResource('cart', CartController::class);
Route::get('/cart/items/count', [CartController::class, 'getItemsCount']);

Route::apiResource('order', OrderController::class);