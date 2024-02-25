<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class B_master extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'tel',
    ];

    // public function o1_transactions()
    // {
    //     return $this->hasMany('App\Models\O1_transaction');
    // }

}
