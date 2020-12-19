import { Component, OnInit } from '@angular/core';
import {  Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | undefined;

  constructor() { }

  ngOnInit(): void {
    this.clientes = CLIENTES;
  }

}
