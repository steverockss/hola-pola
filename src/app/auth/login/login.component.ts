import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "app/core/services/login.service";
import { Router } from "@angular/router";


import { User } from "app/core/models/user.model";
import swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../auth.component.css"],
})
export class LoginComponent implements OnInit {
  clientLoginForm: FormGroup;
  enterpriseLoginForm: FormGroup;
  public userRole: string;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientLoginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.clientLoginForm.controls;
  }

  onSubmitClient() {
    const formValue = this.clientLoginForm.value;

    this.loginService.login(formValue.email, formValue.password).subscribe(
      (response: User) => {
        swal.fire({
          position: "top",
          icon: "success",
          title: "Bienvenido " + response.user.firstName,
          showConfirmButton: false,
          timer: 1500,
        });
        const role = response.user.roles[0]
        this.loginService.setRole(response.user.roles[0]);
      
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("email", response.user.email);
        sessionStorage.setItem("userId", response.user.documentNumber);
        console.log(sessionStorage.getItem("token"))
        if(role == "BUYER"){
          this.router.navigate(["/"]);

        }else if (role == "SELLER" || role == "ORGANIZATION"){
          this.router.navigate(["enterprise"]);
        }
        else if (role == "ADMIN"){
          this.router.navigate(["admin"]);
        }
      },
      (err) => {
        swal.fire("Ups", "Has ingresado mal tu correo o contraseña", "error");
      }
    );
  }
}
