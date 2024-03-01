import puppeteer from 'puppeteer';
import { TimeoutError } from 'rxjs';
import { IProduct } from 'src/Interface/IProducts';

export async function scrapeProducts(nutritionGrade: string | null = null, novaGroup: string | null = null): Promise<IProduct[]> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://br.openfoodfacts.org/', { timeout: 60000 });

    const products: IProduct[] = [];
    const productElements = await page.$$('.search_results .list_product_content');

    for (const el of productElements) {
      const name = await el.$eval('.list_product_name', node => node.textContent.trim());
      const nutritionScore = await el.$eval('.list_product_sc img[title^="Nutri-Score"]', node => node.getAttribute('title').replace('Nutri-Score ', ''));
      const novaScore = await el.$eval('.list_product_sc img[title^="NOVA"]', node => node.getAttribute('title').replace('NOVA ', ''));
      
      const id = await page.evaluate(() => {
        const href = document.querySelector('a.list_product_a')?.getAttribute('href');
        return href ? href.match(/produto\/(\d+)\//)[1] : null;
      })

      const product: IProduct = {
        id: id,
        name: name,
        nutrition: {
          score: nutritionScore.split('')[0],
          title: nutritionScore.replace(/^\w+ - /, ''),
        },
        nova: {
          score: parseInt(novaScore),
          title: novaScore.replace(/^\w+ - /, ''),
        },
      };

      if ((nutritionGrade === null || product.nutrition.score === nutritionGrade) &&
          (novaGroup === null || product.nova.score.toString() === novaGroup)) {
        products.push(product);
      }
    }

    await browser.close();
    return products;
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.error('Tempo limite de navegação excedido.');
      
    } else {
      console.error('Erro ao buscar os detalhes do produto:', error);
      return null;
    }
    return [];
  }
}
