import { Component, OnInit } from "@angular/core";
import { OrganizationService } from "app/core/services/organization.service";
import { Organization } from "app/core/models/organization.model";
import { OrganizationCategory } from "app/core/models/organizationCategory.model";
import { OrganizationType } from "app/core/models/organizationType.model";
import { ProductImage } from "app/core/models/productImage.model";
import Swal from "sweetalert2";
@Component({
  selector: "app-edit-organization-info",
  templateUrl: "./edit-organization-info.component.html",
  styleUrls: ["./edit-organization-info.component.css"],
})
export class EditOrganizationInfoComponent implements OnInit {
  organizationCategories: OrganizationCategory[];
  organizationTypes: OrganizationType[];
  productImage: ProductImage = new ProductImage();

  organization = new Organization(
    "",
    "",
    "",
    "",
    "",
    "",
    3195235113,
    "",
    { categoryId: "", name: "" },
    { typeId: "", name: "" },
    false,
    this.productImage
  );
  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganizationCategories();
    this.getOrganizationTypes();
    this.getOrganizationInfo();
  }
  getOrganizationCategories() {
    this.organizationService
      .getOrganizationCategories()
      .subscribe((response) => {
        this.organizationCategories = response;
      });
  }
  getOrganizationInfo() {
    let userId = sessionStorage.getItem("userId");
    this.organizationService.getOrganizationById(userId).subscribe(
      (response) => {
        this.organization = response;
        console.log(this.organization);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getOrganizationTypes() {
    this.organizationService.getOrganizationTypes().subscribe((response) => {
      this.organizationTypes = response;
    });
  }
  onSubmit() {
    this.organizationService.editOrganization(this.organization).subscribe(
      (response) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Información editada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Algó salió mal intenta de nuevo más tarde",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
