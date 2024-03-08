import { Component, OnInit } from '@angular/core';
import { GovernorateService } from 'src/app/theme/shared/services/governorate-description.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import AddGovernorateDialogComponent from './add-governorate-dialog/add-governorate-dialog.component';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { AuthService } from 'src/app/Auth/auth.service';

interface GovernorateNode {
  id: number; // Add id property to GovernorateNode
  governorate_id?: number; // Add id property to GovernorateNode
  name: string;
  parentName:string;
  children?: GovernorateNode[];
}

interface ExampleFlatNode {
  id?: number; // Add id property to ExampleFlatNode
  governorate_id?: number; // Add id property to ExampleFlatNode
  parentName:string;
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.scss'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, SharedModule],
})
export default class GovernorateComponent implements OnInit {
  private _transformer = (node: GovernorateNode, level: number,) => {
    return {
      id: node.id, // Include id property
      governorate_id: node.governorate_id,// Add id property to ExampleFlatNode
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
  constructor(private governorateService: GovernorateService,
    private dialog:MatDialog,
    private translate:TranslationService,
    private excelService:ExcelService,
    private authService:AuthService

    ) {}

    ngOnInit() {
      this.getData();
      this.translate.setLanguage(localStorage.getItem('i18nextLng'));

    
                  this.role = localStorage.getItem('role');
                  this.permissions = this.authService.permissionsService();
    }
    
performDelete(node): void {
  let childIds: number[] = [];
  let governorateId: number | undefined;
  let parentName;
  
  if (node.name === 'Regions' || node.name === 'Townships' || node.name === 'Villages') {
    const topLevelNode = this.dataSource.data.find(parentNode => parentNode.children);
    if (topLevelNode) {
      const parentNode = topLevelNode.children.find(childNode => childNode.name === node.name);
      if (parentNode) {
        childIds = parentNode.children?.flatMap(child => child.id) || [];
        governorateId = parentNode.children?.[0].governorate_id; // Get governorate_id from the first child
        parentName = parentNode.children?.[0].parentName; // Get governorate_id from the first child
        // Call your API to delete the specific child items using the childIds array
        this.governorateService.deleteGovernorateData(governorateId, childIds, parentName)
        .subscribe(res => {
          // Refresh data after successful deletion
          this.getData();
        });
      }
    }
  } else {
    if(node.level == 2){
      this.governorateService.deleteGovernorateData(node.governorate_id, node.id, node.parentName)
      .subscribe(res => {
        this.getData();
      });
    } else {
      console.log(`Delete node with ID: ${node.id}`);
      this.governorateService.deleteGovernorateData(node.id)
      .subscribe(res => {
        // Refresh data after successful deletion
        this.getData();
      });
    }
  }
}

// Add this function to refresh the data
getData(): void {
  this.governorateService.getGovernorateData().subscribe((res) => {
    const governorates: GovernorateNode[] = res.data.map((governorate) => {
      const regions = governorate.regions.map(region => ({ ...region, parentName: 'Regions' }));
      const townships = governorate.townships.map(township => ({ ...township, parentName: 'Townships' }));
      const villages = governorate.villages.map(village => ({ ...village, parentName: 'Villages' }));



      return {
        id: governorate.id,
        name: governorate.name,
        children: [
          { id: 0, name: 'Regions', children: regions },
          { id: 0, name: 'Townships', children: townships },
          { id: 0, name: 'Villages', children: villages },
        ].filter(node => node.children.length > 0), // Filter out nodes with empty children
      };
    });

    this.dataSource.data = governorates;
  });
}

onPreview(node: ExampleFlatNode) {
  const dialogRef = this.dialog.open(AddGovernorateDialogComponent, {
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
      this.performDelete(node);
      this.getData();
    }
  });
}

addGovernorate(){
  const dialogRef = this.dialog.open(AddGovernorateDialogComponent, {
    width: '50%', 
    height: '90%', 
  });
  dialogRef.afterClosed().subscribe((result) => {
    if(result){
      this.getData();
    }
  });
}


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  exportGovernorate() {
    this.excelService.exportGovernorateExcel().subscribe(blob => {
      this.downloadFile(blob);
    });
  }

  private downloadFile(blob: Blob) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'governorate_data.xlsx'; // Specify the filename
    downloadLink.click();
  }

}
