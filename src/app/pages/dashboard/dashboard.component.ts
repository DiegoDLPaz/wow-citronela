import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @ViewChild('drawerToggle') drawerToggleRef!: ElementRef<HTMLInputElement>;

  isDrawerOpen = false;

  updateDrawerState(open: boolean) {
    this.isDrawerOpen = open;
    document.body.style.overflow = 'auto';
  }
}
