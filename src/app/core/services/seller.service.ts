import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Seller } from "app/core/models/seller.model";
import { Observable } from "rxjs";
import { AppSettings } from "app/app.config";
import { HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class SellerService {
  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  };
  selectedSeller;
  private baseUrl = `${AppSettings.API_ENDPOINT}organization/`;
  constructor(private httpClient: HttpClient) {}

  getSellers(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(
      this.baseUrl + `get/?sellersOnly=true`
    );
  }

  upgradeToSeller(sellerInfo) {
    return this.httpClient.post(
      this.baseUrl + `seller/${sessionStorage.getItem("userId")}`,
      sellerInfo,
      this.httpOptionsToken
    );
  }
  getLockedSellers(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(
      this.baseUrl + `get/?lockedSeller=true&sellersOnly=true`,
      this.httpOptionsToken
    );
  }
  approveSeller(sellerId) {
    return this.httpClient.post(
      this.baseUrl + `seller/status/${sellerId}/activate`,
      "",
      this.httpOptionsToken
    );
  }
  selectedSellerDocumentNumber(document) {
    this.selectedSeller = document;
  }
  getSelectedSeller() {
    return this.selectedSeller;
  }
}
