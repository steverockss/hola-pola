import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import {AppSettings} from "app/app.config"
@Injectable({
  providedIn: "root",
})
export class LoginService {
  private role = new BehaviorSubject<string>("");

  role$ = this.role.asObservable();
  private baseUrl = `${AppSettings.API_ENDPOINT}auth/`;
  constructor(private httpClient: HttpClient) {}

  login(email: any, password: any) {
    return this.httpClient.post(this.baseUrl + 'login', {
      username: email,
      password: password,
    });
  }
  setRole(currentRole) {
    this.role.next(currentRole);
  }
  changePassword(email: any, oldPassword: any, newPassword: any){
    return this.httpClient.post(this.baseUrl + 'changePasswd', {
      username: email,
      password: oldPassword,
      newPassword: newPassword
    });
  }
}
