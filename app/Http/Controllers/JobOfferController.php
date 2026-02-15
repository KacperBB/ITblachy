<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobOfferRequest;
use App\Models\JobOffer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class JobOfferController extends Controller
{
    /**
     * Display a listing of job offers.
     */
    public function index(Request $request): Response
    {
        ['search' => $search, 'category' => $category, 'location' => $location] = $this->filters($request);

        $offers = $this->filteredOffersQuery($search, $category, $location)
            ->latest()
            ->get(['id', 'title', 'company', 'category', 'location', 'salary', 'description', 'created_at']);

        $filterOptions = $this->filterOptions();

        return Inertia::render('job-offers/index', [
            'offers' => $offers,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'location' => $location,
            ],
            'categories' => $filterOptions['categories'],
            'locations' => $filterOptions['locations'],
        ]);
    }

    /**
     * Display public job offers browsing page.
     */
    public function browse(Request $request): Response
    {
        ['search' => $search, 'category' => $category, 'location' => $location] = $this->filters($request);

        $offers = $this->filteredOffersQuery($search, $category, $location)
            ->latest()
            ->get(['id', 'title', 'company', 'category', 'location', 'salary', 'description', 'created_at']);

        $filterOptions = $this->filterOptions();

        return Inertia::render('job-offers/browse', [
            'offers' => $offers,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'location' => $location,
            ],
            'categories' => $filterOptions['categories'],
            'locations' => $filterOptions['locations'],
        ]);
    }

    /**
     * Store a newly created job offer in storage.
     */
    public function store(JobOfferRequest $request): RedirectResponse
    {
        JobOffer::create($request->validated());

        return to_route('job-offers.index', [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'location' => $request->string('location')->toString(),
        ]);
    }

    /**
     * Update the specified job offer in storage.
     */
    public function update(JobOfferRequest $request, JobOffer $jobOffer): RedirectResponse
    {
        $jobOffer->update($request->validated());

        return to_route('job-offers.index', [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'location' => $request->string('location')->toString(),
        ]);
    }

    /**
     * Remove the specified job offer from storage.
     */
    public function destroy(Request $request, JobOffer $jobOffer): RedirectResponse
    {
        $jobOffer->delete();

        return to_route('job-offers.index', [
            'search' => $request->string('search')->toString(),
            'category' => $request->string('category')->toString(),
            'location' => $request->string('location')->toString(),
        ]);
    }

    /**
     * @return array{search: string, category: string, location: string}
     */
    private function filters(Request $request): array
    {
        return [
            'search' => trim((string) $request->string('search')),
            'category' => trim((string) $request->string('category')),
            'location' => trim((string) $request->string('location')),
        ];
    }

    private function filteredOffersQuery(string $search, string $category, string $location)
    {
        $searchOperator = $this->searchOperator();

        return JobOffer::query()
            ->when($search !== '', function ($query) use ($search, $searchOperator) {
                $query->where(function ($subQuery) use ($search, $searchOperator) {
                    $subQuery->where('title', $searchOperator, "%{$search}%")
                        ->orWhere('description', $searchOperator, "%{$search}%");
                });
            })
            ->when($category !== '', function ($query) use ($category) {
                $query->where('category', $category);
            })
            ->when($location !== '', function ($query) use ($location) {
                $query->where('location', $location);
            });
    }

    /**
     * @return array{categories: array<int, string>, locations: array<int, string>}
     */
    private function filterOptions(): array
    {
        return [
            'categories' => JobOffer::query()
                ->whereNotNull('category')
                ->where('category', '!=', '')
                ->distinct()
                ->orderBy('category')
                ->pluck('category')
                ->values()
                ->all(),
            'locations' => JobOffer::query()
                ->whereNotNull('location')
                ->where('location', '!=', '')
                ->distinct()
                ->orderBy('location')
                ->pluck('location')
                ->values()
                ->all(),
        ];
    }

    private function searchOperator(): string
    {
        return DB::connection()->getDriverName() === 'pgsql' ? 'ILIKE' : 'LIKE';
    }
}
