import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WowService} from '../citronela-page/services/wow.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html'
})
export class CallbackComponent {

  route = inject(ActivatedRoute)
  router = inject(Router)
  wowService = inject(WowService)

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];

      console.log('Callback received - Code:', code, 'State:', state);

      if (code && state) {
        console.log('Attempting to exchange code for token...');
        this.wowService.exchangeCodeForToken(code).subscribe({
          next: (res) => {
            console.log('Token exchange successful:', res);

            localStorage.setItem('access_token', res.access_token)

            this.router.navigate(['/mis-personajes']);
          },
          error: (err) => {
            console.error('Error exchanging code for token', err);
          }
        });
      } else {
        console.error('Missing code or state parameters');
      }
    });

  }
}
