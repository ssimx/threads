import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'Threads';
    userService = inject(UserService);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const user = this.userService.getUserFromCookies();
        if (!user) {
            const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
            const randomName = `user_${randomNumber}`;
            const randomEmail = `${randomName}@gmail.com`;
            this.userService.createUser(randomName, randomEmail)
                .subscribe((user) => {
                    console.log('user created');
                    this.userService.saveUserToCookies(user);
                })
        }
    }

}
