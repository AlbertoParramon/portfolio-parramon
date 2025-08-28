import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface for global configuration
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
  [key: string]: any; // Allows additional fields
}

// Interface for sections
export interface Config {
  name: string;
  label: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root' // Makes the service available throughout the application
})
export class ConfigService {
  // Normal variable for global configuration (only loaded once)
  private globalConfig: GlobalConfig | null = null;

  // Signal for sections list (reactive) - initialized from config.json
  private sectionsSignal = signal<Config[]>([]);

  // Signal for calculated values (reactive)
  private configValuesSignal = signal<{
    smallScreenBreakpoint: number;
    sidebarTopHeight: number;
  }>({
    smallScreenBreakpoint: 992,
    sidebarTopHeight: 60
  });

  constructor(private http: HttpClient) {
    this.loadGlobalConfig();
  }

  // Method to load global configuration from JSON file
  private loadGlobalConfig(): void {
    this.http.get<GlobalConfig>('./assets/config.json')
      .subscribe({
        next: (config) => {
          console.log('ConfigService - config.json loaded successfully:', config);
          this.globalConfig = config;
          this.initializeSectionsFromConfig();
          this.setupConfig(); // Configure automatically
        },
        error: (error) => {
          console.error('Error loading global configuration:', error);
          this.showConfigError(error);
        }
      });
  }

  private initializeSectionsFromConfig(): void {
    if (!this.globalConfig?.sections) {
      console.warn('No sections found in global configuration');
      return;
    }

    const sections: Config[] = [];
    const sectionKeys = Object.keys(this.globalConfig.sections);
    
    // Convert each section from JSON to Config structure
    sectionKeys.forEach((key, index) => {
      const section = this.globalConfig!.sections![key];
      sections.push({
        name: key, // Object key (about, education, etc.)
        label: section.label || key.toUpperCase(), // Label from JSON
        visible: index === 0 // true for first, false for rest
      });
    });

    // Update signal with converted sections
    this.sectionsSignal.set(sections);
    console.log('SectionsSignal initialized from config.json:', sections);
  }

  // Method to configure automatically when globalConfig is loaded
  private setupConfig(): void {
    if (!this.globalConfig?.general) {
      return;
    }

    const colors = this.globalConfig.general.colours;
    const sizes = this.globalConfig.general.sizes;

    // Configure all CSS variables for colors
    if (colors) {
      document.documentElement.style.setProperty('--sidebar-bg-color', colors['main'] || '#ffffff');
      document.documentElement.style.setProperty('--sidebar-text-color', colors['sidebar_text'] || '#000000');
      document.documentElement.style.setProperty('--sidebar-border-color', colors['main_dark'] || '#e0e0e0');
      document.documentElement.style.setProperty('--main-content-bg-color', colors['background_total'] || '#ffffff');
      document.documentElement.style.setProperty('--footer-bg-color', colors['background'] || '#ffffff');
      document.documentElement.style.setProperty('--section-bg-color', colors['background_total'] || '#ffffff');
      document.documentElement.style.setProperty('--about-bg-color', colors['background_total'] || '#ffffff');
      document.documentElement.style.setProperty('--main-content-text-color', colors['main-content_text'] || '#2c3e50');
      document.documentElement.style.setProperty('--body-bg-color', colors['background'] || '#ffffff');
    }

    // Configure all CSS variables for sizes
    if (sizes) {
      document.documentElement.style.setProperty('--small-screen-breakpoint', sizes['small_screen'] || '992px');
      document.documentElement.style.setProperty('--sidebar-top-height', sizes['sidebar_top'] || '60px');
      document.documentElement.style.setProperty('--sidebar-left-width', sizes['sidebar_left'] || '250px');
      document.documentElement.style.setProperty('--profile-photo-size', sizes['profile_photo'] || '150px');

      // Update signal with calculated values
      this.configValuesSignal.set({
        smallScreenBreakpoint: sizes['small_screen'] ? parseInt(sizes['small_screen']) : 992,
        sidebarTopHeight: sizes['sidebar_top'] ? parseInt(sizes['sidebar_top']) : 60
      });
    }

    console.log('Configuration applied automatically from ConfigService');
  }

  // Method to show configuration error
  private showConfigError(error: any): void {
    // Create error element in DOM
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
      <h1 style="margin-bottom: 20px; font-size: 2em;">❌ Configuration Error</h1>
      <div style="background-color: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; max-width: 600px;">
        <h2 style="margin-bottom: 15px;">Error Details:</h2>
        <pre style="background-color: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; overflow-x: auto; text-align: left;">
${JSON.stringify(error, null, 2)}
        </pre>
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(errorDiv);
  }

  // Public getter to access sections
  get sections() {
    return this.sectionsSignal();
  }

  get config() {
    return this.globalConfig;
  }
  
  // Getter for visible sections only
  get visibleSections() {
    return this.sectionsSignal().filter(section => section.visible);
  }

  // Getter for all sections
  get allSections() {
    return this.sectionsSignal();
  }

  // Method to show only one specific section
  showOnlySection(name: string) {
    const updatedSections = this.sectionsSignal().map(section => ({
      ...section,
      visible: section.name === name
    }));
    this.sectionsSignal.set(updatedSections);
  }

  // Getters to access calculated values
  get smallScreenBreakpoint$() {
    return this.configValuesSignal().smallScreenBreakpoint;
  }

  get sidebarTopHeight$() {
    return this.configValuesSignal().sidebarTopHeight;
  }
} 