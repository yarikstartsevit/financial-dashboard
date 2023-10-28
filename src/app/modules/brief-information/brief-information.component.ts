import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService, BriefDataTableInfo } from 'src/app/shared/services/data-service';

@Component({
  selector: 'app-brief-information',
  templateUrl: './brief-information.component.html',
  styleUrls: ['./brief-information.component.scss']
})
export class BriefInformationComponent {
  public briefTableColumns!: string[];
  public briefTableData!: BehaviorSubject<BriefDataTableInfo[]>;
  constructor(private dataService: DataService) {
    this.briefTableData = dataService.briefTableData;
  }
  ngOnInit(): void {
    this.briefTableColumns = this.dataService.getBriefTableColumns();;
    this.dataService.getBriefTableInfo();
  }
}
