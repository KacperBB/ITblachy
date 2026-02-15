<?php

namespace Database\Seeders;

use App\Models\JobOffer;
use Illuminate\Database\Seeder;

class JobOfferSeeder extends Seeder
{
    /**
     * Seed the application's database with a ready-to-test job offers set.
     */
    public function run(): void
    {
        $offers = [
            [
                'title' => 'Frontend Developer React',
                'company' => 'Blue Pixel',
                'category' => 'IT',
                'location' => 'Kraków',
                'salary' => '12 000 - 16 000 PLN',
                'description' => 'Rozwój aplikacji webowych w React i TypeScript.',
            ],
            [
                'title' => 'Backend Developer Laravel',
                'company' => 'CloudForge',
                'category' => 'IT',
                'location' => 'Warszawa',
                'salary' => '14 000 - 20 000 PLN',
                'description' => 'Tworzenie API REST w Laravel oraz integracje z PostgreSQL.',
            ],
            [
                'title' => 'Specjalista SEO',
                'company' => 'MarketBoost',
                'category' => 'Marketing',
                'location' => 'Wrocław',
                'salary' => '7 000 - 10 000 PLN',
                'description' => 'Optymalizacja treści i analiza widoczności organicznej.',
            ],
            [
                'title' => 'Performance Marketing Manager',
                'company' => 'AdSpark',
                'category' => 'Marketing',
                'location' => 'Zdalnie',
                'salary' => '10 000 - 14 000 PLN',
                'description' => 'Prowadzenie kampanii płatnych i optymalizacja ROI.',
            ],
            [
                'title' => 'Regional Sales Manager',
                'company' => 'SellUp',
                'category' => 'Sprzedaż',
                'location' => 'Kraków',
                'salary' => '9 000 - 13 000 PLN + premia',
                'description' => 'Rozwój sprzedaży B2B i budowanie relacji z klientami.',
            ],
            [
                'title' => 'Account Executive',
                'company' => 'BizFlow',
                'category' => 'Sprzedaż',
                'location' => 'Warszawa',
                'salary' => '8 000 - 12 000 PLN + prowizja',
                'description' => 'Pozyskiwanie klientów i prowadzenie procesu sprzedażowego.',
            ],
            [
                'title' => 'Analityk Finansowy',
                'company' => 'FinScope',
                'category' => 'Finanse',
                'location' => 'Wrocław',
                'salary' => '9 000 - 12 500 PLN',
                'description' => 'Analiza wyników finansowych i przygotowywanie raportów.',
            ],
            [
                'title' => 'Kontroler Finansowy',
                'company' => 'LedgerPoint',
                'category' => 'Finanse',
                'location' => 'Zdalnie',
                'salary' => '11 000 - 15 000 PLN',
                'description' => 'Nadzór nad budżetem oraz kontrola kosztów operacyjnych.',
            ],
        ];

        foreach ($offers as $offer) {
            JobOffer::query()->create($offer);
        }
    }
}
