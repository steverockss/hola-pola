import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../core/services/product.service";
import { CartService } from "app/core/services/cart.service";
import { Product } from "app/core/models/product.model";
import { CartItem } from "app/core/models/cartItem";
import { ProductCategory } from "app/core/models/productCategory.model";
import { Router, Params, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  sellerId: any;
  searchContent: string = " ";
  categorySelected: string = "";
  currentRole;
  doubleSlider = [20, 60];
  productCategories: ProductCategory[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.route.params.subscribe((params: Params) => {
      this.sellerId = params.id;
    });
    this.currentRole = sessionStorage.getItem("currentRole");
    this.listProducts();
  }

  listProducts() {
    this.productService.getAllProductList(this.sellerId).subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }
  searchProduct() {
    this.productService
      .getProductByName(this.searchContent.trim(), this.sellerId)
      .subscribe((data) => {
        if (data.length == 0) {
          swal.fire(
            "Ups",
            "No se encontraron productos con el nombre ingresado",
            "question"
          );
        } else {
          this.products = data;
        }
      });
  }
  filterProduct() {
    this.productService
      .getProductsByCategory(this.categorySelected, this.sellerId)
      .subscribe(
        (data)=>{
          if (data.length == 0) {
            swal.fire(
              "Ups",
              "No se encontraron productos con la categoría seleccionada",
              "question"
            );
          } else {
            this.products = data;
          }
        }
      );
  }

  addToCart(product: Product) {
    let carItem = new CartItem(product, 1, product.unitaryPrice);
    let added = this.cartService.addToCart(carItem, this.sellerId);
    if(added){
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
    }else{
      swal.fire({
        title: `Solo pueden agregarse al carrito los productos de un mismo vendedor.`,
        width: 600,
        padding: `3em`,
        imageUrl: `https://www.flaticon.com/svg/vstatic/svg/3084/3084419.svg?token=exp=1611690839~hmac=3e208860ed86055bea1da18f43151a74`,
        imageWidth: 200,
        imageHeight: 200,
        timer: 5000,
        backdrop: `
          rgba(0,0,123,0.4)
          no-repeat
          `,
      });
    }

  }
}
