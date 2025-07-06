<?php

use App\Http\Controllers\CartController;

Route::apiResource('cart', CartController::class);
Route::get('/cart/items/count', [CartController::class, 'getItemsCount']);
