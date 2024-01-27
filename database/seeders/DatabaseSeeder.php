<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = \App\Models\User::factory(3)->create();

        $categories = \App\Models\Category::factory(10)->create();

        $kosuke = User::factory()->create([
            'name' => 'kosuke',
            'email' => 'kosuke@mail.com',
            'password' => 'password',
        ]);
        $dummy = User::factory()->create([
            'name' => 'dummy',
            'email' => 'dummy@mail.com',
            'password' => 'password',
        ]);

        $users[] = $kosuke;
        $users[] = $dummy;

        $users = \App\Models\Image::factory(3)->create();

        foreach ($users as $user) {
            Post::factory(2)->create([
                'user_id' => ($user['id']),
                'category_id' => random_int(1, count($categories)),
            ]);
        }
    }
}
