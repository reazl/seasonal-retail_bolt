import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import type { Product, View } from '@/types';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (view: View) => void;
}

export function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addItem, lastAdded } = useCart();
  const { activeCampaign } = useCampaign();
  const justAdded = lastAdded === product.id;

  const availabilityLabels: Record<string, string> = {
    'in-stock': 'В наличии',
    'low-stock': 'Заканчивается',
    'pre-order': 'Предзаказ',
  };

  return (
    <div className="group flex flex-col">
      <button
        onClick={() => onNavigate({ type: 'product', slug: product.slug })}
        className="relative aspect-[4/5] overflow-hidden rounded-sm mb-3 block w-full"
        aria-label={`${product.name} — открыть карточку`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.availability === 'low-stock' && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase rounded-full bg-[var(--color-ivory)] text-[var(--color-near-black)]">
            Заканчивается
          </span>
        )}
        {product.seasonalTags.includes(activeCampaign.id as never) && (
          <span
            className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase rounded-full"
            style={{
              background: 'var(--campaign-accent)',
              color: 'var(--color-ivory)',
            }}
          >
            {activeCampaign.badge}
          </span>
        )}
      </button>

      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <button
            onClick={() => onNavigate({ type: 'product', slug: product.slug })}
            className="text-left"
          >
            <h3 className="text-sm lg:text-base font-medium leading-tight hover:text-campaign transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-xs text-[var(--color-sage)] mt-0.5 italic">
              {product.botanicalName}
            </p>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--color-sage)] mb-3 mt-1">
          <span>Горшок {product.potDiameter} см</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-sage)]" />
          <span>{product.plantHeight} см</span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-base lg:text-lg font-semibold">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <button
            onClick={() => addItem(product)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-sm transition-all duration-200 hover:scale-105"
            style={{
              background: justAdded ? 'var(--campaign-accent-secondary)' : 'var(--campaign-accent)',
              color: 'var(--color-ivory)',
            }}
            aria-label={`Добавить ${product.name} в корзину`}
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
