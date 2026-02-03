import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { SupabaseService } from "../../supabase.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  
  constructor() {
    this.initAuthState();
  }

  private async initAuthState() {
    const authenticated = await this.isAuthenticated();
    this.isAuthenticatedSubject.next(authenticated);
    
    if (isPlatformBrowser(this.platformId)) {
      const supabase = this.supabaseService.getSupabaseClient();
      if (supabase) {
        supabase.auth.onAuthStateChange((session) => {
          this.isAuthenticatedSubject.next(!!session);
        });
      }
    }
  }

  async signIn(email: string, password: string): Promise<{ error: Error | null }> {
    if (!isPlatformBrowser(this.platformId)) {
      return { error: new Error('Not in browser') };
    }

    const supabase = this.supabaseService.getSupabaseClient();
    if (!supabase) {
      return { error: new Error('Supabase not initialized') };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  }

  async signOut(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const supabase = this.supabaseService.getSupabaseClient();
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } else {
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/admin/login']);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const supabase = this.supabaseService.getSupabaseClient();
    if (!supabase) {
      return false;
    }

    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  }
}