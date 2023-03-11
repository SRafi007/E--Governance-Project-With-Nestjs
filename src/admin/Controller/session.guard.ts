import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
  return request.session.email !==undefined;
  }
}

/*
export class SessionGuardd implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        //throw new Error('Method not implemented.');
        console.log("this is a guard");

        return false;
    }

}
*/