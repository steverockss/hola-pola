import { Component, OnInit } from '@angular/core';
import {Factura} from '../core/models/factura'
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas : Factura [] = [] 
  constructor() {
    let fact = sessionStorage.getItem("factura");
    if (fact !== "undefined") {
      this.facturas = JSON.parse(sessionStorage.getItem("factura"));
    }
   }

  ngOnInit(): void {
  }

}
