import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { PublicEntitieService } from 'src/app/theme/shared/services/public-entitie.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { JobDescriptionService } from 'src/app/theme/shared/services/job-description.service';
import { finalize } from 'rxjs';
import { ScientificCertificateService } from 'src/app/theme/shared/services/scientific-certificate.service';
import { ApplicantsService } from 'src/app/theme/shared/services/applicants.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-add-show-applicants',
  templateUrl: './add-show-applicants.component.html',
  styleUrls: ['./add-show-applicants.component.scss'],
  standalone: true,
  imports: [SharedModule],
  providers: [DatePipe]
})
export default class AddShowApplicantsComponent implements OnInit {
  specializationSets: FormArray;
  desireSets: FormArray;

  mainForm: FormGroup;
  governorateNames: string[] = [];
  originalPublicEntities: any[] = [];
  publicEntities: any[] = [];
  subEntities: any[] = [];
  publicEntityName: string[] = [];
  allJobDescriptionData: any[] = [];
  allCertificates: any[] = [];
  applicantID;
  selectedCertificate: any;
  role: string;
  permissions: any;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private governorateService: GovernorateService,
    private publicEntitieService: PublicEntitieService,
    private translationService: TranslationService,
    private jobDescriptionService: JobDescriptionService,
    private scientificCertificateService: ScientificCertificateService,
    private applicantsService: ApplicantsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.governorateService.getGovernorateData().subscribe((res) => {
      this.governorateNames = res.data.map((governorate) => governorate.name);
    });

    this.publicEntitieService.getPublicEntitieData().subscribe((res) => {
      this.originalPublicEntities = res.data;
      this.publicEntityName = res.data.map((publicEntity) => publicEntity.name);
    });

    this.jobDescriptionService.jobDescriptionTableData().subscribe(
      (data) => {
        this.allJobDescriptionData = data;
      },
      (error) => {
        console.error('Error fetching all job description data:', error);
      }
    );

    this.scientificCertificateService.getScientificCertificateData().subscribe((res) => {
      this.allCertificates = res.data.map((certificateGeneral) => {
        return certificateGeneral.scientific_cert.map((precise) => {
          return {
            general: certificateGeneral,
            precise: precise,
          };
        });
      }).flat();
    });

    this.translationService.setLanguage(localStorage.getItem('i18nextLng'));
    this.route.params.subscribe((params) => {
      this.applicantID = params['id'];
      if (this.applicantID) {
        console.log(this.applicantID)
        this.applicantsService.getApplicantsByID(this.applicantID).subscribe((res) => {
          console.log(res)
          this.setFormData(res);
        });
      }
    });
    this.role = localStorage.getItem('role');
    this.permissions = this.authService.permissionsService();
    this.initForm();
  }

  async setFormData(data: any) {
    const parsedCertificate = JSON.parse(data.certificate);
    this.selectedCertificate = this.allCertificates.find(
      cert => cert.general.name === parsedCertificate.general && cert.precise.name === parsedCertificate.precise
    );
  
    // Implement logic to set the form values based on the fetched data
    this.mainForm.patchValue({
      governorate: data.governorate,
      category: data.category,
      // series: data.series,
      fullName: data.fullName,
      motherName: data.motherName,
      idNumber: data.idNumber,
      graduationDate: data.graduationDate,
      graduationRate: data.graduationRate,
      birthDate: data.birthDate,
      residence: data.residence,
      institute: data.institute,
      exactSpecialization: data.exactSpecialization,
      status: data.status,
      notes: data.notes,
      destination: data.destination,
      named: data.named,
      cardNumber: data.cardNumber,
      desireOrder: data.desireOrder,
      desiredGovernorate: data.desiredGovernorate,
    });
  
    // Patch certificate values to corresponding form fields
    if (parsedCertificate) {
      this.mainForm.patchValue({
        institute: parsedCertificate.general,
        exactSpecialization: parsedCertificate.precise
      });
    }
  
    // Check if specializationData is not null or undefined
    if (data.specialization_data) {
      // Populate specializationData array
      this.specializationSets.clear();
      data.specialization_data.forEach((item) => {
        console.log(item)
        const specializationGroup = this.fb.group({
          desire: item.desire,
          namedVal: item.namedVal,
          cardNumberVal: item.cardNumberVal,
        });
        this.specializationSets.push(specializationGroup);
      });
    }
    if (data.desire_data) {
      // Populate specializationData array
      this.desireSets.clear();
      data.desire_data.forEach((item) => {
        console.log(item)
        const desireGroup = this.fb.group({
            governorateDesire: [item.governorateDesire, Validators.required],
            publicEntitySide: [item.publicEntitySide, Validators.required],
            cardNumberDesire: [item.cardNumberDesire, Validators.required],
            publicEntity: item.publicEntity,
            numberOfCenters: item.numberOfCenters,
            jobTitle: item.jobTitle,
            specialization_needed: this.fb.array([]) // You may need to initialize this array depending on your use case
        });
    
        // Check if specialization_needed is not null before accessing its value
        if (item.specialization_needed) {
            this.handleDesireGroupChanges(desireGroup); // Call the function to fetch additional values
        }
    
        this.desireSets.push(desireGroup);
        this.handleDesireGroupChanges(desireGroup); // Call the function to fetch additional values
    });
    }
  }
  


  initForm() {
    this.mainForm = this.fb.group({
      governorate: ['', Validators.required],
      category: ['', Validators.required],
      fullName: ['', Validators.required],
      motherName: ['', Validators.required],
      idNumber: ['', Validators.required],
      graduationDate: ['', Validators.required],
      graduationRate: [0, Validators.required],
      birthDate: [''],
      residence: [''],
      institute: [''],
      exactSpecialization: [''],
      certificate: ['', Validators.required],
      notes: [''],
      destination: [{ value: '', disabled: true }],
      named: [{ value: '', disabled: true }],
      cardNumber: [{ value: '', disabled: true }],
      desireOrder: [{ value: '', disabled: true }],
      desiredGovernorate: [''],
      desireData: this.fb.array([]),
      status: [false],
      specializationData: this.fb.array([]),
    });

    this.desireSets = this.mainForm.get('desireData') as FormArray;
    this.specializationSets = this.mainForm.get('specializationData') as FormArray;
    this.addSpecializationSet();
    this.addDesireSet();
  }

  addSpecializationSet() {
    const specializationGroup = this.fb.group({
      desire: ['', Validators.required],
      namedVal: ['', Validators.required],
      cardNumberVal: ['', Validators.required],
    });
    if (this.specializationSets.length < 3) {
      this.specializationSets.push(specializationGroup);
    }
  }

  addDesireSet() {
    const desireGroup = this.fb.group({
      governorateDesire: ['', Validators.required],
      publicEntitySide: ['', Validators.required],
      cardNumberDesire: ['', Validators.required],
      publicEntity: [''], // Include publicEntity in the form group
      numberOfCenters: [''], // Include numberOfCenters in the form group
      jobTitle: [''], // Include jobTitle in the form group
      specialization_needed: this.fb.array([]),
      primarySpecialization: [''],
      specifiedSpecialization: ['']
    });
    if (this.desireSets.length < 3) {
      this.desireSets.push(desireGroup);
      this.handleDesireGroupChanges(desireGroup);
  
      desireGroup.get('cardNumberDesire').valueChanges.subscribe(() => {
        this.handleDesireGroupChanges(desireGroup);
      });
  
      desireGroup.get('governorateDesire').valueChanges.subscribe(() => {
        this.handleDesireGroupChanges(desireGroup);
      });
  
      desireGroup.get('publicEntitySide').valueChanges.subscribe(() => {
        this.handleDesireGroupChanges(desireGroup);
      });
    }
  }
  

  handleDesireGroupChanges(desireGroup: FormGroup) {
    const cardNumberDesire = desireGroup.get('cardNumberDesire').value;
    const governorateDesire = desireGroup.get('governorateDesire').value;
    const publicEntitySide = desireGroup.get('publicEntitySide').value;
  
    const matchingJobDescription = this.allJobDescriptionData?.find((jobDescription) => {
      let desiredCardNumber = parseInt(cardNumberDesire);
      return (
        jobDescription.card_number === desiredCardNumber &&
        jobDescription.governorate === governorateDesire &&
        jobDescription.public_entity === publicEntitySide
      );
    });
  
    if (matchingJobDescription) {
      console.log(matchingJobDescription.public_entity)
      const workCenters = matchingJobDescription.vacancies - matchingJobDescription.assignees;
      desireGroup.patchValue({
        publicEntity: matchingJobDescription.public_entity,
        numberOfCenters: workCenters,
        jobTitle: matchingJobDescription.job_title,
        primarySpecialization: matchingJobDescription.specialization_needed.map(item => item.specialization_needed),
        specifiedSpecialization: matchingJobDescription.specialization_needed.map(item => item.specialization_needed_precise),
      });
  
      const specializationNeededArray = desireGroup.get('specialization_needed') as FormArray;
      specializationNeededArray.clear();
      matchingJobDescription.specialization_needed.forEach(spec => {
        const specializationGroup = this.fb.group({
          specialization_needed: spec.specialization_needed,
          specialization_needed_precise: spec.specialization_needed_precise
        });
        specializationNeededArray.push(specializationGroup);
      });
    } else {
      desireGroup.patchValue({
        publicEntity: '',
        numberOfCenters: '',
        specialization_needed: [],
        jobTitle: '', // Patch jobTitle
        primarySpecialization: '', // Patch primarySpecialization
        specifiedSpecialization: '' // Patch specifiedSpecialization
      });
    }
  }
  

  removeDesireSet(index: number) {
    if (this.desireSets.length > 1) {
      this.desireSets.removeAt(index);
    }
  }

  removeSpecializationSet(index: number) {
    if (this.specializationSets.length > 1) {
      this.specializationSets.removeAt(index);
    }
  }

  changeLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }

  submit() {
    const lastModifier = localStorage.getItem('username');
    const date = new Date();
    const formattedModificationDate = this.datePipe.transform(date, 'yyyy/MM/dd');
    
    if (this.mainForm.valid) {
      console.log(12)
      const formData = this.mainForm.getRawValue();

      if (!this.applicantID) {
        formData.recordEntry = lastModifier;
        formData.entryDate = formattedModificationDate;
      }

      formData.lastModifier = lastModifier;
      formData.modificationDate = formattedModificationDate;

      if (formData.certificate) {
        formData.certificate = {
          general: formData.certificate.general.name,
          precise: formData.certificate.precise.name,
        };
      }

      const specializationData = this.specializationSets.controls.map((control) => {
        return {
          desire: control.get('desire').value,
          namedVal: control.get('namedVal').value,
          cardNumberVal: control.get('cardNumberVal').value,
        };
      });

      const desireData = this.desireSets.controls.map((control) => {
        console.log(control)
        return {
          governorateDesire: control.get('governorateDesire').value,
          publicEntitySide: control.get('publicEntitySide').value,
          cardNumberDesire: control.get('cardNumberDesire').value,
          publicEntity: control.get('publicEntity').value,
          numberOfCenters: control.get('numberOfCenters').value,
          jobTitle: control.get('jobTitle').value,
        };
      });

      formData.specializationData = specializationData;
      formData.desireData = desireData;

      if (this.applicantID) {
        formData.status = this.mainForm.get('status').value;

        this.applicantsService.updateApplicants(this.applicantID, formData)
          .pipe(
            finalize(() => {})
          )
          .subscribe(
            (response) => {},
            (error) => {}
          );
      } else {
        this.applicantsService.createApplicants(formData)
          .pipe(
            finalize(() => {})
          )
          .subscribe(
            (response) => {},
            (error) => {
              console.error('Error creating applicant:', error);
            }
          );
      }
    } else {
      this.mainForm.markAllAsTouched();
    }
  }

  findMatchingJobDescription(formData: any) {
    const { cardNumberDesire, publicEntitySide, governorateDesire } = formData.desireData[0];
    return this.allJobDescriptionData.find((jobDescription) => {
      return (
        jobDescription.card_number === cardNumberDesire &&
        jobDescription.public_entity === publicEntitySide &&
        jobDescription.governorate === governorateDesire
      );
    });
  }
}
