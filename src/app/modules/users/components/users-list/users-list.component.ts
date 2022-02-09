import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

import { AlertService } from '../../../../core/services/alert.service';
import { UserService } from '../../services/user.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { Params } from '../../../../shared/classes/params/params';
import { Page, PageCalculator } from '../../../../shared/classes/page/page';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input('updateList') updateList: Array<any>;
  @Input('setParams') setParams: Params;
  @Output() edit = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();

  rows = [];
  tempRows = [];
  Params = new Params;
  page = new Page();
  pageCalculator = new PageCalculator();
  currentPage = 1;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    this.Params = new Params;

    if (this.setParams.status) {
      this.Params.status = this.setParams.status.toString();
    }
    this.list();
  }

  ngOnInit(): void {
    this.Params.sort_by = 'name';
    this.list();
  }

  list() {

    this.spinnerService.show();

    this.userService.users(null, this.Params)
      .then(data => {
        let result: any = data;
        this.rows = result.data;
        this.tempRows = this.rows;
        this.page = this.pageCalculator.calculatePage(result);
        this.spinnerService.hide();
      },
        error => {
          this.spinnerService.hide();
        });
  }

  setPage(page: number) {
    this.Params.page = String(page);
    this.list();
  }

  tableFilter(event) {
    let searchText: string = event.target.value.toLowerCase();

    if (searchText.toLowerCase().trim() === '') {
      this.rows = this.tempRows
    } else {
      this.rows = this.tempRows.reduce((acc, value) => {
        for (var prop in value) {
          if (value[prop] && value[prop].toString().toLowerCase().includes(searchText.toLowerCase())) {
            acc.push(value)
            return acc
          }
        }
        return acc
      }, [])
    }
  }

  destroyMessage(id: string) {
    this.alertService.destroyMessage()
      .then(data => {
        if (data) {
          this.destroy(id);
        }
      });
  }

  destroy(id: string) {
    this.userService.destroy(id)
      .then(data => {
        this.list();
      });
  }

  show(id: string) {

    this.spinnerService.show();

    this.userService.users(id)
      .then(data => {
        this.edit.emit(data);
        this.spinnerService.hide();
      },
        error => {
          this.spinnerService.hide();
        });
  }

  sortEvent(event) {
    if (event.order == 'asc') {
      this.Params.sort_by = event.property;
      this.Params.sort_by_desc = null;
    } else {
      this.Params.sort_by = null;
      this.Params.sort_by_desc = event.property;
    }
    this.list();
  }

}
