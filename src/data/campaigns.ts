import type { CampaignConfig } from '@/types';

export const campaigns: Record<string, CampaignConfig> = {
  evergreen: {
    id: 'evergreen',
    name: 'Ботаника',
    headline: 'Растения, которые остаются с вами',
    supportingText:
      'Тщательно отобранные живые растения для дома и офиса. Каждый экземпляр проверен и упакован с заботой.',
    primaryCta: 'Смотреть каталог',
    heroImage:
      'https://images.pexels.com/photos/9088036/pexels-photo-9088036.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImageMobile:
      'https://images.pexels.com/photos/9088036/pexels-photo-9088036.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: {
      accent: '#18332B',
      accentSecondary: '#A6B29C',
      atmospheric: '#F5F2EB',
      atmosphericDeep: '#E8E4D9',
      textOnAtmospheric: '#202321',
      heroOverlay: 'rgba(32, 35, 33, 0.35)',
    },
    badge: 'Всегда актуально',
    collectionIds: ['evergreen-1', 'evergreen-2', 'evergreen-3', 'evergreen-4'],
    editorial: {
      headline: 'Зелень, которая живёт рядом',
      text: 'Мы выбираем растения, которые приносят радость круглый год — без привязки к сезону или празднику.',
      image:
        'https://images.pexels.com/photos/3153521/pexels-photo-3153521.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  },

  halloween: {
    id: 'halloween',
    name: 'Тёмная сторона растений',
    headline: 'У растений тоже есть тёмная сторона',
    supportingText:
      'Необычные формы, тёмные листья и немного ботанической магии. Собрали растения, которые идеально впишутся в атмосферу Хеллоуина.',
    primaryCta: 'Исследовать коллекцию',
    heroImage:
      'https://images.pexels.com/photos/13750264/pexels-photo-13750264.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImageMobile:
      'https://images.pexels.com/photos/13750264/pexels-photo-13750264.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: {
      accent: '#6B3D5C',
      accentSecondary: '#C97B3F',
      atmospheric: '#1A1A2E',
      atmosphericDeep: '#0F0F1A',
      textOnAtmospheric: '#F5F2EB',
      heroOverlay: 'rgba(15, 15, 26, 0.55)',
    },
    badge: 'Хеллоуин',
    collectionIds: ['halloween-1', 'halloween-2', 'halloween-3', 'halloween-4'],
    editorial: {
      headline: 'Немного мистики. Много ботаники',
      text: 'Тёмные листья, причудливые формы и растения с характером. Те, кто не боится необычного, найдут здесь своё.',
      image:
        'https://images.pexels.com/photos/12875327/pexels-photo-12875327.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    promotionalBanner: 'Осенняя коллекция — тёмная сторона растений',
    startDate: '2025-10-01',
    endDate: '2025-11-01',
  },

  christmas: {
    id: 'christmas',
    name: 'Маленькое чудо в горшке',
    headline: 'Подарите немного живого волшебства',
    supportingText:
      'Праздничные растения, необычные подарки и немного зелени, которая останется с вами после праздников.',
    primaryCta: 'Выбрать подарок',
    heroImage:
      'https://images.pexels.com/photos/6208093/pexels-photo-6208093.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImageMobile:
      'https://images.pexels.com/photos/6208093/pexels-photo-6208093.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: {
      accent: '#2D4A3E',
      accentSecondary: '#8B2331',
      atmospheric: '#1C2B24',
      atmosphericDeep: '#0F1A15',
      textOnAtmospheric: '#F5F2EB',
      heroOverlay: 'rgba(15, 26, 21, 0.5)',
    },
    badge: 'Новый год',
    collectionIds: ['christmas-1', 'christmas-2', 'christmas-3', 'christmas-4'],
    editorial: {
      headline: 'Праздник, который продолжает расти',
      text: 'Живой подарок — это не букет, который завянет через неделю. Это растение, которое будет напоминать о вас месяцами и годами.',
      image:
        'https://images.pexels.com/photos/10537164/pexels-photo-10537164.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    promotionalBanner: 'Живые подарки, которые остаются с вами',
    startDate: '2025-12-01',
    endDate: '2026-01-10',
  },

  valentines: {
    id: 'valentines',
    name: 'Любовь с первого листа',
    headline: 'Чувства, которые продолжают расти',
    supportingText:
      'Необычные растения для тех, кому хочется подарить нечто большее, чем привычный букет.',
    primaryCta: 'Выбрать растение',
    heroImage:
      'https://images.pexels.com/photos/4341924/pexels-photo-4341924.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImageMobile:
      'https://images.pexels.com/photos/4341924/pexels-photo-4341924.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: {
      accent: '#A8455E',
      accentSecondary: '#6B2D3D',
      atmospheric: '#F5EBE8',
      atmosphericDeep: '#E8D5D0',
      textOnAtmospheric: '#202321',
      heroOverlay: 'rgba(168, 69, 94, 0.2)',
    },
    badge: '14 февраля',
    collectionIds: ['valentines-1', 'valentines-2', 'valentines-3', 'valentines-4'],
    editorial: {
      headline: 'Не просто подарок. Маленькая история',
      text: 'Растение растёт вместе с чувствами. Каждый новый лист — напоминание о том, кто его подарил.',
      image:
        'https://images.pexels.com/photos/19897152/pexels-photo-19897152.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    promotionalBanner: 'Вместо букета — растение, которое растёт',
    startDate: '2026-02-01',
    endDate: '2026-02-15',
  },

  spring: {
    id: 'spring',
    name: 'Всё начинается с цветка',
    headline: 'Весна начинается здесь',
    supportingText:
      'Цветущие растения, свежие оттенки и маленькие поводы сделать каждый день красивее.',
    primaryCta: 'Открыть коллекцию',
    heroImage:
      'https://images.pexels.com/photos/36479802/pexels-photo-36479802.jpeg?auto=compress&cs=tinysrgb&w=1600',
    heroImageMobile:
      'https://images.pexels.com/photos/36479802/pexels-photo-36479802.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: {
      accent: '#5B8C5A',
      accentSecondary: '#E8A0BF',
      atmospheric: '#F5F2EB',
      atmosphericDeep: '#EDE8E0',
      textOnAtmospheric: '#202321',
      heroOverlay: 'rgba(91, 140, 90, 0.2)',
    },
    badge: 'Весна',
    collectionIds: ['spring-1', 'spring-2', 'spring-3', 'spring-4'],
    editorial: {
      headline: 'Добавьте жизни в каждый уголок',
      text: 'После долгой зимы зелень ощущается иначе. Свежие листья, нежные цветы — маленькое возрождение на подоконнике.',
      image:
        'https://images.pexels.com/photos/31582039/pexels-photo-31582039.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    promotionalBanner: 'Весенняя коллекция — свежая зелень',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
  },
};

export const campaignOrder: string[] = ['halloween', 'christmas', 'valentines', 'spring'];
export const defaultCampaignId = 'halloween';
