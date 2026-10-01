import { useState, useMemo, useRef, useEffect } from 'react';
import type { View } from '@/types';
import { products } from '@/data/products';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
}

export function SearchModal({ open, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.botanicalName.toLowerCase().includes(q) ||
          p.genus.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75]">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose} />
      <div className="absolute top-0 left-0 right-0 bg-[var(--color-ivory)] p-4 sm:p-6 animate-slide-up shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Search size={20} className="text-[var(--color-sage)]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск растений..."
              className="flex-1 text-lg bg-transparent outline-none placeholder:text-[var(--color-sage)]"
            />
            <button onClick={onClose} aria-label="Закрыть поиск">
              <X size={22} />
            </button>
          </div>

          {query.trim() && results.length > 0 && (
            <div className="space-y-1 pb-2">
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onNavigate({ type: 'product', slug: p.slug });
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-sm hover:bg-[var(--color-border)]/30 transition-colors text-left"
                >
                  <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-[var(--color-sage)] italic">{p.botanicalName}</p>
                  </div>
                  <span className="text-sm font-semibold">{p.price.toLocaleString('ru-RU')} ₽</span>
                </button>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <p className="text-sm text-[var(--color-sage)] pb-4">Ничего не найдено</p>
          )}
        </div>
      </div>
    </div>
  );
}
