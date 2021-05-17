import { Component, OnInit } from "@angular/core";
import { ProductService } from "app/core/services/product.service";
import { ProductCategory } from "app/core/models/productCategory.model";
import { Product } from "app/core/models/product.model";
import { ActivatedRoute, Params } from '@angular/router';
import Swal from "sweetalert2";
import { ProductImage } from "app/core/models/productImage.model";
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  productImages =  []
  productCategories: ProductCategory[];
  editObject;

  product: Product = new Product(
    { categoryId: "" , name:""},
    "",
    false,
    "",
    0,
    "",
    0,
    0,
    this.productImages
  );
  constructor(private productService: ProductService, private route: ActivatedRoute,) {}
  productId = 0;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      this.getProductInfo(params.id);
    });
    this.getProductCategories();
  }
  getProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }

  getProductInfo(id: any){
    this.productService.getProduct(id).subscribe( (data) =>{
      this.product = data
      console.log(data)
    }

    )
  }
  onSubmit(){
    this.editObject = {documentNumber: sessionStorage.getItem('userId'), product: this.product}
    this.productService.editProduct(this.editObject, this.productId).subscribe(
      (data)=>{
        Swal.fire("Muy bien", "Producto editado correctamente!", "success")
      },
      (error)=>{
        Swal.fire("Ups","Algo salió mal","warning")
        console.log(error)
      }
    )

  }
}
