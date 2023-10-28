import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, shareReplay, take } from "rxjs";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface DataTableInfo {
    actual_return_date: string,
    body: number,
    id: number,
    issuance_date: string
    percent: number,
    return_date: string
    user: string
}

export interface BriefDataTableInfo {
    year_month: string,
    average_loan_sum: number,
    loan_sum: number,
    percentage_sum: number,
    loans_amount: number,
    returned_loans: number
}

@Injectable({
    providedIn: 'root'
})

export class DataService {
    public tableData: BehaviorSubject<DataTableInfo[]> = new BehaviorSubject<DataTableInfo[]>([]);
    public briefTableData: BehaviorSubject<BriefDataTableInfo[]> = new BehaviorSubject<BriefDataTableInfo[]>([]);
    constructor(private http: HttpClient) {
    }

    private fullData = this.http.get<DataTableInfo[]>('https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json').pipe(shareReplay(1));

    public getTableInfo(fromDate: NgbDate | null = null, toDate: NgbDate | null = null, type: 'issuance-date' | 'return-date' | null = null, withExpired: boolean = true) {
        this.fullData.pipe(
            take(1),
            map((data) => (data).filter(v => this.filterExpired(v, withExpired) && this.filterDataWithDateParams(v, fromDate, toDate, type))),
        ).subscribe({next: (data) => {
            this.tableData.next(data);
        }}) 
    }

    public getBriefTableInfo() {
        this.fullData.pipe(
            take(1), map(v => this.transformDataForBriefPage(v))
        ).subscribe({next: (data) => {
            this.briefTableData.next(data);
        }});
    }

    private transformDataForBriefPage(data: DataTableInfo[]): BriefDataTableInfo[] {
        const sortedObj: {[key: string]: DataTableInfo[]} = {};
        data.forEach(e => {                         // loop over all elements
            const k = e.issuance_date.slice(0, 7);  // key in YYYY-MM
            const fk = `${k}`;                      // key
            sortedObj[fk] = sortedObj[fk] || [];    // create new entry if no value for key exists
            sortedObj[fk].push(e);                  // add key to existing list
        });

        const sortedArr = Object.entries(sortedObj).sort();
        const result: BriefDataTableInfo[] = sortedArr.map((v) => ({
            year_month: v[0],
            average_loan_sum: this.getAverage(v[1].map((v: DataTableInfo) => v.body)),
            loan_sum: this.getSum(v[1].map((v: DataTableInfo) => v.body)),
            percentage_sum: this.getSum(v[1].map((v: DataTableInfo) => v.percent)),
            loans_amount: v[1].length,
            returned_loans: v[1].filter((v: DataTableInfo) => v.actual_return_date).length
        }));
        return result;
    }

    getSum(arr: number[]) {
        return arr.reduce((partialSum, a) => partialSum + a, 0);
    }

    private getAverage (arr: number[]) {
        let reducer = (total: number, currentValue: number) => total + currentValue;
        let sum = arr.reduce(reducer);
        return sum / arr.length;
      }

    private filterDataWithDateParams(data: DataTableInfo, fromDate: NgbDate | null, toDate: NgbDate | null, type: 'issuance-date' | 'return-date' | null) {
        const formatedStartDate = `${fromDate?.year}-${fromDate?.month}-${fromDate?.day}`;
        const formatedToDate = `${toDate?.year}-${toDate?.month}-${toDate?.day}`;
        
        if(type === 'issuance-date' && (fromDate || toDate)) {
            return (fromDate ? new Date(formatedStartDate).getTime() <= new Date(data.issuance_date).getTime(): true) &&
                (toDate ? new Date(formatedToDate).getTime() >= new Date(data.issuance_date).getTime(): true);
        }
        else if(type === 'return-date' && (fromDate || toDate)) {
            return (fromDate ? new Date(formatedStartDate).getTime() <= new Date(data.actual_return_date || 0).getTime(): true) &&
            (toDate ? new Date(formatedToDate).getTime() >= new Date(data.actual_return_date || 0).getTime(): true);
        }
        else {
            return true;
        }

    }

    private filterExpired(data: DataTableInfo, withExpired: boolean) {
        if(!withExpired) return true;
        return (((new Date(data.actual_return_date).getTime()) > (new Date(data.return_date).getTime())) 
        || (((new Date(data.return_date).getTime()) < new Date().getTime()) && !data.actual_return_date));
    }

    public getTableColumns() {
        return [
            'ID',
            'Дата видачі',
            'Дата повернення (попередня)',
            'Дата повернення (фактична)',
            'Сума',
            'Відсоток',
            'Користувач'
        ];
    }

    public getBriefTableColumns() {
        return [
            'Рік і місяць',
            'Загальна Сума Виданих кредитів',
            'Середня Сума виданих кредитів',
            'Загальна сума нарахованих відсотків',
            'Кількість виданих кредитів',
            'Кількість повернених кредитів'
        ]
    }
}