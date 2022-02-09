import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'unow-web';

  subscription: Subscription;

  constructor(
      private router: Router,
      private authService: AuthService,
      ) {
  }

  ngOnInit() {
      this.subscription = this.router.events
          .pipe(
              filter(event => event instanceof NavigationEnd)
          )
          .subscribe(() => window.scrollTo(0, 0));

      let session = this.authService.loadSession();
      if (session) {
          this.authService.authenticate();
      }

      this.authService.autenticationState.subscribe(state => {

          if (!state) {
              this.router.navigate(['auth']);
          }

      });

  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

}
