import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/filter";
import { Pola } from "app/core/models/pola";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  polas: Pola[];
  constructor() {}
  ngOnInit() {

  }
  
}
