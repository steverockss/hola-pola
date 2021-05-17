import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ProductService } from "app/core/services/product.service";
import { ProductCategory } from "app/core/models/productCategory.model";
import {ImageService} from "app/core/services/image.service";
import { Product } from "app/core/models/product.model";
import { ProductUnit } from "app/core/enums/productUnit";
import { AppSettings } from "app/app.config";
import {ProductImage} from "app/core/models/productImage.model";
import Swal from "sweetalert2";
@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.css"],
})
export class NewProductComponent implements OnInit {
  units = Object.values(ProductUnit);
  selectedUnit;
  fileName: string;
  newProductForm: FormGroup;
  imageError: string;
  product: Product;
  isImageSaved: boolean;
  cardImageBase64: string;
  productCategories: ProductCategory[];
  constructor(
    private formBuilder: FormBuilder,
    private producService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.newProductForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z ]+$"),
          Validators.minLength(3),
        ],
      ],
      quantity: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(6),
        ],
      ],
      unitaryPrice: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(3),
        ],
      ],
      description: ["", []],
      productCategory: ["", [Validators.required]],
      unit: ["", [Validators.required]],
    });
  }
  get f() {
    return this.newProductForm.controls;
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    let file = fileInput.target.files[0];
    this.fileName = file.name
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = "Maximum size allowed is " + max_size / 1000 + "Mb";

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          console.log(rs);
          const img_height = rs.currentTarget["height"];
          const img_width = rs.currentTarget["width"];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              "Maximum dimentions allowed " +
              max_height +
              "*" +
              max_width +
              "px";
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  
  }
  getProductCategories() {
    this.producService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }
  onSubmit() {
    var formValue = this.newProductForm.value;
    let category = {
      categoryId: formValue.productCategory,
      name: "",
    };
    let productImages =[]
    let productImage = new ProductImage()
    productImage.encodedContent = this.cardImageBase64.split(',')[1]
    productImage.fileName = "ImagenProducto.jpg"
    productImage.alternativeText = "alternativeText"
    productImages.push(productImage)
    this.product = new Product(
      category,
      formValue.description,
      true,
      formValue.name,
      formValue.quantity,
      formValue.unit,
      0,
      formValue.unitaryPrice,
      productImages
    );
    const body = {
      documentNumber: sessionStorage.getItem("userId"),
      product: this.product,
    };

    this.producService.createProduct(body).subscribe(
      (data) => {
        Swal.fire("Muy bien", "Producto creado correctamente", "success");
      },
      (error) => {
        if (error.error.code == AppSettings.SELLER_LOCKED) {
          Swal.fire(
            "Ups",
            "Aún no te encuentras aprobado por el administrador como vendedor",
            "warning"
          );
        } else {
          Swal.fire(
            "Ups",
            "Algo salió mal, por favor intenta más tarde",
            "error"
          );
          console.log(error)
        }
      }
    );

    this.newProductForm.reset();
  }
}
