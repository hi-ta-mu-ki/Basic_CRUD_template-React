<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\B_master;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\ProfileUpdateRequest;
use Illuminate\Support\Facades\Log;

class B_mastersController extends Controller
{
    //
    public function list(Request $request)
    {
        $filter = $request->query('filter');

        if($filter){
            return B_master::where('name','LIKE','%'.$filter.'%')->orderBy('id')->paginate(10);
        }
        // Log::debug(B_master::orderBy('id')->paginate(10));
        return response()->json(B_master::orderBy('id')->paginate(10));
    }

    public function get($b_master)
    {
        // Log::debug(B_master::find($b_master));
        return response()->json(B_master::find($b_master));
    }

    public function update(Request $request, B_master $b_master)
    {
        $b_master->update($request->all());
        return $b_master;
    }

    public function create(Request $request)
    {
        return B_master::create([
            'name' => $request->name,
            'tel' => $request->tel,
        ]);

    }

    public function delete(B_master $b_master)
    {
        $b_master->delete();
        return $b_master;
    }

}