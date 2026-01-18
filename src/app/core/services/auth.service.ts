import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { SupabaseService } from "../../supabase.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

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

    await supabase.auth.signOut();
    this.router.navigate(['/admin/login']);
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