import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface para la configuración global
export interface GlobalConfig {
  general?: {
    paths?: {
      profile_photo?: string;
      logo?: string;
      [key: string]: string | undefined;
    };
    colours?: {
      [key: string]: string;
    };
    sizes?: {
      [key: string]: string;
    };
    [key: string]: any;
  };
  sections?: {
    [key: string]: {
      visible?: boolean;
      label?: string;
      [key: string]: any;
    };
  };
  [key: string]: any; // Permite campos adicionales
}

// Interface para las secciones
export interface Config {
  name: string;
  label: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class ConfigService {
  // Variable para la configuración global
  public globalConfig: GlobalConfig | null = null;

  // Signal para la lista de secciones (reactive)
  private sectionsSignal = signal<Config[]>([
    { name: 'ABOUT', label: 'app-about', visible: true },
    { name: 'EDUCATION', label: 'app-education', visible: false },
    { name: 'EXPERIENCE', label: 'app-experience', visible: false },
    { name: 'SKILLS', label: 'app-skills', visible: false },
    { name: 'PROJECTS', label: 'app-projects', visible: false },
    { name: 'OTRA', label: 'app-otra', visible: false }
  ]);

  constructor(private http: HttpClient) {
    this.loadGlobalConfig();
  }

  // Método para cargar la configuración global desde el archivo JSON
  private loadGlobalConfig(): void {
    this.http.get<GlobalConfig>('./assets/config.json')
      .subscribe({
        next: (config) => {
          this.globalConfig = config;
          console.log('Configuración global cargada:', config);
        },
        error: (error) => {
          console.error('Error al cargar la configuración global:', error);
          this.showConfigError(error);
        }
      });
  }

  // Método para mostrar error de configuración
  private showConfigError(error: any): void {
    // Crear un elemento de error en el DOM
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f44336;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    `;
    
    errorDiv.innerHTML = `
      <h1 style="margin-bottom: 20px; font-size: 2em;">❌ Error en la configuración</h1>
      <div style="background-color: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; max-width: 600px;">
        <h2 style="margin-bottom: 15px;">Detalles del error:</h2>
        <pre style="background-color: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; overflow-x: auto; text-align: left;">
${JSON.stringify(error, null, 2)}
        </pre>
      </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(errorDiv);
  }

  // Getter público para acceder a las secciones
  get sections() {
    return this.sectionsSignal();
  }

  // Getter público para acceder a la configuración global
  getGlobalConfig(): GlobalConfig | null {
    return this.globalConfig;
  }

  // Método para obtener una configuración específica
  getConfigValue(path: string): any {
    if (!this.globalConfig) return null;
    
    const keys = path.split('.');
    let value: any = this.globalConfig;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return value;
  }
  
  // Getter para solo secciones visibles
  get visibleSections() {
    return this.sectionsSignal().filter(section => section.visible);
  }

  // Getter para todas las secciones
  get allSections() {
    return this.sectionsSignal();
  }

  // Método para actualizar la visibilidad de una sección
  toggleSection(label: string) {
    const currentSections = this.sectionsSignal();
    const updatedSections = currentSections.map(section => ({
      ...section,
      visible: section.label === label ? !section.visible : section.visible
    }));
    this.sectionsSignal.set(updatedSections);
  }

  // Método para mostrar solo una sección específica
  showOnlySection(label: string) {
    const updatedSections = this.sectionsSignal().map(section => ({
      ...section,
      visible: section.label === label
    }));
    this.sectionsSignal.set(updatedSections);
  }
} 