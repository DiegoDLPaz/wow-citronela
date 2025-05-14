import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs';

@Component({
  selector: 'app-side-nav',
  imports: [],
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent {
  isHandset: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      )
      .subscribe(isHandset => {
        this.isHandset = isHandset;
      });
  }
}
