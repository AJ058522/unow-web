import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../auth/services/auth.service';
import { Params as API_Params } from '../../../../shared/classes/params/params';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  title: string = 'Empleados';
  updateList: string = null;
  setParams = new API_Params;
  formData: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private authService: AuthService,
    // private ordersService: OrdersService,
    private modalService: NgbModal,
  ) {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.setParams.status = params.value;
        this.ngOnInit();
      }
    );
  }

  open(content) {
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      this.formData = null;
    });
  }

  ngOnInit(): void {
  }

  edit(event: string) {
    this.formData = event;
    const addButton = document.getElementById('add-button');
    addButton.focus();
    addButton.click();
  }

  movementCreationStatus(event: string) {
    if (event == 'success') {
      this.modalService.dismissAll();
      this.updateList = Math.random().toString(36).substring(7);
    }
  }

  goBack() {
    this._location.back();
  }

}
