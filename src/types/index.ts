export type SeasonalTag =
  | 'halloween'
  | 'christmas'
  | 'valentines'
  | 'spring'
  | 'evergreen';

export type ProductAvailability = 'in-stock' | 'low-stock' | 'pre-order';

export interface Product {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  genus: string;
  variety: string;
  price: number;
  potDiameter: number;
  plantHeight: number;
  images: string[];
  description: string;
  care: {
    light: string;
    water: string;
    humidity: string;
    temperature: string;
  };
  collectionIds: string[];
  seasonalTags: SeasonalTag[];
  availability: ProductAvailability;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
}

export interface CampaignColors {
  accent: string;
  accentSecondary: string;
  atmospheric: string;
  atmosphericDeep: string;
  textOnAtmospheric: string;
  heroOverlay: string;
}

export interface EditorialSection {
  headline: string;
  text: string;
  image: string;
}

export interface CampaignConfig {
  id: string;
  name: string;
  headline: string;
  supportingText: string;
  primaryCta: string;
  heroImage: string;
  heroImageMobile: string;
  colors: CampaignColors;
  badge: string;
  collectionIds: string[];
  editorial: EditorialSection;
  promotionalBanner?: string;
  startDate?: string;
  endDate?: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface FilterState {
  search: string;
  genus: string;
  potDiameter: number | null;
  priceMin: number | null;
  priceMax: number | null;
  sort: SortOption;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type View =
  | { type: 'home' }
  | { type: 'catalog'; collectionId?: string }
  | { type: 'product'; slug: string };
