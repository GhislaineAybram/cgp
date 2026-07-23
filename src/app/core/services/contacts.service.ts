/**
 * @fileoverview Contacts Service - Messages received by form contact management
 * @description Service providing data retrieval and management for contact messages.
 * It centralizes all API calls to Supabase, and exposes methods for components
 * to fetch, cache, and display media items in a consistent way.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly supabase = inject(SupabaseService);

  async getAllContactsMessages(): Promise<Contact[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }

    const { data, error } = await this.supabase.client.from('contact_requests').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }

    return data ?? [];
  }

  async loadContactsMessagesCount(): Promise<number> {
    if (!this.supabase.isAvailable) {
      return 0;
    }
    const { count, error } = await this.supabase.client.from('contact_requests').select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching contact messages count:', error);
      throw error;
    }

    return count ?? 0;
  }

  async loadPendingContactsMessagesCount(): Promise<number> {
    if (!this.supabase.isAvailable) {
      return 0;
    }

    const { count, error } = await this.supabase.client.from('contact_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');

    if (error) {
      console.error('Error fetching pending contact messages count:', error);
      throw error;
    }

    return count ?? 0;
  }

  async updateContactMessage(id: string, updates: Partial<Contact>) {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('contact_requests').update(updates).eq('id', id).select().single();

    if (error) {
      console.error('Error updating contact:', error);
      throw error;
    }

    return data;
  }

  async deleteContactMessage(id: string): Promise<void> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { error } = await this.supabase.client.from('contact_requests').delete().eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}
