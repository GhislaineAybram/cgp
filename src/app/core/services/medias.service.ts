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
import { Video } from '../../models/video';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  private readonly supabase = inject(SupabaseService);

  async getAllVideos(): Promise<Video[]> {
    let result: Video[] = [];
    const { data, error } = await this.supabase.getAllVideos();
    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  async loadMediasCount() {
    let result = 0;
    const { data, error } = await this.supabase.getVideosCount();
    if (error) {
      console.error('Error fetching medias count:', error);
    } else {
      result = data ?? 0;
    }
    return result;
  }

  async getFirstVideos(limit: number): Promise<Video[]> {
    let result: Video[] = [];
    const { data, error } = await this.supabase.getVideosByLimit(limit);
    if (error) {
      console.error('Error fetching first videos:', error);
    } else {
      result = data ?? [];
    }
    return result;
  }

  getMediaThumbnail(link: string): string {
    let result = 'assets/default-video-thumbnail.png';

    // YouTube (youtu.be or youtube.com)
    const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com.*[?&]v=)([^&]+)/);
    if (youtubeMatch) {
      result = `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    // Vimeo
    const vimeoMatch = link.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      result = `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
    }

    // Dailymotion classique
    const dailymotionMatch = link.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
    if (dailymotionMatch) {
      result = `https://www.dailymotion.com/thumbnail/video/${dailymotionMatch[1]}`;
    }

    // Dailymotion embedded (geo.dailymotion.com/player.html?video=ID)
    const dailymotionEmbedMatch = link.match(/geo\.dailymotion\.com\/player\.html\?video=([a-zA-Z0-9]+)/);
    if (dailymotionEmbedMatch) {
      result = `https://www.dailymotion.com/thumbnail/video/${dailymotionEmbedMatch[1]}`;
    }

    // BFMTV (pas de miniature officielle, on utilise un placeholder)
    return result;
  }
}
