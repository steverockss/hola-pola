import { Product } from "app/core/models/product.model";

export class CartItem {
  product: Product;
  quantity: number;
  price: number;

  constructor(product: Product, quantity: number, price: number) {
    (this.product = product), (this.quantity = quantity), (this.price = price);
  }
}
