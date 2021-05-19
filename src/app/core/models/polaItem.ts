import { Pola } from "app/core/models/pola";
export class PolaItem {
  pola: Pola;
  quantity: number;
  price: number;

  constructor(pola: Pola, quantity: number, price: number) {
    (this.pola = pola), (this.quantity = quantity), (this.price = price);
  }
}
