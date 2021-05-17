import { Injectable } from "@angular/core";
import { CartItem } from "app/core/models/cartItem";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  products: CartItem[] = [];
  sellerId;
  private cart = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}
  emptyCart() {
    this.products.length = 0;
  }
  addToCart(product: CartItem, sellerId): boolean {
    let alreadyAdded = this.checkIfAlreadyAdded(product, this.products);
    if (this.sellerId === null || this.products.length === 0) {
      this.sellerId = sellerId;
    }

    if (alreadyAdded === 0 && this.sellerId == sellerId) {
      this.products = [...this.products, product];
      this.cart.next(this.products);
      return true;
    }
    return false;
  }
  removeFromCart(product: CartItem) {
    this.products = this.products.filter((prod) => prod !== product);
    this.cart.next(this.products);
  }
  checkIfAlreadyAdded(product: CartItem, products: CartItem[]) {
    return products.filter((prod) => prod.product.id === product.product.id)
      .length;
  }
  updateQuantity(product: CartItem) {
    let productIndex = this.products.findIndex(
      (item) => item.product.id == product.product.id
    );
    this.products[productIndex] = product;
  }
  getProducts(): CartItem[] {
    return this.products;
  }
  getSellerId(): string {
    return this.sellerId;
  }

  computeTotals() {}
}
