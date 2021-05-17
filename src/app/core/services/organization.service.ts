import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Organization } from "app/core/models/organization.model";
import { OrganizationCategory } from "app/core/models/organizationCategory.model";
import { OrganizationType } from "app/core/models/organizationType.model";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { AppSettings } from "app/app.config";
@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  httpOptionsToken = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  };
  private baseUrl = `${AppSettings.API_ENDPOINT}organization/`;
  private authUrl = `${AppSettings.API_ENDPOINT}auth/`;
  private catalogBaseUrl = `${AppSettings.API_ENDPOINT}catalog/organization/`;
  constructor(private httpClient: HttpClient) {}

  getOrganizationsList(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(this.baseUrl + "get/?withExtraInfo=True");
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.post<Organization>(
      this.baseUrl,
      organization,
      this.httpOptions
    );
  }
  addExtraInfo(extraInfo: any, organizationId): Observable<Organization> {
    console.log(extraInfo)
    return this.httpClient.post<Organization>(
      this.baseUrl +`${organizationId}/extraInfo`,
      extraInfo,
      this.httpOptionsToken
    );
  }
  getOrganizationCategories(): Observable<OrganizationCategory[]> {
    return this.httpClient.get<OrganizationCategory[]>(
      this.catalogBaseUrl + "categories/"
    );
  }

  getOrganizationTypes(): Observable<OrganizationType[]> {
    return this.httpClient.get<OrganizationType[]>(
      this.catalogBaseUrl + "types/"
    );
  }
  getOrganizationByName(name): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(
      this.baseUrl + `get/?name=${name}&withExtraInfo=True`
    );
  }
  getAllOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(
      this.baseUrl + "get/",
      this.httpOptionsToken
    );
  }
  activateOrganization(id: string) {
    return this.httpClient.post(
      this.authUrl + id + "/activate",
      "",
      this.httpOptionsToken
    );
  }
  blockOrganization(id: string) {
    return this.httpClient.post(
      this.authUrl + id + "/block",
      "",
      this.httpOptionsToken
    );
  }
  editOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.post<Organization>(
      this.baseUrl + sessionStorage.getItem("userId"),
      organization,
      this.httpOptionsToken
    );
  }

  getOrganizationById(id: string): Observable<Organization> {
    return this.httpClient.get<Organization>(
      this.baseUrl + "get/" + id + "?fullInfo=true",
      this.httpOptionsToken
    );
  }
  getOrganizationByCategoryAndType(
    categoryId: string,
    typeId: string
  ): Observable<Organization[]> {
    console.log(typeId == "");
    if (typeId != "") {
      return this.httpClient.get<Organization[]>(
        this.baseUrl + "get/?category=" + categoryId + "&type=" + typeId +"&withExtraInfo=True"
      );
    } else if (typeId == "") {
      return this.httpClient.get<Organization[]>(
        this.baseUrl + "get/?category=" + categoryId +"&withExtraInfo=True"
      );
    }
  }
}
