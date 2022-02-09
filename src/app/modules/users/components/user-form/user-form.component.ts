import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../users/interfaces/user';
import { UserService } from '../../../users/services/user.service';

import { Params } from '../../../../shared/classes/params/params';
import { ErrorHandle } from '../../../../shared/classes/error-handle/error-handle';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input('formData') formData: any;
  @Output() status = new EventEmitter<string>();

  addForm: FormGroup;
  title: string = 'Agregar Empleado';
  showSaveButton: boolean = true;
  Params = new Params;
  usersList: Array<User> = [];
  positionsList: Array<string> = [];
  estatusList: Array<any> = [
    {
      id: 1,
      name: 'Contratado'
    },
    {
      id: 2,
      name: 'Reritado'
    }
  ];
  readOnly: boolean;
  usersReadOnly: boolean;
  errorMessage: string = null;
  errors: Array<any> = [];
  errorHandle = new ErrorHandle();

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.addForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      job: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      estatus: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(191)]],
      password_confirmation: ['', [Validators.required, Validators.maxLength(191)]],
    });

    this.listPositions();

    if (this.formData) {
      this.fillForm(this.formData);
      this.addForm.get('password').setValidators([]);
      this.addForm.get('password_confirmation').setValidators([]);
    }
  }

  listUsers() {
    this.userService.users(null, null)
      .then(data => {
        let result: any = data;
        this.usersList = result.data;
      },
        error => {
          this.usersList = [];
        });
  }

  listPositions() {
    this.userService.positions()
      .then(data => {
        let result: any = data;
        this.positionsList = result.positions;
      },
        error => {
          this.positionsList = [];
        });
  }

  fillForm(formData: any) {

    const formProperties = this.addForm.value;
    const keys = Object.keys(formProperties);
    this.usersReadOnly = true;

    if (keys.length > 0) {
      for (let index = 0; index < keys.length; index++) {
        if (formData.hasOwnProperty(keys[index]) && !Array.isArray(formData[keys[index]]) && `${formData[keys[index]]}` != 'null') {
          this.addForm.get(`${keys[index]}`).setValue(`${formData[keys[index]]}`);
        }
      }
    }

    this.addForm.get('estatus').setValue(formData.estatus);
    this.listUsers();
  }

  onSubmit() {
    if (!this.formData) {
      this.store();
    } else {
      this.update();
    }
  }

  store() {
    this.userService.store(this.addForm.value)
      .then(data => {
        let result: any = data;
        this.status.emit('success');
      },
        error => {
          this.status.emit('Error');
          this.showErrors(error);
        });
  }

  update() {    
    this.userService.update(this.formData.id, this.addForm.value)
      .then(data => {
        let result: any = data;
        this.status.emit('success');
      },
        error => {
          this.status.emit('Error');
          this.showErrors(error);
        });
  }

  showErrors(error: any) {
    this.errorMessage = null;
    const details = error.error.error;
    this.errors = this.errorHandle.errors(error.error.error);
  }

}
