
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  badge?: string;
  rating: number;
  reviews: number;
  description?: string;
  images?: string[];
  videos?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 
  | 'home' 
  | 'brincos' 
  | 'colares' 
  | 'pulseiras' 
  | 'aneis' 
  | 'correntes' 
  | 'conjuntos' 
  | 'pulseiras-masculinas' 
  | 'relogios';
