import { Injectable } from "@angular/core";
import { CartItem } from "app/core/models/cartItem";
import { PolaItem } from "app/core/models/polaItem";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  products: CartItem[] = [];
  polas: PolaItem[] = [];
  sellerId;
  private cart = new BehaviorSubject<CartItem[]>([]);
  private cartp = new BehaviorSubject<PolaItem[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}
  emptyCart() {
    this.products.length = 0;
  }
  addToCart(product: CartItem, sellerId): boolean {
    let alreadyAdded = this.checkIfAlreadyAdded(product, this.products);

    if (alreadyAdded === 0 && this.sellerId == sellerId) {
      this.products = [...this.products, product];
      this.cart.next(this.products);
      return true;
    }
    return false;
  }
  addToCartP(pola: PolaItem): boolean {


 
      this.polas = [...this.polas, pola];
      this.cartp.next(this.polas);
      return true;
    

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
