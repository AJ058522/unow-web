import { Injectable } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { CustomToastrService } from './custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  constructor(
    private authService: AuthService,
    private customToastrService: CustomToastrService
  ) { }

  showResponse(response: any) {

    const status: number = response.status ? response.status : null;

    switch (status) {

      case 200:
        this.customToastrService.showSuccess('Operación realizada con éxito.');
        break;

      case 201:
        this.customToastrService.showSuccess('Registro creado con éxito.');
        break;

      case 401:
        this.customToastrService.showWarning('Usuario no autenticado.');
        this.authService.unauthenticate();
        break;

      case 403:
        this.customToastrService.showWarning('Usuario no autorizado.');
        this.authService.unauthenticate();
        break;

      case 404:
        this.customToastrService.showError('Recurso no encontrado.');
        break;

      case 405:
        this.customToastrService.showError('Método solicitado no encontrado.');
        break;

      case 409:
        this.customToastrService.showError('No se puede eliminar el recurso.');
        break;

      case 422:
        this.customToastrService.showError('No se pudo procesar la solicitud.');
        break;

    }

  }
}
