import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

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

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'Analytics' },
        { icon: 'fas fa-tasks', label: 'Projects' },
      ]
    },
    {
      icon: 'fas fa-cog',
      label: 'Settings',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'Profile' },
        { icon: 'fas fa-lock', label: 'Security' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Messages'
    }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
