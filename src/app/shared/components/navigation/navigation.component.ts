import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent {
  public routerUrl!: string;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.routerUrl = event.urlAfterRedirects;
      }
    });
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
