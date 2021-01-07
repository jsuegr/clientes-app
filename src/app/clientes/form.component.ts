import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();

  public titulo: string = "Crear Cliente";

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {  }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `${json.mensaje}: ${json.cliente.nombre}`, 'success');
      }
    );
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente)=>this.cliente = cliente
        )
      }
    })
  }


  update():void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualizado', `El cliente ${cliente.nombre} ha sido actualizado correctamente.`, 'success')
      }
    )
  }

}
