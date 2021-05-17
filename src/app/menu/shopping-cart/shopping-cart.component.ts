import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CartService } from "app/core/services/cart.service";
import { OrderService } from "app/core/services/order.service";
import { CartItem } from "app/core/models/cartItem";
import { Observable } from "rxjs";
import { Order } from "app/core/models/order.model";
import swal from "sweetalert2";
import { async } from "@angular/core/testing";
@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],  
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<CartItem[]>;
  order: Order;
  subTotalPrice = 0;

  constructor(
    private cartService: CartService,
    private OrderService: OrderService
  ) {
    this.products$ = this.cartService.cart$;
    this.getInitialSubtotal();
  }

  ngOnInit(): void {}

  removeFromCart(product: CartItem) {
    this.subTotalPrice = 0;
    this.cartService.removeFromCart(product);
  }
  susbtractQuantity(product: CartItem) {
    if (product.quantity > 0) {
      product.quantity--;
      this.calculateProductTotalPrice(product);
      this.subTotalPrice -= product.product.unitaryPrice;
      this.cartService.updateQuantity(product);
    }
  }
  addQuantity(product: CartItem) {
    product.quantity++;
    this.calculateProductTotalPrice(product);
    this.subTotalPrice += product.product.unitaryPrice;
    this.cartService.updateQuantity(product);
  }
  calculateProductTotalPrice(product: CartItem) {
    product.price = product.quantity * product.product.unitaryPrice;
  }
  getInitialSubtotal() {
    this.subTotalPrice = 0;
    this.products$.subscribe((products) => {
      products.forEach(
        (element) =>
          (this.subTotalPrice +=
            element.product.unitaryPrice * element.quantity)
      );
    });
  }
  async createOrder() {
    let products = this.cartService.getProducts();
    let buyer = {
      documentNumber: sessionStorage.getItem("userId"),
    };
    let seller = {
      documentNumber: this.cartService.getSellerId(),
    };

    const { value: formValues } = await swal.fire({
      title: "Datos adicionales",
      html:
        '<label>Dirección</label><input id="swal-input1" required class="swal2-input">' +
        '<label>Comentario</label><input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      },
      preConfirm: () => {
        if ( (<HTMLInputElement>document.getElementById("swal-input1")).value) {
          return [
            (<HTMLInputElement>document.getElementById("swal-input1")).value,
            (<HTMLInputElement>document.getElementById("swal-input2")).value,
          ];
       } else {
         swal.showValidationMessage('Debe especificarse la dirección de envío y añadir algún comentario  ')   
       }
      
      },
    });
    let order = new Order(formValues[0], formValues[1], buyer, products, seller, 0, 0);

    this.OrderService.createOrder(order).subscribe(
      () => {
        swal.fire(
          "Muy bien","Pedido creado correctamente", "success"

        );
        this.cartService.emptyCart();
        this.subTotalPrice = 0;
      },
      (error) => {
        swal.fire("Ay!", "Algo salió mal", "error");
        console.log(error)
      }
    );

  }
}
