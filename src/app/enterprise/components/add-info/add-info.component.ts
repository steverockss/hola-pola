import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "app/core/models/state.model";
import { City } from "app/core/models/city.model";
import { OrganizationService } from "app/core/services/organization.service";
import { Headquarters } from "app/core/models/headquarters.model";
import { CatalogsService } from "app/core/services/catalogs.service";
import { Organization } from "app/core/models/organization.model";
import {ProductImage} from "app/core/models/productImage.model";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-info",
  templateUrl: "./add-info.component.html",
  styleUrls: ["./add-info.component.css"],
})
export class AddInfoComponent implements OnInit {
  addInfoForm: FormGroup;
  states: State[];
  cities: City[];
  city: City;
  state: State;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  fileName: string;
  organization: Organization;
  headquarter: Headquarters;
  constructor(
    private formBuilder: FormBuilder,
    private catalogsService: CatalogsService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.getOrganizationInfo();
    this.getStates();
    this.addInfoForm = this.formBuilder.group({
      infoContent: ["", []],
      title: ["", []],
      address: ["", [Validators.required]],
      schedule: ["", [Validators.required]],
      headquarterName: ["", [Validators.required]],
      facebook: [""],
      instagram: [""],
      whatsapp: ["", Validators.pattern("^[0-9]*$")],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]]
    });
  }
  get f() {
    return this.addInfoForm.controls;
  }
  onChange(stateId) {
    this.catalogsService.getCitiesByState(stateId).subscribe((data) => {
      this.cities = data;
    });
  }

  getOrganizationInfo() {
    let userId = sessionStorage.getItem("userId");
    this.organizationService.getOrganizationById(userId).subscribe(
      (response) => {
        this.organization = response;
        console.log(this.organization);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getStates() {
    this.catalogsService.getStates().subscribe((response) => {
      this.states = response;
    });
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
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  
  }
  onSubmit() {
    let fv = this.addInfoForm.value;
    let productImages =[]
    let productImage = new ProductImage();
    productImage.encodedContent = this.cardImageBase64.split(",")[1];
    productImage.fileName = "LogoOrg.jpg";
    productImage.alternativeText = "alternativeText";
    productImages.push(productImage)
    console.log(this.addInfoForm.value);
    this.city = new City(fv.city);
    this.state = new State(fv.state);
    this.headquarter = new Headquarters(
      fv.address,
      fv.address,
      this.city,
      this.state,
      ""
    );

    let body = {
      organizationCategory: this.organization.organizationCategory,
      organizationType: this.organization.organizationType,
      headquarter: this.headquarter,
      schedule: fv.schedule,
      organizationInfo:[ { content: fv.infoContent, title: fv.title }],
      contactInfo: [
        { channel: "facebook", value: fv.facebook },
        { channel: "instagram", value: fv.instagram },
        { channel: "whatsapp", value: fv.whatsapp },
      ],
      images : [
        productImage
      ]

    };
    console.log(body)
    this.organizationService.addExtraInfo(body, this.organization.documentNumber).subscribe(
      (data) => {
        Swal.fire("Muy bien", "Información publicada exitosamente", "success");
      },
      (error) => {
        Swal.fire("Ups", "Algo salió mal :(", "error");
        console.log(error);
      }
    );
  }
}
