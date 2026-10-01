import type { Collection } from '@/types';

export const collections: Record<string, Collection> = {
  // Evergreen collections
  'evergreen-1': {
    id: 'evergreen-1',
    name: 'Неприхотливые',
    description: 'Растения, которые простят небольшую невнимательность',
    image:
      'https://images.pexels.com/photos/10651639/pexels-photo-10651639.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p01', 'p02', 'p03', 'p04', 'p05'],
  },
  'evergreen-2': {
    id: 'evergreen-2',
    name: 'Крупномеры',
    description: 'Растения для просторных интерьеров',
    image:
      'https://images.pexels.com/photos/6208093/pexels-photo-6208093.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p06', 'p07', 'p08', 'p09'],
  },
  'evergreen-3': {
    id: 'evergreen-3',
    name: 'Декоративнолистные',
    description: 'Красота в каждом листе',
    image:
      'https://images.pexels.com/photos/8563721/pexels-photo-8563721.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p10', 'p11', 'p12', 'p13', 'p14'],
  },
  'evergreen-4': {
    id: 'evergreen-4',
    name: 'Цветущие',
    description: 'Растения, которые радуют цветением',
    image:
      'https://images.pexels.com/photos/10537164/pexels-photo-10537164.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p15', 'p16', 'p17', 'p18'],
  },

  // Halloween collections
  'halloween-1': {
    id: 'halloween-1',
    name: 'Тёмная сторона',
    description: 'Растения с тёмными листьями и мистической атмосферой',
    image:
      'https://images.pexels.com/photos/13750264/pexels-photo-13750264.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p10', 'p11', 'p12', 'p13', 'p14'],
  },
  'halloween-2': {
    id: 'halloween-2',
    name: 'Ведьмин сад',
    description: 'Причудливые формы и необычные текстуры',
    image:
      'https://images.pexels.com/photos/12875327/pexels-photo-12875327.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p15', 'p16', 'p19', 'p20'],
  },
  'halloween-3': {
    id: 'halloween-3',
    name: 'Маленькие монстры',
    description: 'Колючие, зубастые и немного пугающие',
    image:
      'https://images.pexels.com/photos/1058963/pexels-photo-1058963.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p19', 'p20', 'p21', 'p22'],
  },
  'halloween-4': {
    id: 'halloween-4',
    name: 'Растения-призраки',
    description: 'Светлые, почти прозрачные листья',
    image:
      'https://images.pexels.com/photos/15322039/pexels-photo-15322039.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p05', 'p11', 'p14', 'p23'],
  },

  // Christmas collections
  'christmas-1': {
    id: 'christmas-1',
    name: 'Живые подарки',
    description: 'Растения, которые дарят радость месяцами',
    image:
      'https://images.pexels.com/photos/6208093/pexels-photo-6208093.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p06', 'p07', 'p15', 'p16', 'p17'],
  },
  'christmas-2': {
    id: 'christmas-2',
    name: 'Праздничная зелень',
    description: 'Зимние растения для уютного дома',
    image:
      'https://images.pexels.com/photos/10651639/pexels-photo-10651639.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p01', 'p02', 'p03', 'p08', 'p09'],
  },
  'christmas-3': {
    id: 'christmas-3',
    name: 'Маленькие чудеса',
    description: 'Компактные растения с большим характером',
    image:
      'https://images.pexels.com/photos/773804/pexels-photo-773804.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p20', 'p21', 'p22', 'p23', 'p24'],
  },
  'christmas-4': {
    id: 'christmas-4',
    name: 'Для уютного дома',
    description: 'Растения, которые делают дом теплее',
    image:
      'https://images.pexels.com/photos/7663968/pexels-photo-7663968.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p04', 'p05', 'p10', 'p18', 'p24'],
  },

  // Valentine's Day collections
  'valentines-1': {
    id: 'valentines-1',
    name: 'Любовь с первого листа',
    description: 'Растения с нежными листьями и тёплыми оттенками',
    image:
      'https://images.pexels.com/photos/19897152/pexels-photo-19897152.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p10', 'p11', 'p12', 'p14', 'p23'],
  },
  'valentines-2': {
    id: 'valentines-2',
    name: 'Растения с характером',
    description: 'Для тех, кто ценит необычное',
    image:
      'https://images.pexels.com/photos/5672795/pexels-photo-5672795.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p07', 'p13', 'p15', 'p19', 'p20'],
  },
  'valentines-3': {
    id: 'valentines-3',
    name: 'Вместо букета',
    description: 'Живой подарок, который не завянет через неделю',
    image:
      'https://images.pexels.com/photos/4341924/pexels-photo-4341924.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p15', 'p16', 'p17', 'p18'],
  },
  'valentines-4': {
    id: 'valentines-4',
    name: 'Для особенного человека',
    description: 'Растения, которые говорят за вас',
    image:
      'https://images.pexels.com/photos/36479802/pexels-photo-36479802.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p06', 'p08', 'p10', 'p17', 'p24'],
  },

  // Spring collections
  'spring-1': {
    id: 'spring-1',
    name: 'Цветущая весна',
    description: 'Растения, которые празднуют пробуждение',
    image:
      'https://images.pexels.com/photos/36479802/pexels-photo-36479802.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p15', 'p16', 'p17', 'p18', 'p24'],
  },
  'spring-2': {
    id: 'spring-2',
    name: 'Новая зелень',
    description: 'Свежие листья и молодые побеги',
    image:
      'https://images.pexels.com/photos/9088036/pexels-photo-9088036.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p01', 'p06', 'p07', 'p08', 'p10'],
  },
  'spring-3': {
    id: 'spring-3',
    name: 'Для обновления интерьера',
    description: 'Привнесите весну в свой дом',
    image:
      'https://images.pexels.com/photos/3153521/pexels-photo-3153521.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p02', 'p03', 'p04', 'p09', 'p11'],
  },
  'spring-4': {
    id: 'spring-4',
    name: 'Маленькие радости',
    description: 'Компактные растения для улыбки',
    image:
      'https://images.pexels.com/photos/21624322/pexels-photo-21624322.jpeg?auto=compress&cs=tinysrgb&w=800',
    productIds: ['p20', 'p21', 'p22', 'p23', 'p24'],
  },
};
