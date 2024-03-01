import axios from 'axios';
import cheerio from 'cheerio';
import { TimeoutError } from 'rxjs';
import { IProductDetails } from 'src/Interface/IProductDetails';

export async function scrapeProductDetails(productId: string): Promise<any | null> {
  try {
    const url = `https://br.openfoodfacts.org/produto/${productId}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const productDetails: IProductDetails = {
      title: $('h2[property="food:name"]').text().trim(),
      quantity: $('#field_quantity_value').text().trim(),
      brands: $('#field_brands_value').text().trim(),
      categories: $('#field_categories_value').text().trim(),
      countries: $('#field_countries_value').text().trim(),
      barcode: $('#barcode').text().trim(),
      genericName: $('#field_generic_name_value').text().trim(),
      origins: $('#field_origins_value').text().trim(),
      embCodes: $('#field_emb_codes_value').text().trim(),
      stores: $('#field_stores_value').text().trim(),
    };

    const nutritionData: { [key: string]: string } = {};
    $('table[aria-label="Dados nutricionais"] tbody tr').each((index, element) => {
      const nutrient = $(element).find('td:nth-child(1) span').text().trim();
      const value = $(element).find('td:nth-child(2) span').text().trim();
      nutritionData[nutrient] = value;
    });

    const ingredients: string[] = [];
    $('#panel_ingredients_content .panel_text').each((index, element) => {
      const ingredientText = $(element).text().trim().replace(/\s+/g, ' ');
      ingredients.push(ingredientText);
    });

    const nutriScoreImgSrc = $('img[src*="nutriscore-"]').attr('src');
    const nutriScoreMatch = nutriScoreImgSrc?.match(/nutriscore-(\w)\.svg/);
    const nutriScore = nutriScoreMatch ? nutriScoreMatch[1].toUpperCase() : null;

    const ecoScoreImgSrc = $('img[src*="ecoscore-"]').attr('src');
    const ecoScoreMatch = ecoScoreImgSrc?.match(/ecoscore-(\w)\.svg/);
    const ecoScore = ecoScoreMatch ? ecoScoreMatch[1].toUpperCase() : null;

    const novaImgSrc = $('img[src*="nova-group-"]').attr('src');
    const novaMatch = novaImgSrc?.match(/nova-group-(\d+)\.svg/);
    const novaScore = novaMatch ? novaMatch[1] : null;

    return {
      productDetails,
      nutritionData,
      ingredients,
      nutriScore,
      novaScore,
      ecoScore,
    };
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.error('Tempo limite de navegação excedido.');
      
    } else {
      console.error('Erro ao buscar os detalhes do produto:', error);
      return null;
    }
    return null;
  }
}
