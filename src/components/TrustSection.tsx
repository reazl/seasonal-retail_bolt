import { Truck, CreditCard, Package, Heart } from 'lucide-react';

export function TrustSection() {
  const items = [
    {
      icon: Truck,
      title: 'Доставка',
      text: 'По Москве — 1–2 дня, по России — 3–7 дней. Самовывоз от бесплатного склада в центре.',
    },
    {
      icon: CreditCard,
      title: 'Оплата',
      text: 'Картой онлайн, через СБП или наличными при получении. Безналичный расчёт для юр. лиц.',
    },
    {
      icon: Package,
      title: 'Упаковка',
      text: 'Каждое растение фиксируется в горшке и упаковывается в защитную плёнку. Ручная проверка перед отправкой.',
    },
    {
      icon: Heart,
      title: 'Уход после доставки',
      text: 'Инструкция по уходу прилагается к каждому растению. Поддержка в чате — 7 дней после получения.',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[var(--color-ivory)] border-t border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {items.map((item) => (
            <div key={item.title}>
              <item.icon size={28} className="text-campaign mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-sage)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
