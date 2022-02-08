import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(
    private toastrService: ToastrService
  ) { }

  showSuccess(message: string){
    this.toastrService.success(message);
  }

  showInfo(message: string){
    this.toastrService.info(message);
  }

  showWarning(message: string){
    this.toastrService.warning(message);
  }

  showError(message: string){
    this.toastrService.error(message);
  }

}
