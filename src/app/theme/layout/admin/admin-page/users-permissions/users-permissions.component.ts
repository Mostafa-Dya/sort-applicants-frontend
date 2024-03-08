import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-users-permissions',
  templateUrl: './users-permissions.component.html',
  styleUrls: ['./users-permissions.component.scss'],
  standalone:true,
  imports:[SharedModule]
})
export default class UsersPermissionsComponent implements OnInit {
  userID:number;
  user:any;
  updatedPermissions: any = {}; // Object to store updated permissions

  constructor(
    private authService:AuthService,
    private route: ActivatedRoute,
    ){}
  ngOnInit(){
  this.route.params.subscribe(res=>{
    this.userID= res['id'];
    this.authService.getUsersByID(this.userID).subscribe(res=>{
      this.user=res.user;

    })

  })
  }

  updatePermissions() {
    // Construct an object containing the updated permissions
    this.updatedPermissions = {
      statusCheck: this.user.permissions.statusCheck ? 1 : 0,
      sortable: this.user.permissions.sortable ? 1 : 0,
      addApplicants: this.user.permissions.addApplicants ? 1 : 0,
      addCertificate: this.user.permissions.addCertificate ? 1 : 0,
      addJobDescription: this.user.permissions.addJobDescription ? 1 : 0,
      addGovernorate: this.user.permissions.addGovernorate ? 1 : 0,
      addPublic: this.user.permissions.addPublic ? 1 : 0,
      editApplicants: this.user.permissions.editApplicants ? 1 : 0,
      editCertificate: this.user.permissions.editCertificate ? 1 : 0,
      editJobDescription: this.user.permissions.editJobDescription ? 1 : 0,
      editGovernorate: this.user.permissions.editGovernorate ? 1 : 0,
      editPublic: this.user.permissions.editPublic ? 1 : 0,
      deleteApplicants: this.user.permissions.deleteApplicants ? 1 : 0,
      deleteCertificate: this.user.permissions.deleteCertificate ? 1 : 0,
      deleteJobDescription: this.user.permissions.deleteJobDescription ? 1 : 0,
      deleteGovernorate: this.user.permissions.deleteGovernorate ? 1 : 0,
      deletePublic: this.user.permissions.deletePublic ? 1 : 0,
    };

    // Send a PUT request to update permissions
    this.authService.updatePermissions(this.updatedPermissions, this.userID)
      .subscribe(response => {
        console.log(response); // Handle response from the API
      });
  }
}
