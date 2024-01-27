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
            'title' => fake()->sentence(),
            'message' => fake()->paragraph(20),
            'excerpt' => fake()->realText(),
            'published' =>true,
            'published_at' =>now(),
        ];


    }

    /**
     * Creating comment too.
     */
    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            // Get all user IDs except the post's author
            $otherUserIds = User::where('id', '<>', $post->user_id)->pluck('id');
            Comment::factory()
                ->count(3)
                ->create([
                    'post_id' => $post->id,
                    // Select a random user ID from the list
                    'user_id' => $otherUserIds->random(),
                ]);
        });
    }
}
