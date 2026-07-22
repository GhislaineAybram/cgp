/**
 * @fileoverview Medias Service - Media content management
 * @description Service providing data retrieval and management for media content
 * such as videos and podcasts.
 * It centralizes all API calls to Supabase, and exposes methods for components
 * to fetch, cache, and display media items in a consistent way.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Video, VideoNew } from '../../models/video';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  private readonly supabase = inject(SupabaseService);

  async getAllVideos(): Promise<Video[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }
    const { data, error } = await this.supabase.client.from('video').select('*').order('date', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }

    return data ?? [];
  }

  async loadMediasCount(): Promise<number> {
    if (!this.supabase.isAvailable) {
      return 0;
    }
    const { count, error } = await this.supabase.client.from('video').select('*', {
      count: 'exact',
      head: true,
    });

    if (error) {
      console.error('Error fetching videos count:', error);
      throw error;
    }

    return count ?? 0;
  }

  async getFirstVideos(limit: number): Promise<Video[]> {
    if (!this.supabase.isAvailable) {
      return [];
    }
    const { data, error } = await this.supabase.client.from('video').select('*').order('date', { ascending: false }).limit(limit);

    if (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }

    return data ?? [];
  }

  getMediaThumbnail(link: string): string {
    const defaultThumbnail = 'assets/default-video-thumbnail.png';

    const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com.*[?&]v=)([^&]+)/);

    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }

    const vimeoMatch = link.match(/vimeo\.com\/(\d+)/);

    if (vimeoMatch) {
      return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
    }

    const dailymotionMatch = link.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);

    if (dailymotionMatch) {
      return `https://www.dailymotion.com/thumbnail/video/${dailymotionMatch[1]}`;
    }

    const dailymotionEmbedMatch = link.match(/geo\.dailymotion\.com\/player\.html\?video=([a-zA-Z0-9]+)/);

    if (dailymotionEmbedMatch) {
      return `https://www.dailymotion.com/thumbnail/video/${dailymotionEmbedMatch[1]}`;
    }

    return defaultThumbnail;
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<{ data: Video | null; error: Error | null }> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('video').update(updates).eq('id', id).select().single();

    if (error) {
      console.error('Error updating video:', error);
      throw error;
    }

    return data;
  }

  async createVideo(newVideo: VideoNew): Promise<{ data: Video | null; error: Error | null }> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { data, error } = await this.supabase.client.from('video').insert(newVideo).select().single();

    if (error) {
      console.error('Error creating video:', error);
      throw error;
    }

    return data;
  }

  async deleteVideo(id: string): Promise<void> {
    if (!this.supabase.isAvailable) {
      throw new Error('Supabase client unavailable');
    }
    const { error } = await this.supabase.client.from('video').delete().eq('id', id);

    if (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }
}
