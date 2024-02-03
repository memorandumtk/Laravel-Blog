<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Image;
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
        // Create 3 users.
        $users = \App\Models\User::factory(3)->create();

        // Create 10 Categories.
        $categories = \App\Models\Category::factory(10)->create();

        // For login convenience, Create users, kosuke and dummy.
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

        /**
         * Delete all images in the directory of 'images'.
         */
        $folder_path = "storage/app/images";
        // List of name of files inside
        // specified folder
        $files = glob($folder_path . '/*');
        // Deleting all the files in the list
        foreach ($files as $file) {
            if (is_file($file))
                unlink($file);
        }
        // Create new 10 images.
        $images = Image::factory(10)->create();


        /**
         * Create 10 posts per user.
         */
        // After creating a post, there is a operation to make comments.
        foreach ($users as $user) {
            for ($i = 0; $i < 5; $i++) {
                $random = random_int(1, count($images));
                Post::factory(1)->create([
                    'user_id' => ($user['id']),
                    'image_id' => Image::find($random)->id,
                    'category_id' => random_int(1, count($categories)),
                ]);
            }
        }
    }
}
