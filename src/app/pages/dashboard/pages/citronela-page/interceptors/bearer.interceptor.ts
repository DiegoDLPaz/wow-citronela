import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../../../../../environments/environment.development';

let token = environment.blizzardToken

export const bearerInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http://localhost:3000')) {
    return next(req);
  }

  if(localStorage.getItem("access_token")){
    token = localStorage.getItem("access_token")!
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(newReq);
};
