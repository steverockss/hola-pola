import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { AppSettings } from "app/app.config";
import { Order } from "app/core/models/order.model";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  };
  private baseUrl = `${AppSettings.API_ENDPOINT}order/`;
  constructor(private httpClient: HttpClient) {}
  createOrder(order: Order) {
    return this.httpClient.post(this.baseUrl, order, this.httpOptionsToken);
  }
  getOrder() {
    return this.httpClient.get(this.baseUrl + `get/`, this.httpOptionsToken);
  }
  editOrder(order) {
    console.log(order.id)
    return this.httpClient.post(
      this.baseUrl +`${order.id}`,
      order,
      this.httpOptionsToken
    );
  }
}
