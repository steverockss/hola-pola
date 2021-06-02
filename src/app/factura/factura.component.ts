import { Component, OnInit } from "@angular/core";
import { Factura } from "app/core/models/factura";
import { Params } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-factura",
  templateUrl: "./factura.component.html",
  styleUrls: ["./factura.component.css"],
})
export class FacturaComponent implements OnInit {
  factura: Factura;
  params: Params;
  facturas: Factura[] = [];
  constructor(private route: ActivatedRoute) {

    
  }

  ngOnInit(): void {
    let fact = sessionStorage.getItem("factura");
    if (fact !== "undefined") {
      this.facturas = JSON.parse(sessionStorage.getItem("factura"));
      this.factura = this.facturas.find(element => element.codigo ===  Number(this.route.snapshot.paramMap.get('id')))
    }
  }
}
