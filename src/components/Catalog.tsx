import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { Product, FilterState, SortOption, View } from '@/types';
import { products, allGenera, allPotDiameters, priceBounds } from '@/data/products';
import { collections } from '@/data/collections';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';

interface CatalogProps {
  collectionId?: string;
  onNavigate: (view: View) => void;
}

const PAGE_SIZE = 8;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'name-asc', label: 'По названию А–Я' },
  { value: 'name-desc', label: 'По названию Я–А' },
];

export function Catalog({ collectionId, onNavigate }: CatalogProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    genus: '',
    potDiameter: null,
    priceMin: null,
    priceMax: null,
    sort: 'price-asc',
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const activeCollection = collectionId ? collections[collectionId] : null;

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCollection) {
      result = result.filter((p) => activeCollection.productIds.includes(p.id));
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.botanicalName.toLowerCase().includes(q) ||
          p.genus.toLowerCase().includes(q)
      );
    }

    if (filters.genus) {
      result = result.filter((p) => p.genus === filters.genus);
    }

    if (filters.potDiameter !== null) {
      result = result.filter((p) => p.potDiameter === filters.potDiameter);
    }

    if (filters.priceMin !== null) {
      result = result.filter((p) => p.price >= (filters.priceMin as number));
    }
    if (filters.priceMax !== null) {
      result = result.filter((p) => p.price <= (filters.priceMax as number));
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
        break;
    }

    return result;
  }, [filters, activeCollection]);

  const visibleProducts = filtered.slice(0, visibleCount);

  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, collectionId]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.genus ? 1 : 0) +
    (filters.potDiameter !== null ? 1 : 0) +
    (filters.priceMin !== null ? 1 : 0) +
    (filters.priceMax !== null ? 1 : 0);

  const clearFilters = () => {
    setFilters({
      search: '',
      genus: '',
      potDiameter: null,
      priceMin: null,
      priceMax: null,
      sort: filters.sort,
    });
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="py-12 lg:py-16 bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-8">
          {activeCollection ? (
            <>
              <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2 text-campaign">
                Коллекция
              </p>
              <h1 className="section-title mb-2">{activeCollection.name}</h1>
              <p className="text-[var(--color-sage)] max-w-xl">{activeCollection.description}</p>
            </>
          ) : (
            <>
              <h1 className="section-title mb-2">Каталог растений</h1>
              <p className="text-[var(--color-sage)]">
                {filtered.length} {pluralize(filtered.length)} в наличии
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              filters={filters}
              allGenera={allGenera}
              allPotDiameters={allPotDiameters}
              priceBounds={priceBounds}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
              resultCount={filtered.length}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3 mb-6">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-[var(--color-border)] rounded-sm"
              >
                <SlidersHorizontal size={16} />
                Фильтры
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-campaign text-[var(--color-ivory)]">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="hidden lg:block" />

              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-[var(--color-border)] rounded-sm"
                >
                  {sortOptions.find((s) => s.value === filters.sort)?.label}
                  <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 w-56 bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-sm shadow-lg py-1 animate-scale-in">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            updateFilter('sort', opt.value);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-border)]/30 transition-colors ${
                            filters.sort === opt.value ? 'font-medium text-campaign' : ''
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {filters.search && (
                  <FilterChip label={`«${filters.search}»`} onRemove={() => updateFilter('search', '')} />
                )}
                {filters.genus && (
                  <FilterChip label={filters.genus} onRemove={() => updateFilter('genus', '')} />
                )}
                {filters.potDiameter !== null && (
                  <FilterChip label={`Горшок ${filters.potDiameter} см`} onRemove={() => updateFilter('potDiameter', null)} />
                )}
                {filters.priceMin !== null && (
                  <FilterChip label={`от ${filters.priceMin} ₽`} onRemove={() => updateFilter('priceMin', null)} />
                )}
                {filters.priceMax !== null && (
                  <FilterChip label={`до ${filters.priceMax} ₽`} onRemove={() => updateFilter('priceMax', null)} />
                )}
                <button onClick={clearFilters} className="text-xs text-campaign hover:underline ml-1">
                  Очистить всё
                </button>
              </div>
            )}

            {visibleProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-[var(--color-sage)] mb-2">Ничего не найдено</p>
                <p className="text-sm text-[var(--color-sage)] mb-4">Попробуйте изменить параметры фильтра</p>
                <button onClick={clearFilters} className="btn-secondary">
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                ))}
              </div>
            )}

            {hasMore && (
              <div ref={sentinelRef} className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2 text-sm text-[var(--color-sage)]">
                  <div className="w-5 h-5 border-2 border-[var(--color-sage)] border-t-transparent rounded-full animate-spin" />
                  Загрузка...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-[var(--color-ivory)] rounded-t-2xl overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-[var(--color-ivory)] flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <h3 className="text-lg font-medium">Фильтры</h3>
              <button onClick={() => setFilterOpen(false)} aria-label="Закрыть фильтры">
                <X size={22} />
              </button>
            </div>
            <div className="p-5">
              <FilterPanel
                filters={filters}
                allGenera={allGenera}
                allPotDiameters={allPotDiameters}
                priceBounds={priceBounds}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                activeFilterCount={activeFilterCount}
                resultCount={filtered.length}
              />
            </div>
            <div className="sticky bottom-0 bg-[var(--color-ivory)] p-5 border-t border-[var(--color-border)]">
              <button
                onClick={() => setFilterOpen(false)}
                className="btn-primary w-full"
              >
                Показать {filtered.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterPanel({
  filters,
  allGenera,
  allPotDiameters,
  priceBounds,
  updateFilter,
  clearFilters,
  activeFilterCount,
  resultCount,
}: {
  filters: FilterState;
  allGenera: string[];
  allPotDiameters: number[];
  priceBounds: { min: number; max: number };
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  resultCount: number;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-[var(--color-sage)] mb-2">
          Поиск
        </label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-sage)]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Название или род"
            className="input-base pl-9"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-[var(--color-sage)] mb-2">
          Род растения
        </label>
        <select
          value={filters.genus}
          onChange={(e) => updateFilter('genus', e.target.value)}
          className="input-base cursor-pointer"
        >
          <option value="">Все</option>
          {allGenera.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-[var(--color-sage)] mb-2">
          Диаметр горшка
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('potDiameter', null)}
            className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
              filters.potDiameter === null
                ? 'border-campaign text-campaign bg-campaign/5'
                : 'border-[var(--color-border)] hover:border-campaign'
            }`}
          >
            Любой
          </button>
          {allPotDiameters.map((d) => (
            <button
              key={d}
              onClick={() => updateFilter('potDiameter', d)}
              className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
                filters.potDiameter === d
                  ? 'border-campaign text-campaign bg-campaign/5'
                  : 'border-[var(--color-border)] hover:border-campaign'
              }`}
            >
              {d} см
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-[var(--color-sage)] mb-2">
          Цена, ₽
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.priceMin ?? ''}
            onChange={(e) => updateFilter('priceMin', e.target.value ? Number(e.target.value) : null)}
            placeholder={String(priceBounds.min)}
            className="input-base"
          />
          <span className="text-[var(--color-sage)]">—</span>
          <input
            type="number"
            value={filters.priceMax ?? ''}
            onChange={(e) => updateFilter('priceMax', e.target.value ? Number(e.target.value) : null)}
            placeholder={String(priceBounds.max)}
            className="input-base"
          />
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-sm text-campaign hover:underline">
          Очистить фильтры ({activeFilterCount})
        </button>
      )}

      <div className="pt-4 border-t border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-sage)]">
          Найдено: <span className="font-medium text-[var(--color-near-black)]">{resultCount}</span>
        </p>
      </div>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-[var(--color-border)]/40">
      {label}
      <button onClick={onRemove} className="hover:text-campaign" aria-label="Удалить фильтр">
        <X size={12} />
      </button>
    </span>
  );
}

function pluralize(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'растений';
  if (mod10 === 1) return 'растение';
  if (mod10 >= 2 && mod10 <= 4) return 'растения';
  return 'растений';
}
