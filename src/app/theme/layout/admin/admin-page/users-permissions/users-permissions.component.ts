import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { SharedService } from 'src/app/theme/shared/services/shared.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-users-permissions',
  templateUrl: './users-permissions.component.html',
  styleUrls: ['./users-permissions.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export default class UsersPermissionsComponent implements OnInit {
  userID: number;
  user: any;
  permissions: any;
  updatedPermissions: any = {}; // Object to store updated permissions

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.userID = res['id'];
      this.authService.getUsersByID(this.userID).subscribe((res) => {
        this.user = res.user;
        if (this.user && this.user.permissions) {
          this.permissions = this.user.permissions;
        }
      });
    });
  }

  updatePermissions() {
    // Construct an object containing the updated permissions
    this.updatedPermissions = {
      statusCheck: this.permissions.statusCheck ? 1 : 0,
      sortable: this.permissions.sortable ? 1 : 0,
      addApplicants: this.permissions.addApplicants ? 1 : 0,
      addCertificate: this.permissions.addCertificate ? 1 : 0,
      addJobDescription: this.permissions.addJobDescription ? 1 : 0,
      addGovernorate: this.permissions.addGovernorate ? 1 : 0,
      addPublic: this.permissions.addPublic ? 1 : 0,
      editApplicants: this.permissions.editApplicants ? 1 : 0,
      editCertificate: this.permissions.editCertificate ? 1 : 0,
      editJobDescription: this.permissions.editJobDescription ? 1 : 0,
      editGovernorate: this.permissions.editGovernorate ? 1 : 0,
      editPublic: this.permissions.editPublic ? 1 : 0,
      deleteApplicants: this.permissions.deleteApplicants ? 1 : 0,
      deleteCertificate: this.permissions.deleteCertificate ? 1 : 0,
      deleteJobDescription: this.permissions.deleteJobDescription ? 1 : 0,
      deleteGovernorate: this.permissions.deleteGovernorate ? 1 : 0,
      deletePublic: this.permissions.deletePublic ? 1 : 0,
    };

    // Send a PUT request to update permissions
    this.authService
      .updatePermissions(this.updatedPermissions, this.userID)
      .subscribe((response) => {
        if (response) {
          this.sharedService.openSnackBar(
            'User Permissions Updated Successfully',
            'close',
          );
        }
      });
  }
}
