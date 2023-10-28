import { Component, OnInit } from '@angular/core';
import { DataService, DataTableInfo } from 'src/app/shared/services/data-service';
import { BehaviorSubject } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
  public tableColumns!: string[];
  public tableData: BehaviorSubject<DataTableInfo[]>  = new  BehaviorSubject<DataTableInfo[]>([]);
  private checkboxValue: boolean = false;
  public fromDate!: NgbDate | null;
  public toDate!: NgbDate | null;
  public type!: 'issuance-date' | 'return-date' | null;

  constructor(private dataService: DataService) {
  }
  ngOnInit(): void {
    this.tableData = this.dataService.tableData;
    this.getTableInfo();
    this.tableColumns = this.dataService.getTableColumns();
  }

  dateChanged(event: {fromDate: NgbDate | null, toDate: NgbDate | null}, type: 'issuance-date' | 'return-date') {
    this.fromDate = event.fromDate;
    this.toDate = event.toDate;
    this.type = event.fromDate || event.fromDate ? type: null;
    this.getTableInfo();
  }

  checkboxValueChanged(event: Event) {
    this.checkboxValue = (event?.target as HTMLInputElement)?.checked;
    this.getTableInfo();
  }


  getTableInfo() {  
    this.dataService.getTableInfo(this.fromDate, this.toDate, this.type, this.checkboxValue);
  }

}
