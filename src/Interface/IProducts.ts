export interface IProduct {
  id: string;
  name: string;
  nutrition: {
    score: string;
    title: string;
    servingSize?: string;
    data?: {
      [key: string]: {
        per100g: string;
        perServing: string;
      };
    };
  };
  nova: {
    score: number;
    title: string;
  };
  quantity?: string;
  ingredients?: {
    hasPalmOil?: string;
    isVegan?: boolean;
    isVegetarian?: boolean;
    list: string[];
  };
  ecoScore?: {
    score: string;
    title: string;
  };
}
