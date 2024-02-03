<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Comment;
use App\Models\Post;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => fake()->realText(50, random_int(1, 2)),
            'message' => fake()->realText(1000, random_int(4,5)),
            'excerpt' => fake()->realText(),
            'published' => true,
            'published_at' => now(),
        ];


    }

    /**
     * Creating a post and comment as well.
     */
    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            // Get all user IDs except the post's author
            $otherUserIds = User::where('id', '<>', $post->user_id)->pluck('id');
            for ($i = 0; $i < 3; $i++) {
                Comment::factory()
                    ->count(1)
                    ->create([
                        'post_id' => $post->id,
                        // Select a random user ID from the $otherUserIds.
                        'user_id' => random_int(1, count($otherUserIds)),
                    ]);
            };
        });
    }
}
