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
  role: string;
  permissions: any;

  constructor(
    public dialogRef: MatDialogRef<AddShowPublicEntitiesComponent>,
    private fb: FormBuilder,
    private publicEntitieService: PublicEntitieService,
    private translate: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));
    this.role = localStorage.getItem('role');
    this.permissions = this.authService.permissionsService();
    
    if (this.data) {
      this.publicEntitieService.getPublicEntitieDataId(this.data).subscribe((res) => {
        console.log(res.data)
        const publicEntitieData = res.data;
        this.mainForm.patchValue({
          publicEntity: publicEntitieData.name,
        });
  
        const subEntities = publicEntitieData.sub_entities.map((subEntity) => {
          console.log(subEntity)
  
          const affiliatedEntities = subEntity.affiliated_entities.map((affEntity) => {
            console.log(affEntity.name);
          
            const subAffiliatedEntities = affEntity.sub_affiliated_entities.map((subAffEntity) => {
              console.log(subAffEntity);
          
              return this.fb.group({ subAffiliatedEntityName: subAffEntity.name });
            });
          
            return this.fb.group({
              name: affEntity.name,
              subAffiliatedEntities: this.fb.array(subAffiliatedEntities)
            });
          });
          
  
          return this.fb.group({
            name: subEntity.name,
            affiliatedEntities: this.fb.array(affiliatedEntities)
          });
        });
        this.subEntitiesSets = this.fb.array(subEntities);
        // Check if mainForm is initialized before setting control
        if (this.mainForm) {
          this.mainForm.setControl('subEntitiesData', this.subEntitiesSets);
        }
      });
    }
  }
  
  
  initForm() {
    this.mainForm = this.fb.group({
      publicEntity: ['', Validators.required],
      subEntitiesData: this.fb.array([]),
    });
  
    // Check if subEntitiesSets is initialized before setting value
    if (!this.subEntitiesSets) {
      this.subEntitiesSets = this.mainForm.get('subEntitiesData') as FormArray;
    }
  }
  
  

  addSets(group: string) {
    console.log(group)
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

  addAffiliatedEntities(subEntity: AbstractControl) {
    const affiliatedEntities = (subEntity as FormGroup).get('affiliatedEntities') as FormArray;
    if (affiliatedEntities) { // Check if affiliatedEntities is not null
      const newAffiliatedEntity = this.fb.group({
        name: ['', Validators.required], // Initialize the name control with required validator
        subAffiliatedEntities: this.fb.array([]), // Initialize the subAffiliatedEntities form array
      });
      affiliatedEntities.push(newAffiliatedEntity);
    }
  }
  
  addSubAffiliatedEntities(affiliatedEntity: AbstractControl) {
    console.log("Affiliated Entity:", affiliatedEntity);
    const affiliatedEntities = (affiliatedEntity as FormGroup).get('affiliatedEntities') as FormArray;
    console.log("Affiliated Entities Form Array:", affiliatedEntities);

    if (!affiliatedEntities || affiliatedEntities.length === 0) {
        console.error("Affiliated Entities Form Array not found or empty.");
        return; // Exit the function if FormArray is not found or empty
    }

    const lastAffiliatedEntity = affiliatedEntities.at(affiliatedEntities.length - 1) as FormGroup;
    const subAffiliatedEntities = lastAffiliatedEntity.get('subAffiliatedEntities') as FormArray;

    if (!subAffiliatedEntities) {
        console.error("Sub Affiliated Entities Form Array not found.");
        return; // Exit the function if FormArray is not found
    }

    subAffiliatedEntities.push(this.fb.group({ subAffiliatedEntityName: ['', Validators.required] }));
}


  

  getAffiliatedEntitiesControls(subEntity: AbstractControl): AbstractControl[] {
    if (subEntity instanceof FormGroup) {
      const affiliatedEntities = subEntity.get('affiliatedEntities') as FormArray;
      return affiliatedEntities ? (affiliatedEntities.controls as AbstractControl[]) : [];
    }
    return [];
  }

  getSubAffiliatedEntitiesControls(affiliatedEntity: AbstractControl): AbstractControl[] {
    if (affiliatedEntity instanceof FormGroup) {
      const subAffiliatedEntities = affiliatedEntity.get('subAffiliatedEntities') as FormArray;
      return subAffiliatedEntities ? (subAffiliatedEntities.controls as AbstractControl[]) : [];
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

  removeSubAffiliatedEntities(affiliatedEntity: AbstractControl, index: number) {
    const subAffiliatedEntities = (affiliatedEntity as FormGroup).get('subAffiliatedEntities') as FormArray;
    subAffiliatedEntities.removeAt(index);
  }

  submit() {
    if (this.mainForm.valid) {
      const formData = this.mainForm.value;
  
      const subEntitiesData = this.subEntitiesSets.controls.map((control) => {
        const affiliatedEntities = (control.get('affiliatedEntities') as FormArray).controls.map((affControl) => {
          const subAffiliatedEntities = (affControl.get('subAffiliatedEntities') as FormArray).controls.map((subAffControl) =>
            subAffControl.get('subAffiliatedEntityName').value
          );
          return {
            name: affControl.get('name').value,
            sub_affiliated_entities: subAffiliatedEntities.map(entity => ({ name: entity }))
          };
        });
  
        return {
          name: control.get('name').value,
          affiliated_entities: affiliatedEntities,
        };
      });
  
      const apiPayload = {
        name: formData.publicEntity,
        sub_entities: subEntitiesData,
      };
  
      if (this.data) {
        this.publicEntitieService.updatePublicEntitieData(this.data, apiPayload).subscribe(
          (response) => {
            if (response) {
              this.dialogRef.close();
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      } else {
        this.publicEntitieService.createPublicEntitieData(apiPayload).subscribe(
          (response) => {
            if (response) {
              this.dialogRef.close();
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    } else {
      this.mainForm.markAllAsTouched();
    }
  }
  
  
}
