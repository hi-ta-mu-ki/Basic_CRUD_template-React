<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\A_mastersController;
use App\Http\Controllers\B_mastersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/a_master/list',[A_mastersController::class,'list']);
    Route::post('/a_master/create',[A_mastersController::class,'create']);
    Route::get('/a_master/get/{a_master}',[A_mastersController::class,'get']);
    Route::patch('/a_master/update/{a_master}',[A_mastersController::class,'update']);
    Route::delete('/a_master/delete/{a_master}',[A_mastersController::class,'delete']);

    Route::get('/b_master/list',[B_mastersController::class,'list']);
    Route::post('/b_master/create',[B_mastersController::class,'create']);
    Route::get('/b_master/get/{b_master}',[B_mastersController::class,'get']);
    Route::patch('/b_master/update/{b_master}',[B_mastersController::class,'update']);
    Route::delete('/b_master/delete/{b_master}',[B_mastersController::class,'delete']);

    // Route::get('/transaction/list',[TransactionController::class,'list']);
    // Route::get('/transaction/edit_order/{o1_transaction}',[TransactionController::class,'edit_order']);
    // Route::get('/transaction/add_order/{o1_transaction}',[TransactionController::class,'add_order']);
    // Route::put('/transaction/update/{o2_transaction}',[TransactionController::class,'update']);
    // Route::post('/transaction/create01',[TransactionController::class,'create01']);
    // Route::delete('/transaction/delete01/{o1_transaction}',[TransactionController::class,'delete01']);
    // Route::post('/transaction/create02',[TransactionController::class,'create02']);
    // Route::delete('/transaction/delete02/{o2_transaction}',[TransactionController::class,'delete02']);

    Route::get('/auth/list',[UsersController::class,'list']);
    Route::post('/auth/create',[UsersController::class,'create']);
    Route::get('/auth/get/{user}',[UsersController::class,'get']);
    Route::patch('/auth/update/{user}',[UsersController::class,'update']);
    Route::put('/auth/password/{user}', [PasswordController::class, 'update']);
    Route::delete('/auth/delete/{user}',[UsersController::class,'delete']);

});