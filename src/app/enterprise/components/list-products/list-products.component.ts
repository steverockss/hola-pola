import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../core/services/product.service";
import { Product } from "app/core/models/product.model";
import { Router, Params, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-edit-product",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"],
})
export class ListProductsComponent implements OnInit {
  products: Product[];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.productService
      .getAllProductList(sessionStorage.getItem("userId"))
      .subscribe((data) => {
        this.products = data;
      });
  }
}
