import { Component, OnInit } from "@angular/core";
import { OrganizationService } from "../../core/services/organization.service";
import { Organization } from "../../core/models/organization.model";
import { OrganizationCategory } from "../../core/models/organizationCategory.model";
import { OrganizationType } from "../../core/models/organizationType.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.css"],
})
export class OrganizationComponent implements OnInit {
  organizations: Organization[];
  searchName: string;
  organizationCategories: OrganizationCategory[];
  organizationTypes: OrganizationType[];
  categoryFilterForm: FormGroup;
  constructor(
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listOrganizations();
    this.getOrganizationCategories();
    this.getOrganizationTypes();
    this.categoryFilterForm = this.formBuilder.group({
      categoryType: [""],
      organizationType: [""],
    });
  }

  listOrganizations() {
    this.organizationService.getOrganizationsList().subscribe((data) => {
      this.organizations = data;
    });
  }
  getOrganizationCategories() {
    this.organizationService.getOrganizationCategories().subscribe((data) => {
      this.organizationCategories = data;
    });
  }
  getOrganizationTypes() {
    this.organizationService.getOrganizationTypes().subscribe((data) => {
      this.organizationTypes = data;
    });
  }
  getOrganizationByName() {
    this.organizationService
      .getOrganizationByName(this.searchName.trim())
      .subscribe(
        (data) => {
          if (data.length == 0) {
            Swal.fire(
              "Ups",
              "No se encontraron organizaciones con el nombre ingresado",
              "question"
            );
          } else {
            this.organizations = data;
          }
        },
        (error) => {}
      );
  }
  onSubmit() {
    let filter = this.categoryFilterForm.value;
    console.log(filter["organizationType"]);
    this.organizationService
      .getOrganizationByCategoryAndType(
        filter["categoryType"],
        filter["organizationType"]
      )
      .subscribe(
        (data) => {
          if (data.length == 0) {
            Swal.fire(
              "Ups",
              "No se encontrarón organizaciones con los paramétros de búsqueda",
              "question"
            );
          } else {
            this.organizations = data;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
