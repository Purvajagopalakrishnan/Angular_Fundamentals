import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private pageTitle = 'Product List';
  private showImage = false;
  private errorMessage = '';

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  private _filterProduct = '';
  get filter(): string {
    return this._filterProduct;
  }
  set filter(value: string) {
    this._filterProduct = value;
    this.filteredProducts = this.filter ? this.filterAction(this.filter) : this.products;
  }

  constructor(private productService: ProductService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  filterAction(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingClick(message: string): void {
    this.pageTitle = message;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }
}
