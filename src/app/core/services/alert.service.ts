import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async destroyMessage() {

    let response: boolean = false;

    await Swal.fire({
      title: '¿Seguro de eliminar el registro?',
      text: "¡No se podrá revertir la operación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        response = true;
      } else if (result.isDismissed) {
        response = false;
      }
    })
    return response;
  }

  async cancelMessage() {

    let response: boolean = false;

    await Swal.fire({
      title: '¿Seguro de Cancelar el registro?',
      text: "¡No se podrá revertir la operación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        response = true;
      } else if (result.isDismissed) {
        response = false;
      }
    })
    return response;
  }
}
