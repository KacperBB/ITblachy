<?php

namespace Database\Factories;

use App\Models\JobOffer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobOffer>
 */
class JobOfferFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<JobOffer>
     */
    protected $model = JobOffer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, string|null>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'company' => fake()->company(),
            'category' => fake()->randomElement(['IT', 'Marketing', 'Sprzedaż', 'Finanse']),
            'location' => fake()->randomElement(['Kraków', 'Warszawa', 'Wrocław', 'Zdalnie']),
            'salary' => fake()->optional()->randomElement([
                '8 000 - 12 000 PLN',
                '12 000 - 16 000 PLN',
                '16 000 - 22 000 PLN',
            ]),
            'description' => fake()->sentence(16),
        ];
    }
}
