import { Component, OnInit } from "@angular/core";
import { CartItem } from "app/core/models/cartItem";
import { Product } from "app/core/models/product.model";
import { Rating } from "app/core/models/rating.model";
import { ActivatedRoute, Params } from "@angular/router";
import { CartService } from "app/core/services/cart.service";
import { ProductService } from "app/core/services/product.service";
import {AppSettings} from  "app/app.config";
import swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  rating: Rating;
  description: string;
  productId = 0;
  sellerId = "";
  cartItem: CartItem;
  currentRole;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.rating = new Rating()
      this.description = ""
      this.productId = params.id;
      this.sellerId = this.router.url.split("/")[2];
      this.getProduct(params.id);
    });
    this.currentRole = sessionStorage.getItem("currentRole");
  }

  getProduct(id) {
    -this.productService
      .getProductGeneral(id, this.sellerId)
      .subscribe((data) => {
        this.product = data;
      });
  }
  addToCart() {
    this.cartItem = new CartItem(this.product, 1, this.product.unitaryPrice);
    this.cartService.addToCart(this.cartItem, this.sellerId);
    swal.fire({
      title: `Producto agregado al carrito de compras.`,
      width: 600,
      padding: `3em`,
      imageUrl: `https://icons-for-free.com/iconfiles/png/512/cart+checked+ecommerce+online+shopping+shopping+cart+icon-1320165952137863404.png`,
      imageWidth: 200,
      imageHeight: 200,
      timer: 5000,
      backdrop: `
        rgba(0,0,123,0.4)
        no-repeat
        `,
    });
  }
  onSubmit() {
    this.productService.reviewProduct(this.rating, this.productId).subscribe(
      ()=>{
        swal.fire('','Gracias por tus comentatios', 'success')
        this.getProduct(this.productId)
      },(error)=>{
        if(error.error.code == AppSettings.BUYER_ALREADY_REVIEWED_PRODUCT){
          swal.fire('Ups','Ya comentaste este producto', 'warning')
        }else{
          swal.fire('Ups','Algo salió mal por favor intenta más tarde', 'error')

        }
        console.log(error)
      }
    )
    
  }
}
