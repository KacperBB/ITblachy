<?php

use App\Http\Controllers\JobOfferController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('oferty-pracy', [JobOfferController::class, 'browse'])->name('job-offers.browse');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('job-offers', [JobOfferController::class, 'index'])->name('job-offers.index');
    Route::post('job-offers', [JobOfferController::class, 'store'])->name('job-offers.store');
    Route::put('job-offers/{jobOffer}', [JobOfferController::class, 'update'])->name('job-offers.update');
    Route::delete('job-offers/{jobOffer}', [JobOfferController::class, 'destroy'])->name('job-offers.destroy');
});

require __DIR__.'/settings.php';
