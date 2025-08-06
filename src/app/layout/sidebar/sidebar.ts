import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
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
  isSidebarCollapsed = true;
  sections: Section[] = [];

  constructor(private sectionsService: SectionsService) {
    this.sections = this.sectionsService.sections;
    this.checkScreenSize();
  }

  // Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const isSmallScreen = window.innerWidth <= 992;
    
    // Colapsar automáticamente en pantallas pequeñas
    if (isSmallScreen && !this.isSidebarCollapsed) {
      this.isSidebarCollapsed = true;
    }
  }

  // Método para mostrar solo una sección
  setSectionVisible(label: string): void {
    this.sectionsService.showOnlySection(label);
    
    // Solo hacer scroll en pantallas pequeñas (≤992px)
    if (window.innerWidth <= 992) {
      this.scrollToSection(label);
    }
  }

  // Método para hacer scroll a una sección específica
  private scrollToSection(sectionLabel: string): void {
    // Pequeño delay para asegurar que el DOM esté actualizado
    setTimeout(() => {
      const element = document.getElementById(sectionLabel);
      
      if (element) {
        // Calcular el offset para el sidebar en pantallas pequeñas
        const isSmallScreen = window.innerWidth <= 992;
        const offset = isSmallScreen ? 60 : 0; // 60px para el sidebar horizontal
        
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        
        console.log(`Scroll exitoso a: ${sectionLabel}`);
      } else {
        console.warn(`Elemento con ID '${sectionLabel}' no encontrado. IDs disponibles:`, 
          Array.from(document.querySelectorAll('[id]')).map(el => el.id));
      }
    }, 100);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
