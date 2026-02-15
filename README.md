# ITblachy

Projekt Laravel + Inertia + React do zarządzania i przeglądania ofert pracy.

## Wymagania

- PHP 8.2+
- Composer
- Node.js 20+
- npm
- PostgreSQL

## Instalacja

1. Sklonuj repozytorium i przejdź do katalogu projektu.
2. Zainstaluj zależności backendu:

```bash
composer install
```

3. Zainstaluj zależności frontendu:

```bash
npm install
```

4. Skopiuj konfigurację środowiska i ustaw połączenie do PostgreSQL:

```bash
cp .env.example .env
```

5. Wygeneruj klucz aplikacji:

```bash
php artisan key:generate
```

6. Wykonaj migracje:

```bash
php artisan migrate
```

7. (Opcjonalnie) Załaduj przykładowe dane ofert:

```bash
php artisan db:seed --class=JobOfferSeeder
```

## Uruchomienie lokalne

Uruchom backend i frontend w osobnych terminalach:

```bash
php artisan serve
```

```bash
npm run dev
```

Aplikacja:
- panel zarządzania ofertami: `/job-offers` (wymaga logowania)
- strona kliencka z przeglądaniem ofert: `/oferty-pracy`

## Branche

- `main` – stabilna gałąź z działającą aplikacją.
- `feature/job-offers-tests-seed` – gałąź z dodatkowym seedem danych i testami filtrowania/wyszukiwania ofert.

## Architektura (skrót)

- Backend: Laravel 12 (kontrolery, requesty, migracje, seedery, testy).
- Frontend: React + TypeScript przez Inertia (widoki w `resources/js/pages`).
- Baza danych: PostgreSQL (produkcyjnie/lokalnie), testy uruchamiane na SQLite in-memory.
- Routing:
	- `routes/web.php` dla endpointów HTTP,
	- Inertia renderuje strony React.
- Główne moduły ofert pracy:
	- `app/Http/Controllers/JobOfferController.php`
	- `app/Http/Requests/JobOfferRequest.php`
	- `app/Models/JobOffer.php`
	- `resources/js/pages/job-offers/index.tsx`
	- `resources/js/pages/job-offers/browse.tsx`

## Testy

Przygotowanie bazy pod testy manualne (lokalnie):

```bash
php artisan migrate:fresh
php artisan db:seed --class=JobOfferSeeder
```

Pełny zestaw testów:

```bash
php artisan test
```

Tylko testy ofert pracy:

```bash
php artisan test tests/Feature/JobOfferBrowseTest.php
```

Testy z gałęzi `feature/job-offers-tests-seed` sprawdzają:
- dostępność publicznej strony ofert,
- wyszukiwanie po tytule i opisie,
- filtrowanie po kategorii i lokalizacji.
