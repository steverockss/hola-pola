import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import Swal from "sweetalert2";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  clientRegistrationForm: FormGroup;
  fileName: string;
  organizationRegistrationForm: FormGroup;

  isImageSaved: boolean;
  cardImageBase64: string;
  imageError: string;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {


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

    
  }
}
