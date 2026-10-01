import { useCart } from '@/context/CartContext';
import type { View } from '@/types';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (view: View) => void;
}

export function CartDrawer({ onNavigate }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--color-ivory)] flex flex-col animate-slide-in-right"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Корзина</h2>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-campaign text-[var(--color-ivory)]">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} aria-label="Закрыть корзину">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={48} className="text-[var(--color-sage)] mb-4" strokeWidth={1} />
            <p className="text-lg font-medium mb-2">Корзина пуста</p>
            <p className="text-sm text-[var(--color-sage)] mb-6">
              Добавьте растения из каталога, чтобы оформить заказ
            </p>
            <button
              onClick={() => {
                closeCart();
                onNavigate({ type: 'catalog' });
              }}
              className="btn-primary"
            >
              В каталог
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 pb-4 border-b border-[var(--color-border)] last:border-0">
                    <button
                      onClick={() => {
                        closeCart();
                        onNavigate({ type: 'product', slug: item.product.slug });
                      }}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-sm"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium mb-0.5">{item.product.name}</h3>
                      <p className="text-xs text-[var(--color-sage)] italic mb-2">
                        {item.product.botanicalName}
                      </p>
                      <p className="text-sm font-semibold mb-2">
                        {item.product.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:text-campaign transition-colors"
                            aria-label="Уменьшить"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:text-campaign transition-colors"
                            aria-label="Увеличить"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-[var(--color-sage)] hover:text-red-600 transition-colors"
                          aria-label="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] px-6 py-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-sage)]">Товары ({totalItems})</span>
                <span className="font-medium">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-sage)]">Доставка</span>
                <span className="text-[var(--color-sage)]">Рассчитывается при оформлении</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                <span className="text-base font-medium">Итого</span>
                <span className="text-xl font-semibold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <button className="btn-primary w-full">
                Оформить заказ
              </button>
              <button
                onClick={clearCart}
                className="w-full text-sm text-[var(--color-sage)] hover:text-red-600 transition-colors text-center"
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
