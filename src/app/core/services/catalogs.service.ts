import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { State } from "../models/state.model";
import { City } from "../models/city.model";
import { AppSettings } from "app/app.config";
@Injectable({
  providedIn: "root",
})
export class CatalogsService {
  private baseUrl = `${AppSettings.API_ENDPOINT}catalog/`;
  constructor(private httpClient: HttpClient) {}

  getStates(): Observable<State[]> {
    return this.httpClient.get<State[]>(this.baseUrl + "states/");
  }
  getCitiesByState(stateCode): Observable<City[]> {
    return this.httpClient.get<City[]>(
      this.baseUrl + `cities/?stateCode=${stateCode}`
    );
  }
}
