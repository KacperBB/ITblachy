<?php

namespace Tests\Feature;

use App\Models\JobOffer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobOfferBrowseTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_browse_page_is_available(): void
    {
        JobOffer::factory()->create();

        $response = $this->get(route('job-offers.browse'));

        $response->assertOk();
    }

    public function test_can_search_offers_by_title_and_description(): void
    {
        JobOffer::factory()->create([
            'title' => 'Senior PHP Developer',
            'description' => 'Budowa API i integracji.',
        ]);

        JobOffer::factory()->create([
            'title' => 'Analityk danych',
            'description' => 'Doświadczenie w PostgreSQL i raportowaniu.',
        ]);

        JobOffer::factory()->create([
            'title' => 'Specjalista HR',
            'description' => 'Rekrutacja i onboarding.',
        ]);

        $titleSearchResponse = $this->get(route('job-offers.browse', ['search' => 'PHP']));
        $titleSearchResponse->assertOk();
        $titleSearchResponse->assertSee('Senior PHP Developer');
        $titleSearchResponse->assertDontSee('Specjalista HR');

        $descriptionSearchResponse = $this->get(route('job-offers.browse', ['search' => 'PostgreSQL']));
        $descriptionSearchResponse->assertOk();
        $descriptionSearchResponse->assertSee('Analityk danych');
        $descriptionSearchResponse->assertDontSee('Specjalista HR');
    }

    public function test_can_filter_offers_by_category_and_location(): void
    {
        JobOffer::factory()->create([
            'title' => 'Frontend React',
            'category' => 'IT',
            'location' => 'Kraków',
        ]);

        JobOffer::factory()->create([
            'title' => 'SEO Specialist',
            'category' => 'Marketing',
            'location' => 'Kraków',
        ]);

        JobOffer::factory()->create([
            'title' => 'Backend Laravel',
            'category' => 'IT',
            'location' => 'Warszawa',
        ]);

        $response = $this->get(route('job-offers.browse', [
            'category' => 'IT',
            'location' => 'Kraków',
        ]));

        $response->assertOk();
        $response->assertSee('Frontend React');
        $response->assertDontSee('SEO Specialist');
        $response->assertDontSee('Backend Laravel');
    }
}
