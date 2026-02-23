<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        \App\Models\Student::create([
            'name' => 'Juan Pérez',
            'id_card' => '12345678',
            'grade' => '10A',
            'test_status' => 'completada',
        ]);

        \App\Models\Student::create([
            'name' => 'María García',
            'id_card' => '87654321',
            'grade' => '11B',
            'test_status' => 'pendiente',
        ]);

        \App\Models\Student::create([
            'name' => 'Carlos López',
            'id_card' => '11223344',
            'grade' => '10A',
            'test_status' => 'en_progreso',
        ]);
    }
}
