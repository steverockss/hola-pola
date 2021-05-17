import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/core/models/product.model";
import { ProductCategory } from "app/core/models/productCategory.model";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { AppSettings } from "app/app.config";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  };
  private baseUrl = `${AppSettings.API_ENDPOINT}catalog/product/`;
  private productUrl = `${AppSettings.API_ENDPOINT}product/`;
  constructor(private httpClient: HttpClient) {}

  getAllProductList(sellerId): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.productUrl + "get/" + sellerId + "?fullInfo=true"
    );
  }
  getProduct(productId): Observable<Product> {
    return this.httpClient.get<Product>(
      this.productUrl +
        `get/${sessionStorage.getItem("userId")}/${productId}/?fullInfo=true`,
      this.httpOptionsToken
    );
  }
  getProductGeneral(productId, sellerId): Observable<Product> {
    return this.httpClient.get<Product>(
      this.productUrl + `get/${sellerId}/${productId}/?fullInfo=true`
    );
  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.baseUrl + "categories/");
  }

  createProduct(product): Observable<Product> {
    return this.httpClient.post<Product>(
      this.productUrl,
      product,
      this.httpOptionsToken
    );
  }

  editProduct(product: Product, productId): Observable<Product> {
    return this.httpClient.post<Product>(
      this.productUrl + `${productId}`,
      product,
      this.httpOptionsToken
    );
  }

  getProductByName(
    productName: string,
    sellerId: string
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.productUrl + `get/${sellerId}?fullInfo=true&name=${productName}`
    );
  }
  getProductsByCategory(
    productCategoryId: string,
    sellerId: string
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.productUrl +
        `get/${sellerId}?fullInfo=true&category=${productCategoryId}`
    );
  }

  reviewProduct(review, productId): Observable<Product[]> {
    return this.httpClient.post<any>(
      this.productUrl + `review/${productId}`,
      review,
      this.httpOptionsToken
    );
  }
}
