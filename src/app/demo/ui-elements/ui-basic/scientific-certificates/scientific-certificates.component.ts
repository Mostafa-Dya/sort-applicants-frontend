import { Component, OnInit } from '@angular/core';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import AddShowScientificCertComponent from './add-show-scientific-cert/add-show-scientific-cert.component';
import { ScientificCertificateService } from 'src/app/theme/shared/services/scientific-certificate.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { AuthService } from 'src/app/Auth/auth.service';

interface GovernorateNode {
  id: number; // Add id property to GovernorateNode
  certificate_general_id?: number; // Add id property to GovernorateNode
  name: string;
  parentName:string;
  children?: GovernorateNode[];
}

interface ExampleFlatNode {
  id?: number; // Add id property to ExampleFlatNode
  certificate_general_id?: number; // Add id property to ExampleFlatNode
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-scientific-certificates',
  templateUrl: './scientific-certificates.component.html',
  styleUrls: ['./scientific-certificates.component.scss'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, SharedModule],
})
export default class ScientificCertificatesComponent implements OnInit {
  private _transformer = (node: GovernorateNode, level: number,) => {
    return {
      id: node.id, // Include id property
      certificate_general_id: node.certificate_general_id,// Add id property to ExampleFlatNode
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      parentName:node.parentName,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
    
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  role:string;
  permissions:any;
  constructor(private scientificCertificateService: ScientificCertificateService,
    private dialog:MatDialog,
    private translate:TranslationService,
    private authService:AuthService

    ) {}

    ngOnInit() {
      this.getData();
      this.translate.setLanguage(localStorage.getItem('i18nextLng'));


    
          this.role = localStorage.getItem('role');
          this.permissions = this.authService.permissionsService();

    }
    
performDelete(node): void {
    console.log(node)
    if(node.level == 1){
      this.scientificCertificateService.deleteScientificCertificateData(node.certificate_general_id, node.id)
      .subscribe(res => {
        // Refresh data after successful deletion
        this.getData();
      });
    } else {
      console.log(`Delete node with ID: ${node.id}`);
      this.scientificCertificateService.deleteScientificCertificateData(node.id)
      .subscribe(res => {
        // Refresh data after successful deletion
        this.getData();
      });
    }

}

// Add this function to refresh the data
getData(): void {
  this.scientificCertificateService.getScientificCertificateData().subscribe((res) => {
    const scientificCertificates: GovernorateNode[] = res.data.map((certificate) => {
      console.log(certificate);

      const precise: GovernorateNode[] = certificate.scientific_cert
        ? certificate.scientific_cert.map((precise) => ({
            ...precise,
            parentName: certificate.name,
          }))
        : [];
      
      console.log(precise);

      return {
        id: certificate.id,
        name: certificate.name,
        children: precise,
      };
    });

    this.dataSource.data = scientificCertificates;
  });
}


onPreview(node: ExampleFlatNode) {
  const dialogRef = this.dialog.open(AddShowScientificCertComponent, {
    data:node.id ,
    width: '50%', 
    height: '90%', 
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.getData();
  });
}

onDelete(node: ExampleFlatNode): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: 'Are you sure you want to delete ?',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // User clicked "Delete"
      this.performDelete(node);
    }
  });
}

addGovernorate(){
  const dialogRef = this.dialog.open(AddShowScientificCertComponent, {
    width: '50%', 
    height: '90%', 
  });
}


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
