import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { SupabaseService } from '../../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);

  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  readonly isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.initAuthState();
  }

  private async initAuthState() {
    if (!this.supabase.isAvailable) {
      return;
    }

    const authenticated = await this.isAuthenticated();

    this.isAuthenticatedSubject.next(authenticated);

    this.supabase.client.auth.onAuthStateChange(session => {
      this.isAuthenticatedSubject.next(!!session);
    });
  }

  async signIn(email: string, password: string): Promise<{ error: Error | null }> {
    const { error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });

    return {
      error,
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      console.error('Erreur lors de la déconnexion:', error);

      return;
    }

    this.isAuthenticatedSubject.next(false);

    this.router.navigate(['/admin/login']);
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await this.supabase.client.auth.getUser();

      return !!user;
    } catch {
      return false;
    }
  }
}
