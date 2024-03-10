import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Shared/Interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], termsrarch: string): Product[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(termsrarch.toLowerCase())
    );
  }
}
