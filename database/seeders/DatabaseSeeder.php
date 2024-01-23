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

        $users[] = $kosuke;


        foreach ($users as $user) {
            Post::factory(2)->create([
                'user_id' => ($user['id']),
                'category_id' => random_int(1, count($categories)),
            ]);
        }
    }
//        foreach ($users as $user) {
//            $posts = \App\Models\Post::factory(3)
//                ->create([
//                    'user_id' => $user['id'],
//                    'category_id' => rand(1, count($categories)),
//                ]);
//
//            \App\Models\Comment::factory(2)
//                ->create([
//                    'post_id' => rand($posts[0]['id'], $posts[count($posts)-1]['id']),
//                    'user_id' => rand($users[0]['id'], $users[count($users)-1]['id']),
//                ]);
//        }
}
