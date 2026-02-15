import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

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

type OfferFormData = {
    title: string;
    company: string;
    category: string;
    location: string;
    salary: string;
    description: string;
};

type FilterState = {
    search: string;
    category: string;
    location: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Oferty pracy',
        href: '/job-offers',
    },
];

const emptyForm = (): OfferFormData => ({
    title: '',
    company: '',
    category: '',
    location: '',
    salary: '',
    description: '',
});

export default function JobOffersIndex({
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
    const [editingId, setEditingId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [location, setLocation] = useState(filters.location ?? '');

    const createForm = useForm<OfferFormData>(emptyForm());
    const editForm = useForm<OfferFormData>(emptyForm());

    const currentFilters = (): FilterState => ({ search, category, location });

    const submitFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get('/job-offers', currentFilters(), {
            preserveState: true,
            replace: true,
        });
    };

    const startEdit = (offer: JobOffer) => {
        setEditingId(offer.id);

        editForm.setData({
            title: offer.title,
            company: offer.company,
            category: offer.category ?? '',
            location: offer.location,
            salary: offer.salary ?? '',
            description: offer.description ?? '',
        });

        editForm.clearErrors();
    };

    const cancelEdit = () => {
        setEditingId(null);
        editForm.reset();
        editForm.clearErrors();
    };

    const createOffer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createForm.post('/job-offers', {
            data: {
                ...createForm.data,
                ...currentFilters(),
            },
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset(
                    'title',
                    'company',
                    'category',
                    'location',
                    'salary',
                    'description',
                );
            },
        });
    };

    const updateOffer = (event: FormEvent<HTMLFormElement>, offerId: number) => {
        event.preventDefault();

        editForm.put(`/job-offers/${offerId}`, {
            data: {
                ...editForm.data,
                ...currentFilters(),
            },
            preserveScroll: true,
            onSuccess: () => cancelEdit(),
        });
    };

    const deleteOffer = (offerId: number) => {
        router.delete(`/job-offers/${offerId}`, {
            data: currentFilters(),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Oferty pracy" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Dodaj ofertę pracy</CardTitle>
                        <CardDescription>
                            Uzupełnij podstawowe informacje o ofercie.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={createOffer}
                            className="grid gap-4 md:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="title">Stanowisko</Label>
                                <Input
                                    id="title"
                                    value={createForm.data.title}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Frontend Developer"
                                />
                                <InputError message={createForm.errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="company">Firma</Label>
                                <Input
                                    id="company"
                                    value={createForm.data.company}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'company',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="ACME Sp. z o.o."
                                />
                                <InputError
                                    message={createForm.errors.company}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Kategoria</Label>
                                <Input
                                    id="category"
                                    value={createForm.data.category}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'category',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="IT"
                                />
                                <InputError
                                    message={createForm.errors.category}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Lokalizacja</Label>
                                <Input
                                    id="location"
                                    value={createForm.data.location}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'location',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Kraków / zdalnie"
                                />
                                <InputError
                                    message={createForm.errors.location}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="salary">Wynagrodzenie</Label>
                                <Input
                                    id="salary"
                                    value={createForm.data.salary}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'salary',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="12 000 - 16 000 PLN"
                                />
                                <InputError message={createForm.errors.salary} />
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="description">Opis</Label>
                                <Input
                                    id="description"
                                    value={createForm.data.description}
                                    onChange={(event) =>
                                        createForm.setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Zakres obowiązków i wymagania"
                                />
                                <InputError
                                    message={createForm.errors.description}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Button
                                    type="submit"
                                    disabled={createForm.processing}
                                >
                                    Dodaj ofertę
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista ofert</CardTitle>
                        <CardDescription>
                            Filtruj po kategorii i lokalizacji oraz szukaj po
                            tytule i treści.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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

                            <Button type="submit" variant="outline">
                                Filtruj
                            </Button>
                        </form>

                        <div className="overflow-x-auto rounded-md border">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/50 text-left">
                                    <tr>
                                        <th className="px-3 py-2">Stanowisko</th>
                                        <th className="px-3 py-2">Firma</th>
                                        <th className="px-3 py-2">Kategoria</th>
                                        <th className="px-3 py-2">Lokalizacja</th>
                                        <th className="px-3 py-2">Wynagrodzenie</th>
                                        <th className="px-3 py-2">Opis</th>
                                        <th className="px-3 py-2 text-right">
                                            Akcje
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offers.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-3 py-6 text-center text-muted-foreground"
                                            >
                                                Brak ofert spełniających
                                                kryteria.
                                            </td>
                                        </tr>
                                    )}

                                    {offers.map((offer) => {
                                        const isEditing = editingId === offer.id;

                                        if (isEditing) {
                                            return (
                                                <tr
                                                    key={offer.id}
                                                    className="border-t align-top"
                                                >
                                                    <td
                                                        colSpan={7}
                                                        className="px-3 py-3"
                                                    >
                                                        <form
                                                            onSubmit={(event) =>
                                                                updateOffer(
                                                                    event,
                                                                    offer.id,
                                                                )
                                                            }
                                                            className="grid gap-3 md:grid-cols-2"
                                                        >
                                                            <div className="grid gap-1">
                                                                <Label
                                                                    htmlFor={`edit-title-${offer.id}`}
                                                                >
                                                                    Stanowisko
                                                                </Label>
                                                                <Input
                                                                    id={`edit-title-${offer.id}`}
                                                                    value={editForm.data.title}
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        editForm.setData(
                                                                            'title',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={editForm.errors.title}
                                                                />
                                                            </div>

                                                            <div className="grid gap-1">
                                                                <Label
                                                                    htmlFor={`edit-company-${offer.id}`}
                                                                >
                                                                    Firma
                                                                </Label>
                                                                <Input
                                                                    id={`edit-company-${offer.id}`}
                                                                    value={editForm.data.company}
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        editForm.setData(
                                                                            'company',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={editForm.errors.company}
                                                                />
                                                            </div>

                                                            <div className="grid gap-1">
                                                                <Label
                                                                    htmlFor={`edit-category-${offer.id}`}
                                                                >
                                                                    Kategoria
                                                                </Label>
                                                                <Input
                                                                    id={`edit-category-${offer.id}`}
                                                                    value={editForm.data.category}
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        editForm.setData(
                                                                            'category',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={editForm.errors.category}
                                                                />
                                                            </div>

                                                            <div className="grid gap-1">
                                                                <Label
                                                                    htmlFor={`edit-location-${offer.id}`}
                                                                >
                                                                    Lokalizacja
                                                                </Label>
                                                                <Input
                                                                    id={`edit-location-${offer.id}`}
                                                                    value={editForm.data.location}
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        editForm.setData(
                                                                            'location',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={editForm.errors.location}
                                                                />
                                                            </div>

                                                            <div className="grid gap-1">
                                                                <Label
                                                                    htmlFor={`edit-salary-${offer.id}`}
                                                                >
                                                                    Wynagrodzenie
                                                                </Label>
                                                                <Input
                                                                    id={`edit-salary-${offer.id}`}
                                                                    value={editForm.data.salary}
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        editForm.setData(
                                                                            'salary',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={editForm.errors.salary}
                                                                />
                                                            </div>

                                                            <div className="grid gap-1 md:col-span-2">
                                                                <Label
                                                                    htmlFor={`edit-description-${offer.id}`}
                                                                >
                                                                    Opis
                                                                </Label>
                                                                <Input
                                                                    id={`edit-description-${offer.id}`}
                                                                    value={editForm.data.description}
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        editForm.setData(
                                                                            'description',
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={editForm.errors.description}
                                                                />
                                                            </div>

                                                            <div className="flex gap-2 md:col-span-2">
                                                                <Button
                                                                    type="submit"
                                                                    disabled={editForm.processing}
                                                                >
                                                                    Zapisz
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    onClick={cancelEdit}
                                                                >
                                                                    Anuluj
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return (
                                            <tr
                                                key={offer.id}
                                                className="border-t"
                                            >
                                                <td className="px-3 py-2">
                                                    {offer.title}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {offer.company}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {offer.category ?? '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {offer.location}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {offer.salary ?? '-'}
                                                </td>
                                                <td className="max-w-md truncate px-3 py-2">
                                                    {offer.description ?? '-'}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                startEdit(offer)
                                                            }
                                                        >
                                                            Edytuj
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                deleteOffer(
                                                                    offer.id,
                                                                )
                                                            }
                                                        >
                                                            Usuń
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
