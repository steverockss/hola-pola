import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {SellerService} from "app/core/services/seller.service";
import swal from "sweetalert2";
@Component({
  selector: "app-sell-request",
  templateUrl: "./sell-request.component.html",
  styleUrls: ["./sell-request.component.css"],
})
export class SellRequestComponent implements OnInit {
  sellerRequestForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerRequestForm = this.formBuilder.group({
      minimumOrder: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      shippingCoverage: [
        "",
        [Validators.required, Validators.pattern("^[a-z A-Z0-9#.ñÑa \u00E0-\u00FC]*$")],
      ],
      shippingEstimateCost: [
        "",
        [Validators.required, Validators.pattern("^[0-9]*$")],
      ],
    });
  }
  get f() {
    return this.sellerRequestForm.controls;
  }

  onSubmit() {
    let fv = this.sellerRequestForm.value;
    let sellerInfo ={
      estimatedShippingCost: fv.shippingEstimateCost,
      minimumOrder: fv.minimumOrder,
      shippingCoverage: fv.shippingCoverage

    }
    this.sellerService.upgradeToSeller(sellerInfo).subscribe(
      ()=>{
        swal.fire(
          "Bien",
          "Tu solicitud ha sido enviada exitosamente, nos estaremos comunicando",
          "success"
        );
        this.sellerRequestForm.reset();
      },()=>{
        swal.fire(
          "Ups",
          "Algo salió mal, intenta por favor más tarde.",
          "error"
        );
        this.sellerRequestForm.reset();
      }
    )

  }
}
