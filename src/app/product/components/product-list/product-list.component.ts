import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../core/services/product.service";
import { Product } from "app/core/models/product.model";
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

 

  
}
