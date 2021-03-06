import { Component, OnInit } from '@angular/core';
import {  Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | undefined;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      cliente => {
        this.clientes = cliente;

      }
    );
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
    title: '¿Estas seguro?',
    text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.delete(cliente.id).subscribe(
        response => {
          this.clientes = this.clientes?.filter(cli => cli !== cliente)
        }
      )

      swalWithBootstrapButtons.fire(
        '¡Cliente eliminado!',
        `Cliente ${cliente.nombre} eliminado con éxito.`,
        'success'
      )
    }
    })
  }

}
