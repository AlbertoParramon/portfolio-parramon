import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
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
    this.setupThemeColors();
  }

  // Método para configurar los colores y tamaños del tema desde globalConfig
  private setupThemeColors(): void {
    const globalConfig = this.configService.getGlobalConfig();
    if (globalConfig?.general) {
      const colors = globalConfig.general.colours;
      const sizes = globalConfig.general.sizes;
      
      // Establecer variables CSS personalizadas para colores
      if (colors) {
        document.documentElement.style.setProperty('--sidebar-bg-color', colors['1'] || '#ffffff');
        document.documentElement.style.setProperty('--sidebar-text-color', colors['sidebar_text'] || '#000000');
        document.documentElement.style.setProperty('--sidebar-border-color', colors['1_dark'] || '#e0e0e0');
      }
      
      // Establecer variables CSS personalizadas para tamaños
      if (sizes) {
        document.documentElement.style.setProperty('--small-screen-breakpoint', sizes['small_screen'] || '992px');
        document.documentElement.style.setProperty('--sidebar-top-height', sizes['sidebar_top'] || '60px');
        document.documentElement.style.setProperty('--sidebar-left-width', sizes['sidebar_left'] || '250px');
        document.documentElement.style.setProperty('--profile-photo-size', sizes['profile_photo'] || '150px');
      }
    }
  }

  // Getter reactivo para las secciones
  get sections(): Config[] {
    // También actualizar colores cuando se accede a las secciones (cuando ya está cargada la config)
    if (this.configService.getGlobalConfig()) {
      this.setupThemeColors();
    }
    return this.configService.sections;
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
  setSectionVisible(name: string): void {
    this.configService.showOnlySection(name);
    this.isSidebarCollapsed = true;

    // Solo hacer scroll en pantallas pequeñas (≤992px)
    if (window.innerWidth <= 992) {
      this.scrollToSection(name);
    }
  }

  // Método para hacer scroll a una sección específica
  private scrollToSection(sectionName: string): void {
    // Pequeño delay para asegurar que el DOM esté actualizado
    setTimeout(() => {
      const element = document.getElementById(sectionName);
      
      if (element) {
        // Calcular el offset para el sidebar en pantallas pequeñas
        const isSmallScreen = window.innerWidth <= 992;
        const offset = isSmallScreen ? 60 : 0; // 60px para el sidebar horizontal
        
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        
        console.log(`Scroll exitoso a: ${sectionName}`);
      } else {
        console.warn(`Elemento con ID '${sectionName}' no encontrado. IDs disponibles:`, 
          Array.from(document.querySelectorAll('[id]')).map(el => el.id));
      }
    }, 100);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
