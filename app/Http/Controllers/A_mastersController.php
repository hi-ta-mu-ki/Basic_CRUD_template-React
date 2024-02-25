<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\A_master;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\ProfileUpdateRequest;
use Illuminate\Support\Facades\Log;

class A_mastersController extends Controller
{
    //
    public function list(Request $request)
    {
        $filter = $request->query('filter');

        if($filter){
            return A_master::where('name','LIKE','%'.$filter.'%')->orderBy('id')->paginate(10);
        }
        // Log::debug(A_master::orderBy('id')->paginate(10));
        return response()->json(A_master::orderBy('id')->paginate(10));
    }

    public function get($a_master)
    {
        // Log::debug(A_master::find($a_master));
        return response()->json(A_master::find($a_master));
    }

    public function update(Request $request, A_master $a_master)
    {
        $a_master->update($request->all());
        return $a_master;
    }

    public function create(Request $request)
    {
        return A_master::create([
            'name' => $request->name,
            'price' => $request->price,
        ]);

    }

    public function delete(A_master $a_master)
    {
        $a_master->delete();
        return $a_master;
    }

}