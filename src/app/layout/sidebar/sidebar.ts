import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { SectionsService, Section } from '@services/sections';

/*
El componente padre debe gestionar qué hacer cuando sidebar se colapsa
Este componente tiene la clase
    '[class.sidebar-is-collapsed]': 'isSidebarCollapsed'

Otra alternativa hubiera sido:
En sidebar.ts:
@Output() sidebarStateChange = new EventEmitter<boolean>();
this.sidebarStateChange.emit(this.isSidebarCollapsed);

En componente padre:
isSidebarCollapsed = false;
onSidebarStateChange(collapsed: boolean) {
  this.isSidebarCollapsed = collapsed;
}

Y gestionar qué hacer cuando colapsa
*/

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class.sidebar-is-collapsed]': 'isSidebarCollapsed'
  }
})

export class Sidebar {
  isSidebarCollapsed = false;
  sections: Section[] = [];

  constructor(private sectionsService: SectionsService) {
    this.sections = this.sectionsService.sections;
  }

  // Método para mostrar solo una sección
  setSectionVisible(label: string): void {
    this.sectionsService.showOnlySection(label);
    // Actualizar la lista local para reflejar los cambios
    this.sections = this.sections.map(section => ({
      ...section,
      visible: section.label === label
    }));
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
