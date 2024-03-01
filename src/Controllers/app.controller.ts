import { Controller, Get, Param, Query } from '@nestjs/common';
import { IProduct } from '../Interface/IProducts';
import { scrapeProducts } from '../Scraper/scrapeProducts';
import { scrapeProductDetails } from '../Scraper/scrapeProductDetails';
import { filterProducts } from '../Utils/utils';

@Controller()
export class AppController {
  @Get('products')
  async getProducts(
    @Query('nutrition') nutritionGrade: string,
    @Query('nova') novaGroup: string
  ): Promise<IProduct[] | string> {
    try {
      const scrapedProducts = await scrapeProducts(nutritionGrade, novaGroup);

      if (scrapedProducts.length === 0) {
        return 'Nenhum produto encontrado.';
      }

      const filteredProducts = await filterProducts(scrapedProducts, nutritionGrade, novaGroup);
      
      if (filteredProducts.length === 0) {
        return 'Nenhum produto encontrado com os critérios especificados.';
      }

      return filteredProducts;
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
      return 'Ocorreu um erro ao buscar os produtos.';
    }
  }

  @Get('products/:id')
  async getProductDetails(@Param('id') id: string): Promise<any> {
    try {
      const productDetails = await scrapeProductDetails(id);
      return productDetails;
    } catch (error) {
      console.error('Erro ao buscar os detalhes do produto:', error);
      return 'Ocorreu um erro ao buscar os detalhes do produto.';
    }
  }
}
