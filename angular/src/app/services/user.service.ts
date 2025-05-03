import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserType } from '../types/user.type';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    http = inject(HttpClient);
    cookiesKey = 'threads_user';

    constructor(
        private _cookieService: CookieService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    createUser(name: string, email: string) {
        const user = this.http.post<UserType>(`${environment.apiBaseUrl}/users`, {
            name,
            email,
        });

        return user;
    }

    saveUserToCookies(user: UserType) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        
        this._cookieService.set(this.cookiesKey, JSON.stringify(user));
    }

    getUserFromCookies() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const cookiesValue = this._cookieService.get(this.cookiesKey);
        const user = cookiesValue ? JSON.parse(cookiesValue) as UserType : null;
        return user;
    }
}
