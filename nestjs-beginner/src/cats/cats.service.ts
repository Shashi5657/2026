import { Injectable, Inject } from '@nestjs/common';
import { Cats } from 'src/cats/interface/cats.interface';

@Injectable()
export class catsService {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient;
  private readonly cats: Cats[] = [];

  create(cat: Cats) {
    this.cats.push(cat);
  }

  findAll(): Cats[] {
    return this.cats;
  }
}
