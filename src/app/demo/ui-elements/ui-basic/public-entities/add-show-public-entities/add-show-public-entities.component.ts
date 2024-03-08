// Import necessary modules
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Auth/auth.service';
import { PublicEntitieService } from 'src/app/theme/shared/services/public-entitie.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-show-public-entities',
  templateUrl: './add-show-public-entities.component.html',
  styleUrls: ['./add-show-public-entities.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export default class AddShowPublicEntitiesComponent implements OnInit {
  subEntitiesSets: FormArray;
  mainForm: FormGroup;
  categoryMapping: { [key: string]: number } = {
    'فئة أولى': 1,
    'فئة ثانية': 2,
    'فئة ثالثة': 3,
    'فئة رابعة': 4,
    'فئة خامسة': 5,
  };
  categoryOrder: string[] = ['فئة أولى', 'فئة ثانية', 'فئة ثالثة', 'فئة رابعة', 'فئة خامسة'];
    
  role: string;
  permissions: any;
  constructor(
    public dialogRef: MatDialogRef<AddShowPublicEntitiesComponent>,
    private fb: FormBuilder,
    private publicEntitieService: PublicEntitieService,
    private translate:TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  
    if (this.data) {
      this.publicEntitieService.getPublicEntitieDataId(this.data).subscribe((res) => {
        console.log(res.data);
        const publicEntitieData = res.data[0]; // Assuming the response is an array with a single element
  
        this.mainForm.patchValue({
          publicEntity: publicEntitieData.name,
        });
  
        const subEntities = publicEntitieData.sub_entities.map((subEntity) => {
          const affiliatedEntities = subEntity.affiliated_entities.map((affEntity) =>
            this.fb.group({ affiliatedEntityName: affEntity.name })
          );
          return this.fb.group({
            name: subEntity.name,
            affiliatedEntities: this.fb.array(affiliatedEntities),
          });
        });
  
        this.subEntitiesSets = this.fb.array(subEntities);
        this.mainForm.setControl('subEntitiesData', this.subEntitiesSets);
  
      });
    }
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));

  
      this.role = localStorage.getItem('role');
      this.permissions = this.authService.permissionsService();
  }

  initForm() {
    this.mainForm = this.fb.group({
      publicEntity: ['', Validators.required],
      subEntitiesData: this.fb.array([]),
    });
  
    this.subEntitiesSets = this.mainForm.get('subEntitiesData') as FormArray;
  }
  

// Inside the addAffiliatedEntities function
addAffiliatedEntities(subEntity: AbstractControl) {
  console.log(subEntity)
  const affiliatedEntities = (subEntity as FormGroup).get('affiliatedEntities') as FormArray;

  if (!affiliatedEntities) {
    // Initialize the 'affiliatedEntities' FormArray if not present
    (subEntity as FormGroup).addControl('affiliatedEntities', this.fb.array([]));
  } else if (!(affiliatedEntities instanceof FormArray)) {
    // Replace 'affiliatedEntities' with a new FormArray if it's not an instance of FormArray
    (subEntity as FormGroup).setControl('affiliatedEntities', this.fb.array([]));
  }

  affiliatedEntities.push(this.fb.group({ affiliatedEntityName: [''] }));
}


  addSets(group: string) {
    if (!this.subEntitiesSets) {
      this.subEntitiesSets = this.fb.array([]);
      this.mainForm.setControl('subEntitiesData', this.subEntitiesSets);
    }

    let subEntityGroup = this.fb.group({
      name: [''],
      affiliatedEntities: this.fb.array([]),
    });

    if (group === 'subEntity') {
      (this.subEntitiesSets as FormArray).push(subEntityGroup);
    }
  }

  getAffiliatedEntitiesControls(subEntity: AbstractControl): AbstractControl[] {
    if (subEntity instanceof FormGroup) {
      const affiliatedEntities = subEntity.get('affiliatedEntities') as FormArray;
      return affiliatedEntities ? (affiliatedEntities.controls as AbstractControl[]) : [];
    }
    return [];
  }

  removeSet(index: number, group: string) {
    let formArray: FormArray;

    switch (group) {
      case 'subEntity':
        formArray = this.subEntitiesSets;
        break;
      default:
        return;
    }

    if (formArray && formArray.length > 0) {
      formArray.removeAt(index);
    }
  }

  removeAffiliatedEntities(subEntity: AbstractControl, index: number) {
    const affiliatedEntities = (subEntity as FormGroup).get('affiliatedEntities') as FormArray;
    affiliatedEntities.removeAt(index);
  }

  submit() {
    if (this.mainForm.valid) {
      const formData = this.mainForm.value;
  
      const subEntitiesData = this.subEntitiesSets.controls.map((control) => {
        const affiliatedEntities = (control.get('affiliatedEntities') as FormArray).controls.map((affControl) =>
          affControl.get('affiliatedEntityName').value
        );
  
        return {
          name: control.get('name').value,
          affiliated_entities: affiliatedEntities,
        };
      });
  
      const apiPayload = {
        name: formData.publicEntity,
        sub_entities: subEntitiesData,
      };
      if(this.data){
        this.publicEntitieService.updatePublicEntitieData(this.data,apiPayload).subscribe(
          (response) => {
            if(response){
              this.dialogRef.close();
            }
            // Close the dialog or perform any additional action
          },
          (error) => {
            console.error('Error:', error);
            // Handle the error and display an appropriate message to the user
          });
      }else{
        this.publicEntitieService.createPublicEntitieData(apiPayload).subscribe(
          (response) => {
            if(response){
              this.dialogRef.close();
            }
            // Close the dialog or perform any additional action
          },
          (error) => {
            console.error('Error:', error);
            // Handle the error and display an appropriate message to the user
          });
      }
      // Call your API service to create the public entity and related entities

    } else {
      this.mainForm.markAllAsTouched();
    }
  }
  
  
}
