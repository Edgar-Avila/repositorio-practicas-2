<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
        ->count(5)
        ->state(['rol' => 'CLIENTE'])
        ->create();

        User::factory()
        ->count(5)
        ->state(['rol' => 'VENDEDOR'])
        ->create();

        User::factory()->testAdmin()->create();
        User::factory()->testVendedor()->create();
    }
}
