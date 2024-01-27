<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fakerFileName = $this->faker->image(
            storage_path("app/data"),
            800,
            600
        );

        return [
            'title' => $fakerFileName,
            'url' => $this->faker->imageUrl(800,600),
            'name' => basename($fakerFileName),
            'path' => $fakerFileName,
        ];
    }
}
