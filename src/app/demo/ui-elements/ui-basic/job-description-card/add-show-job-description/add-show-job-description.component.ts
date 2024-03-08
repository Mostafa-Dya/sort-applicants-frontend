import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { PublicEntitieService } from 'src/app/theme/shared/services/public-entitie.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { ScientificCertificateService } from 'src/app/theme/shared/services/scientific-certificate.service';
import { JobDescriptionService } from 'src/app/theme/shared/services/job-description.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/theme/shared/services/shared.service';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-basic-badge',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-show-job-description.component.html',
  styleUrls: ['./add-show-job-description.component.scss'],
  providers: [DatePipe], // Add DatePipe to the providers array

})
export default class AddShowJobDescriptionComponent implements OnInit {
  specializationSets: FormArray;
  mainForm: FormGroup;
  governorateNames: string[] = [];
  originalPublicEntities: any[] = []; // Maintain the original array
  publicEntities: any[] = [];
  subEntities: any[] = [];
  certificate: any[] = [];
  preciseCertificates: any[] = [];
  jobID: number;
  entryDate;
  recordEntry;
  role:string;
  permissions:any;
  constructor(
    private fb: FormBuilder,
    private governorateService: GovernorateService,
    private publicEntitieService: PublicEntitieService,
    private translate: TranslationService,
    private certificateService: ScientificCertificateService,
    private jobDescriptionService: JobDescriptionService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private sharedService:SharedService,
    private authService:AuthService

  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.governorateService.getGovernorateData().subscribe((res) => {
      this.governorateNames = res.data.map((governorate) => governorate.name);
    });

    this.publicEntitieService.getPublicEntitieData().subscribe((res) => {
      this.originalPublicEntities = res.data;
      this.publicEntities = res.data;
      console.log(res);
    });
    this.certificateService.getScientificCertificateData().subscribe((res) => {
      this.certificate = res.data;
    });
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));
    this.route.params.subscribe((params) => {
      this.jobID = params['id'];
      if (this.jobID) {
        // Fetch job details using the job id
        this.jobDescriptionService.jobDescriptionTableDataShow(this.jobID).subscribe(async (res) => {
          this.entryDate = res.entry_date;
          this.recordEntry = res.record_entry;
          // Populate your form with the fetched data
          await this.setFormData(res);
          // Call onPublicEntityChange to update sub_entities
          this.onPublicEntityChange();
          this.onGeneralChange();
        });
      }
    });


        this.role = localStorage.getItem('role');
        this.permissions = this.authService.permissionsService();
  }


  onPublicEntityChange() {
    const selectedPublicEntity = this.mainForm.get('public_entity').value;
    console.log(selectedPublicEntity);
    const entity = this.originalPublicEntities.find((e) => e.name === selectedPublicEntity);
    this.subEntities = entity ? entity.sub_entities : [];
  }


  getSpecializationSet(index: number) {
    return this.specializationSets.at(index) as FormGroup;
  }

  getDegreeControl(index: number) {
    return this.getSpecializationSet(index).get('degree');
  }

  // Helper function to get the specialization set at a specific index

  async setFormData(data: any) {
    // Implement logic to set the form values based on the fetched data
    this.mainForm.patchValue({
      governorate: data.governorate,
      category: data.category,
      public_entity: data.public_entity,
      sub_entity: data.sub_entity,

      affiliate_entity: data.affiliate_entity,
      sub_affiliate_entity: data.sub_affiliate_entity,
      gender_needed: data.gender_needed,

      card_number: data.card_number,
      vacancies: data.vacancies,
      job_title: data.job_title,
      assignees: data.assignees,
      notes: data.notes,
      status: data.status,
      // general: data.general,
      // precise: data.precise,
    });

    // Check if specializationData is not null or undefined
    if (data.specialization_needed) {
      // Populate specializationData array
      this.specializationSets.clear();
      data.specialization_needed.forEach((item) => {
        console.log(item)
        const specializationGroup = this.fb.group({
          degree: item.degree,
          specializationNeeded: item.specialization_needed,
          specializationNeededPrecise:item.specialization_needed_precise
        });
        this.specializationSets.push(specializationGroup);
      });
    }

    for (let i = 0; i < this.specializationSets.length; i++) {
      this.onSpecializationChange(i);
  }
  }

  onGeneralChange() {
    const selectedGeneral = this.mainForm.get('specializationNeeded').value;
    // Find the corresponding certificate object for the selected general specialization
    const selectedCertificate = this.certificate.find(cert => cert.name === selectedGeneral);
    // Update the preciseCertificates array based on the selected general specialization
    this.preciseCertificates = selectedCertificate ? selectedCertificate.scientific_cert : [];
  }

  onSpecializationChange(index: number) {
    // Get the selected specialization from the current specialization set
    const selectedSpecialization = this.getSpecializationSet(index).get('specializationNeeded').value;
    // Find the corresponding certificate object for the selected specialization
    const selectedCertificate = this.certificate.find(cert => cert.name === selectedSpecialization);
    // Update the preciseCertificates array for the current specialization set
    const preciseControl = this.getSpecializationSet(index).get('specializationNeededPrecise');
    // Get the corresponding specializationNeededPrecise value from the API response
    const specializationNeededPrecise = this.getSpecializationSet(index).get('specializationNeededPrecise').value;
  
    // Update the options for the 'Precise Specialization Needed' select field
    preciseControl.setValue(specializationNeededPrecise); // Patch specializationNeededPrecise value from API response
    preciseControl.setValidators(selectedCertificate ? Validators.required : null); // Set validator if certificate exists
    preciseControl.updateValueAndValidity(); // Update validation status
    this.preciseCertificates[index] = selectedCertificate ? selectedCertificate.scientific_cert : [];
  }
  
  

  getGeneralNames(index: number): string[] {
    console.log(index)
    const selectedDegree = this.getDegreeControl(index).value;
    const selectedCertificates = this.certificate.filter(cert => cert.type === selectedDegree);
    console.log(selectedDegree);
    console.log(selectedCertificates);
  
    return selectedCertificates.map(cert => cert.name);
  }

  getPreciseCertificates(index: number): any[] {
    // Get the selected general specialization
    const selectedGeneral = this.mainForm.get('specializationNeeded').value;

    // Find the corresponding certificate object for the selected general specialization
    const selectedCertificate = this.certificate.find(cert => cert.name === selectedGeneral);
    // Return the precise certificates array if certificate is found, otherwise return an empty array
    return selectedCertificate ? selectedCertificate.scientific_cert : [];
  }



  onDegreeChange(index: number) {
    const selectedDegree = this.getDegreeControl(index).value;
    console.log(selectedDegree);
    const entity = this.certificate.find((cert) => cert.type === selectedDegree);
    const specializationControl = this.getSpecializationSet(index).get('specializationNeeded');

    if (entity) {
      // Assuming 'scientific_cert' property contains the array of specializations
      const specializationOptions = entity.scientific_cert.map((item) => item.name);
      specializationControl.setValue(''); // Clear previous selection
      specializationControl.setValidators([Validators.required]); // Set validator
      specializationControl.updateValueAndValidity(); // Update validation status
    } else {
      specializationControl.clearValidators(); // Remove validator
      specializationControl.updateValueAndValidity(); // Update validation status
    }
  }




  initForm() {
    this.mainForm = this.fb.group({
      governorate: ['', Validators.required],
      category: ['', Validators.required],
      public_entity: ['', Validators.required],
      sub_entity: [''],
      affiliate_entity: [''],
      sub_affiliate_entity: [''],
      gender_needed: [''],

      card_number: ['', Validators.required],
      vacancies: ['', Validators.required],
      job_title: ['', Validators.required],
      assignees: [{ value: 0, disabled: true }, Validators.required],
      notes: [''],
      status: [false],
      // general: [''],
      // precise: [''],
      specializationData: this.fb.array([]),
    });

    this.specializationSets = this.mainForm.get('specializationData') as FormArray;
    this.addSpecializationSet();
  }

  addSpecializationSet() {
    const specializationGroup = this.fb.group({
      degree: ['', Validators.required],
      specializationNeeded: ['', Validators.required],
      specializationNeededPrecise:['']
    });
    this.specializationSets.push(specializationGroup);
  }

  removeSpecializationSet(index: number) {
    if (this.specializationSets.length > 1) {
      this.specializationSets.removeAt(index);
    }
  }


  submit() {
    let recordEntry = localStorage.getItem('username');
    let date = new Date();
    let formattedEntryDate = this.datePipe.transform(date, 'yyyy/MM/dd');

    let entryDate = formattedEntryDate;
    let lastModifier = recordEntry;
    let modificationDate = formattedEntryDate;
    let auditedBy = recordEntry;
    let formData;

    console.log(this.mainForm.value)
    console.log(entryDate)
    // Check if the form is valid
    if (this.mainForm.valid) {
      this.mainForm.get('assignees').enable();

      console.log(this.mainForm)
      // Extract values from specializationSets controls
      const specializationData = this.specializationSets.controls.map((control) => {
        return {
          degree: control.get('degree').value,
          specializationNeeded: control.get('specializationNeeded').value,
          specializationNeededPrecise:control.get('specializationNeededPrecise').value
        };
      });

      // Add the collected specialization data to the main form value

      if (this.jobID) {
        formData = {
          ...this.mainForm.value,
          specializationData: specializationData,
          last_modifier: lastModifier,
          modification_date: modificationDate,
          audited_by: auditedBy,
          entry_date: this.entryDate,
          record_entry: this.recordEntry,
          // Set status to true if checked, false otherwise
          status: this.mainForm.get('status').value || false,
        };
        this.jobDescriptionService.updateJobDescription(this.jobID, formData).subscribe(res => {
          if(res){
            this.sharedService.openSnackBar("Job Description has been updated succefully ","close")
            this.router.navigate(['basic/job-description-card']);
          }
         });
      } else {
        formData = {
          ...this.mainForm.value,
          specializationData: specializationData,
          record_entry: recordEntry,
          entry_date: entryDate,
          last_modifier: lastModifier,
          modification_date: modificationDate,
          audited_by: auditedBy,
          // Set status to true if checked, false otherwise
          status: this.mainForm.get('status').value || false,
        };

        this.jobDescriptionService.createJobDescription(formData).subscribe(res => {
          if(res){
            this.sharedService.openSnackBar("Job Description has been added succefully ","close")
            this.router.navigate(['basic/job-description-card']);
          }
        });
      }


      console.log(formData);

      // Here, you can send the formData to your server or perform any other actions.
    } else {
      // Mark the form as touched to display error messages
      this.mainForm.markAllAsTouched();
    }
  }
}
