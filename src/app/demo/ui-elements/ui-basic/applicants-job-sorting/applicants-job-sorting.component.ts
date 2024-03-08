import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/confirmation-dialog/confirmation-dialog.component';
import { ApplicantsService } from 'src/app/theme/shared/services/applicants.service';
import { GenerateResultsService } from 'src/app/theme/shared/services/generate-results.service';
import { JobDescriptionService } from 'src/app/theme/shared/services/job-description.service';
import { SharedService } from 'src/app/theme/shared/services/shared.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-applicants-job-sorting',
  templateUrl: './applicants-job-sorting.component.html',
  styleUrls: ['./applicants-job-sorting.component.scss'],
  standalone:true,
  imports:[SharedModule]
})
export default class ApplicantsJobSortingComponent implements OnInit {
  jobDescriptions: any[] = [];
  applicants:any[] = [];
  constructor(
    private jobDescriptionApplicants:JobDescriptionService,
    private applicantsService:ApplicantsService,
    private generateResult:GenerateResultsService,
    private dialog: MatDialog,
    private translate: TranslationService,
    private sharedService:SharedService
    ){}


  ngOnInit(){
    this.sortTable();
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));

  }
  sortTable(){
    this.jobDescriptionApplicants.jobDescriptionWithApplicants().subscribe(res=>{
      this.jobDescriptions=res.data

      this.jobDescriptions.forEach(job => {
        this.applicants = job.applicants;
        this.applicants.forEach(applicant=>{
          applicant.certificate=JSON.parse(applicant.certificate)
        })
      });
    });
  }


  getCategoryString(category){
    return this.sharedService.getCategoryString(category);
  }
  getDesireOrderString(desire){
    return this.sharedService.getDesireOrderString(desire);
  }

  getStatusString(status){
    return this.sharedService.getStatusString(status);
  }

  isRed(job: any): boolean {
    return job.assignees === 0;
  }
  
  isOrange(job: any): boolean {
    return job.assignees > 0 && job.assignees < job.vacancies;
  }
  
  isGreen(job: any): boolean {
    return job.assignees === job.vacancies;
  }

  generateResults() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      position: { top: '10px', left: '10px' },
      data: { 
        message: 'Are you sure you want to generate results ?',
        flag:true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, perform delete action
        this.generateResult.generateResults().subscribe(res=>{
          if(res){
            this.sortTable();
          }
        });
      }
    });
  }

  revertResults() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      position: { top: '10px', left: '10px' },
      data: {
        message: 'Are you sure you want to revert results ?',
        flag:true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, perform delete action
        this.generateResult.cancelResults().subscribe(res=>{
          if(res){
            this.sortTable();
          }
        });
      }
    });
  }
}
