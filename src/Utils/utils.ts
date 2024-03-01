
import { IProduct } from '../Interface/IProducts';

export async function filterProducts<T extends IProduct>(products: T[], nutritionGrade: string | null, novaGroup: string | null): Promise<T[]> {
  let filteredProducts: T[] = [...products];

  if (!nutritionGrade && !novaGroup) {
    return Promise.resolve(products);
  }

  if (nutritionGrade) {
    filteredProducts = filteredProducts.filter(product => product.nutrition.score === nutritionGrade.toUpperCase());
  }

  if (novaGroup) {
    filteredProducts = filteredProducts.filter(product => product.nova.score.toString() === novaGroup);
  }

  return Promise.resolve(filteredProducts);
}
