import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async fetchData(): Promise<any> {
    const response = await this.httpService.get('https://br.openfoodfacts.org/');
    return response;
  }
}
