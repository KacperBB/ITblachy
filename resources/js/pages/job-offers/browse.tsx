import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { dashboard, home, login } from '@/routes';

type JobOffer = {
    id: number;
    title: string;
    company: string;
    category: string | null;
    location: string;
    salary: string | null;
    description: string | null;
    created_at: string;
};

type FilterState = {
    search: string;
    category: string;
    location: string;
};

export default function BrowseJobOffers({
    offers,
    filters,
    categories,
    locations,
}: {
    offers: JobOffer[];
    filters: FilterState;
    categories: string[];
    locations: string[];
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [location, setLocation] = useState(filters.location ?? '');

    const submitFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/oferty-pracy',
            { search, category, location },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <Head title="Oferty pracy" />

            <div className="mx-auto max-w-5xl space-y-6">
                <header className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Oferty pracy
                    </h1>
                    <p className="text-muted-foreground">
                        Przeglądaj oferty, filtruj po kategorii i lokalizacji
                        oraz wyszukuj po tytule i treści.
                    </p>
                    <div className="flex gap-3 text-sm">
                        <Link
                            href={home()}
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            Strona główna
                        </Link>
                        <Link
                            href={login()}
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            Logowanie
                        </Link>
                        <Link
                            href={dashboard()}
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            Panel
                        </Link>
                    </div>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle>Filtry</CardTitle>
                        <CardDescription>
                            Użyj filtrów, aby zawęzić listę ofert.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submitFilters}
                            className="grid gap-2 md:grid-cols-4"
                        >
                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Szukaj po tytule i treści"
                            />

                            <select
                                value={category}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
                            >
                                <option value="">Wszystkie kategorie</option>
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={location}
                                onChange={(event) =>
                                    setLocation(event.target.value)
                                }
                                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
                            >
                                <option value="">Wszystkie lokalizacje</option>
                                {locations.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <Button
                                type="submit"
                                variant="outline"
                            >
                                Filtruj
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <section className="grid gap-4">
                    {offers.length === 0 && (
                        <Card>
                            <CardContent className="py-6 text-center text-muted-foreground">
                                Brak ofert spełniających kryteria.
                            </CardContent>
                        </Card>
                    )}

                    {offers.map((offer) => (
                        <Card key={offer.id}>
                            <CardHeader>
                                <CardTitle>{offer.title}</CardTitle>
                                <CardDescription>
                                    {offer.company} • {offer.category ?? 'Brak kategorii'} • {offer.location}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm">
                                    <span className="font-medium">Wynagrodzenie:</span>{' '}
                                    {offer.salary ?? 'Nie podano'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {offer.description ?? 'Brak opisu.'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </div>
        </div>
    );
}
