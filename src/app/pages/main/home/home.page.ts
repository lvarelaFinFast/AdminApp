import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: any[] =
    [
      { nombre: 'Registro 1' },
      { nombre: 'registro 2' },
      { nombre: 'Registro 3' },
      { nombre: 'Registro 4' },
      { nombre: 'Registro 5' },
      { nombre: 'Registro 6' },
    ]

  constructor() { }

  ngOnInit() {
    ;
  }

}
