import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Buyer } from "app/core/models/buyer.model";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { AppSettings } from "app/app.config";
@Injectable({
  providedIn: "root",
})
export class BuyerService {
  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  };
  private baseUrl = `${AppSettings.API_ENDPOINT}buyer/`;
  constructor(private httpClient: HttpClient) {}

  createBuyer(buyer: Buyer): Observable<Buyer> {
    return this.httpClient.post<Buyer>(this.baseUrl, buyer);
  }
  getBuyerById(buyerId: string): Observable<Buyer> {
    return this.httpClient.get<Buyer>(
      this.baseUrl + `get/${buyerId}`,
      this.httpOptionsToken
    );
  }
  editBuyer(buyer: Buyer): Observable<Buyer> {
    return this.httpClient.post<Buyer>(
      this.baseUrl + `${sessionStorage.getItem("userId")}`,
      buyer,
      this.httpOptionsToken
    );
  }
}
