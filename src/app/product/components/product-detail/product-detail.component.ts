import { Component, OnInit } from "@angular/core";
import { Product } from "app/core/models/product.model";
import { Rating } from "app/core/models/rating.model";
import { ActivatedRoute, Params } from "@angular/router";
import { ProductService } from "app/core/services/product.service";
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
  currentRole;
  constructor(
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

  }
  onSubmit() {
    
  }
}
