import { Component,HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { ConfigService, Config } from '@services/config';
import { effect } from '@angular/core';

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
  
  // Propiedades para almacenar valores calculados una sola vez
  private smallScreenBreakpoint: number = 992;
  private sidebarTopHeight: number = 60;

  constructor(private configService: ConfigService) {
    this.checkScreenSize();
    
    // Crear un effect que se ejecute cuando globalConfig cambie
    effect(() => {
      const globalConfig = this.configService.globalConfig$();
      if (globalConfig) {
        console.log('Configurando temas desde effect - globalConfig cargado');
        this.setupConfig();
        this.calculateConfigValues();
      } else {
        console.log('globalConfig aún no está disponible');
      }
    });
  }

  // Método para configurar los colores y tamaños desde globalConfig
  private setupConfig(): void {
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

  // Método para calcular valores de configuración una sola vez
  private calculateConfigValues(): void {
    const globalConfig = this.configService.getGlobalConfig();
    if (globalConfig?.general?.sizes) {
      const sizes = globalConfig.general.sizes;
      this.smallScreenBreakpoint = sizes['small_screen'] ? parseInt(sizes['small_screen']) : 992;
      this.sidebarTopHeight = sizes['sidebar_top'] ? parseInt(sizes['sidebar_top']) : 60;
    }
  }

  // Getter reactivo para las secciones
  get sections(): Config[] {
    return this.configService.sections;
  }

  // Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const isSmallScreen = window.innerWidth <= this.smallScreenBreakpoint;
    
    // Colapsar automáticamente en pantallas pequeñas
    if (isSmallScreen && !this.isSidebarCollapsed) {
      this.isSidebarCollapsed = true;
    }
  }

  // Método para mostrar solo una sección
  setSectionVisible(name: string): void {
    this.configService.showOnlySection(name);
    this.isSidebarCollapsed = true;

    // Hacer scroll a la sección (tanto en pantallas pequeñas como grandes)
    this.scrollToSection(name);
  }

  // Método para hacer scroll a una sección específica
  private scrollToSection(sectionName: string): void {
    // Pequeño delay para asegurar que el DOM esté actualizado
    setTimeout(() => {
      const isSmallScreen = window.innerWidth <= this.smallScreenBreakpoint;
      
      if (isSmallScreen) {
        // En pantallas pequeñas: scroll al elemento específico
        const element = document.getElementById(sectionName);
        
        if (element) {
          const offset = this.sidebarTopHeight;
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
        // En pantallas grandes: scroll al principio de la página
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
