import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuSectors = [
    {
      id: 1,
      name: 'Sector 1',
      icon: 'home',
      isOpen: false, // Estado inicial abierto
      options: [
        { id: 1, name: 'Opción 1', route: '/option1', icon: 'settings' },
        { id: 2, name: 'Opción 2', route: '/option2', icon: 'info' }
      ]
    },
    {
      id: 2,
      name: 'Sector 2',
      icon: 'folder',
      isOpen: false, // Estado inicial cerrado
      options: [
        { id: 3, name: 'Opción 3', route: '/option3', icon: 'dashboard' },
        { id: 4, name: 'Opción 4', route: '/option4', icon: 'help' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleSector(sector: any) {
    sector.isOpen = !sector.isOpen; // Cambia el estado de abierto/cerrado
  }
}
