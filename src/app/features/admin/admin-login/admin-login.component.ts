import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    const { error } = await this.authService.signIn(this.email, this.password);

    this.isLoading = false;

    if (error) {
      this.errorMessage = 'Email ou mot de passe incorrect';
      return;
    }

    this.router.navigate(['/admin']);
  }
}
