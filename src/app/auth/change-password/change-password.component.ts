import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "app/core/services/login.service";
import swal from "sweetalert2";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: [
          "",[
          Validators.required,
          Validators.minLength(6),
          ]
        ],
      },
      {
        validator: this.checkMatchingPassword(
          "newPassword",
          "passwordConfirmation"
        ),
      }
    );
  }
  checkMatchingPassword(password: string, passwordConfirmation: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[passwordConfirmation];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  get f() {
    return this.changePasswordForm.controls;
  }
  onSubmitClient() {
    const formValue = this.changePasswordForm.value;
    this.loginService
      .changePassword(
        sessionStorage.getItem("email"),
        formValue.password,
        formValue.newPassword
      )
      .subscribe(
        (response) => {
          swal.fire("Muy bien", "Contraseña cambiada correctamente", "success");
        },
        (err) => {
          swal.fire(
            "",
            "Asegurate de haber ingresado bien tu contraseña actual",
            "warning"
          );
        }
      );
  }
}
