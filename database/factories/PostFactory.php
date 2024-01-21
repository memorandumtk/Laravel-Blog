<?php

namespace Database\Factories;

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
            'message' => fake()->paragraph(),
        ];


    }

    /**
     * Creating comment too.
     */
    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            Comment::factory()
                ->count(3)
                ->create([
                    'post_id' => $post->id,
                    'user_id' => $post->user_id // Assuming the post has a 'user_id' attribute
                ]);
        });
    }
}
