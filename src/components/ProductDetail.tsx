import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCampaign } from '@/context/CampaignContext';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import type { Product, View } from '@/types';
import { ArrowLeft, Plus, Minus, Check, Truck, Shield, Sun, Droplets, Thermometer } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  slug: string;
  onNavigate: (view: View) => void;
}

export function ProductDetail({ slug, onNavigate }: ProductDetailProps) {
  const product = getProductBySlug(slug);
  const { addItem, lastAdded } = useCart();
  const { activeCampaign } = useCampaign();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 text-center">
        <p className="text-lg text-[var(--color-sage)] mb-4">Товар не найден</p>
        <button onClick={() => onNavigate({ type: 'catalog' })} className="btn-primary">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const justAdded = lastAdded === product.id;

  const careInfo = [
    { icon: Sun, label: 'Свет', value: product.care.light },
    { icon: Droplets, label: 'Полив', value: product.care.water },
    { icon: Thermometer, label: 'Температура', value: product.care.temperature },
  ];

  return (
    <div className="py-8 lg:py-12 bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <button
          onClick={() => onNavigate({ type: 'catalog' })}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-sage)] hover:text-campaign transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Назад в каталог
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm mb-3">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-24 overflow-hidden rounded-sm border-2 transition-colors ${
                      activeImage === idx ? 'border-campaign' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              {product.seasonalTags.includes(activeCampaign.id as never) && (
                <span
                  className="px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-full"
                  style={{ background: 'var(--campaign-accent)', color: 'var(--color-ivory)' }}
                >
                  {activeCampaign.badge}
                </span>
              )}
              <span className="text-xs text-[var(--color-sage)]">
                {product.availability === 'in-stock' ? 'В наличии' : product.availability === 'low-stock' ? 'Заканчивается' : 'Предзаказ'}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-medium mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h1>
            <p className="text-[var(--color-sage)] italic mb-6">{product.botanicalName}</p>

            <p className="text-base leading-relaxed mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-[var(--color-border)]">
              <div>
                <p className="text-xs text-[var(--color-sage)] uppercase tracking-wide mb-1">Диаметр горшка</p>
                <p className="text-sm font-medium">{product.potDiameter} см</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-sage)] uppercase tracking-wide mb-1">Высота растения</p>
                <p className="text-sm font-medium">{product.plantHeight} см</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-sage)] uppercase tracking-wide mb-1">Род</p>
                <p className="text-sm font-medium">{product.genus}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-sage)] uppercase tracking-wide mb-1">Сорт</p>
                <p className="text-sm font-medium">{product.variety}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-3xl font-semibold">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:text-campaign transition-colors"
                  aria-label="Уменьшить количество"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 hover:text-campaign transition-colors"
                  aria-label="Увеличить количество"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={() => addItem(product, quantity)}
              className="btn-primary w-full mb-4"
            >
              {justAdded ? (
                <>
                  <Check size={18} /> Добавлено
                </>
              ) : (
                'Добавить в корзину'
              )}
            </button>

            <div className="flex items-center gap-2 text-sm text-[var(--color-sage)] mb-8">
              <Truck size={16} />
              <span>Доставка по Москве — 1–2 дня. Самовывоз — бесплатно.</span>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide mb-4">Уход</h3>
              <div className="space-y-3">
                {careInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon size={18} className="text-campaign mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--color-sage)] uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <Shield size={18} className="text-campaign mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-sage)] uppercase tracking-wide">Влажность</p>
                    <p className="text-sm">{product.care.humidity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <h2 className="section-title mb-8">Вам также понравится</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10">
              {related.map((rp) => (
                <ProductCardMini key={rp.id} product={rp} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCardMini({ product, onNavigate }: { product: Product; onNavigate: (view: View) => void }) {
  return <ProductCard product={product} onNavigate={onNavigate} />;
}
