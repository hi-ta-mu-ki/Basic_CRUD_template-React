<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\ProfileUpdateRequest;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    //
    public function list(Request $request)
    {
        $filter = $request->query('filter');

        if($filter){
            return User::where('name','LIKE','%'.$filter.'%')->orderBy('id')->paginate(10);
        }
        // Log::debug(User::orderBy('id')->paginate(10));
        return response()->json(User::orderBy('id')->paginate(10));
    }

    public function get($user)
    {
        // Log::debug(User::find($user));
        return response()->json(User::find($user));
    }

    public function update(ProfileUpdateRequest $request, User $user)
    {
        $request->user()->fill($request->validated());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        $item = $request->all();
        $item['password'] = Hash::make($request['password_raw']);
        if ($item['role'] == 1 || $item['role'] == 5) {
            $item['password_raw'] = "";
        }
        $user->update($item);
        return $user;
    }

    public function create(ProfileUpdateRequest $request)
    {
        $password = Hash::make($request['password_raw']);
        if ($request->role == 1 || $request->role == 5) {
            $item['password_raw'] = "";
        }

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $password,
            'password_raw' => $request->password_raw
        ]);

    }

    public function delete(User $user)
    {
        $user->delete();
        return $user;
    }

}