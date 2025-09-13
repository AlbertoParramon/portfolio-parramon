import { Component,HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { ConfigService, Config } from '@services/config';

/*
The parent component must handle what to do when the sidebar collapses.
This component has the class:
    '[class.sidebar-is-collapsed]': 'isSidebarCollapsed'

Another alternative would have been:
In sidebar.ts:
@Output() sidebarStateChange = new EventEmitter<boolean>();
this.sidebarStateChange.emit(this.isSidebarCollapsed);

In the parent component:
isSidebarCollapsed = false;
onSidebarStateChange(collapsed: boolean) {
  this.isSidebarCollapsed = collapsed;
}

And then manage what to do when it collapses.
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

  get config(): any {
    return this.configService.config;
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
          
          console.log(`Successful scroll to: ${sectionName} - Small screen`);
        } else {
          console.warn(`Element with ID '${sectionName}' not found. Available IDs:`, 
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
