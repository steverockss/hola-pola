import { Component, OnInit } from "@angular/core";

import swal from "sweetalert2";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    swal.fire({
      width: 600,
      padding: "3em",
      html:
        "" +
        '<span style="color:white">Tu cuenta ha sido registrada <br> ¡Salud!</span>  ',
      imageUrl: `https://i.postimg.cc/Dzj8Vhm8/logo.png`,
      imageWidth: 400,
      showConfirmButton: false,
      background: "#E84565 ",
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `,
    });
  }
}
