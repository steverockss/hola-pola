import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrganizationService } from "app/core/services/organization.service";
import { Organization } from "app/core/models/organization.model";
import { OrganizationCategory } from "app/core/models/organizationCategory.model";
import { OrganizationType } from "app/core/models/organizationType.model";
import { ProductImage } from "app/core/models/productImage.model";
import { Buyer } from "app/core/models/buyer.model";
import { State } from "app/core/models/state.model";
import { City } from "app/core/models/city.model";
import { AppSettings } from "app/app.config";
import { CatalogsService } from "app/core/services/catalogs.service";
import { BuyerService } from "app/core/services/buyer.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["../auth.component.css"],
})
export class SignUpComponent implements OnInit {
  clientRegistrationForm: FormGroup;
  fileName: string;
  organizationRegistrationForm: FormGroup;
  organizationCategories: OrganizationCategory[];
  organizationTypes: OrganizationType[];
  isImageSaved: boolean;
  cardImageBase64: string;
  imageError: string;
  states: State[];
  cities: City[];
  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private buyerService: BuyerService,
    private catalogsService: CatalogsService
  ) {}

  ngOnInit(): void {
    this.getOrganizationCategories();
    this.getOrganizationTypes();
    this.getStates();
    this.clientRegistrationForm = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZñÑ \u00E0-\u00FC]+$"),
          Validators.minLength(3),
        ],
      ],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("^[a-zA-Z0-9ñÑ\u00E0-\u00FC]*$"),
        ],
      ],
      documentType: ["", [Validators.required]],
      documentNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      mobilePhone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      address: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
    this.organizationRegistrationForm = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZñÑ \u00E0-\u00FC]+$"),
          Validators.minLength(3),
        ],
      ],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("^[a-zA-Z0-9ñÑ\u00E0-\u00FC]*$"),
        ],
      ],
      documentType: ["", [Validators.required]],
      documentNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      mobilePhone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      organizationType: ["", [Validators.required]],
      organizationCategory: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.clientRegistrationForm.controls;
  }
  get f1() {
    return this.organizationRegistrationForm.controls;
  }
  getOrganizationCategories() {
    this.organizationService
      .getOrganizationCategories()
      .subscribe((response) => {
        this.organizationCategories = response;
      });
  }
  getStates() {
    this.catalogsService.getStates().subscribe((response) => {
      this.states = response;
    });
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    let file = fileInput.target.files[0];
    this.fileName = file.name;
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
  getOrganizationTypes() {
    this.organizationService.getOrganizationTypes().subscribe((response) => {
      this.organizationTypes = response;
    });
  }
  onSubmitClient() {
    let fv = this.clientRegistrationForm.value;
    console.log(fv);
    let state = {
      stateId: fv.state,
      name: "Bogota D.C",
    };
    let city = {
      cityId: fv.city,
      name: "Bogota D.C",
    };

    let buyer = new Buyer(
      fv.address,
      fv.address,
      fv.username,
      fv.firstName,
      fv.firstName,
      fv.documentType,
      fv.documentNumber,
      fv.email,
      fv.mobilePhone,
      fv.mobilePhone,
      fv.password,
      state,
      city
    );
    this.buyerService.createBuyer(buyer).subscribe(
      () => {
        Swal.fire("Muy bien", "Usuario creado exitosamente", "success");
        this.clientRegistrationForm.reset();
      },
      (error) => {
        let errorCode = error.error.code;

        if (errorCode == AppSettings.EMAIL_ALREADY_EXISTS_ERROR) {
          Swal.fire(
            "Ups",
            "Ya existe un usuario registrado con el correo electrónico ingresado",
            "warning"
          );
        } else if (errorCode == AppSettings.DOCUMENT_ALREADY_EXISTS_ERROR) {
          Swal.fire(
            "Ups",
            "Ya existe un usuario registrado con el número de documento ingresado",
            "warning"
          );
        } else {
          Swal.fire(
            "Ups",
            "Algo salió mal, por favor intenta más tarde",
            "error"
          );
          console.log(errorCode);
        }
      }
    );
  }
  onChange(stateId) {
    this.catalogsService.getCitiesByState(stateId).subscribe((data) => {
      this.cities = data;
    });
  }
  onSubmitEnterprise() {
    let fv = this.organizationRegistrationForm.value;
    let category = {
      categoryId: fv.organizationCategory,
      name: "",
    };
    let type = {
      typeId: fv.organizationType,
      name: "",
    };
    let productImages =[]
    let productImage = new ProductImage();
    productImage.encodedContent = this.cardImageBase64.split(",")[1];
    productImage.fileName = "LogoOrg.jpg";
    productImage.alternativeText = "alternativeText";
    productImages.push(productImage)
    let organization = new Organization(
      fv.username,
      fv.firstName,
      "2",
      fv.documentNumber,
      fv.email,
      fv.mobilePhone,
      fv.mobilePhone,
      fv.password,
      category,
      type,
      false,
      productImage
    );
    console.log(organization);
    this.organizationService.createOrganization(organization).subscribe(
      () => {
        Swal.fire("Muy bien", "Empresa creada exitosamente", "success");
        this.organizationRegistrationForm.reset();
      },
      (error) => {
        let errorCode = error.error.code;

        if (errorCode == AppSettings.EMAIL_ALREADY_EXISTS_ERROR) {
          Swal.fire(
            "Ups",
            "Ya existe un usuario registrado con el correo electrónico ingresado",
            "warning"
          );
        } else if (errorCode == AppSettings.DOCUMENT_ALREADY_EXISTS_ERROR) {
          Swal.fire(
            "Ups",
            "Ya existe un usuario registrado con el número de documento ingresado",
            "warning"
          );
        } else {
          Swal.fire(
            "Ups",
            "Algo salió mal, por favor intenta más tarde",
            "error"
          );
          console.log(error);
        }
      }
    );
  }
}
