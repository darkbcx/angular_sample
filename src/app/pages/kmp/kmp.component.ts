import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-kmp',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './kmp.component.html',
  styleUrls: ['./kmp.component.scss'],
})
export class KmpComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  async onLogout() {
    await this.authService.signout();
    this.router.navigate(['auth','login']);
  }
}
