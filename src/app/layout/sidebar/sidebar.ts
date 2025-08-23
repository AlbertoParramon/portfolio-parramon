import { Component,HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { ConfigService, Config } from '@services/config';

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

  constructor(private configService: ConfigService) {
    this.checkScreenSize();
  }
  
  get sections(): Config[] {
    return this.configService.sections;
  }

  // Detect window resize changes
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const isSmallScreen = window.innerWidth <= this.configService.smallScreenBreakpoint$;
    
    // Automatically collapse on small screens
    if (isSmallScreen && !this.isSidebarCollapsed) {
      this.isSidebarCollapsed = true;
    }
  }

  // Method to show only one section
  setSectionVisible(name: string): void {
    this.configService.showOnlySection(name);
    this.isSidebarCollapsed = true;

    // Scroll to section (both on small and large screens)
    this.scrollToSection(name);
  }

  // Method to scroll to a specific section
  private scrollToSection(sectionName: string): void {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      const isSmallScreen = window.innerWidth <= this.configService.smallScreenBreakpoint$;
      
      if (isSmallScreen) {
        // On small screens: scroll to specific element
        const element = document.getElementById(sectionName);
        
        if (element) {
          const offset = this.configService.sidebarTopHeight$;
          const elementPosition = element.offsetTop - offset;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
          
          console.log(`Scroll exitoso a: ${sectionName} - Pantalla pequeña`);
        } else {
          console.warn(`Elemento con ID '${sectionName}' no encontrado. IDs disponibles:`, 
            Array.from(document.querySelectorAll('[id]')).map(el => el.id));
        }
      } else {
        // On large screens: scroll to top of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        console.log(`Scroll al principio de la página - Pantalla grande`);
      }
    }, 100);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
