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
  providedIn: 'root'
})
export class MediasService {

  private readonly supabase = inject(SupabaseService);

  async getAllVideos(): Promise<Video[]> {
    const { data, error } = await this.supabase.getAllVideos();
    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
    return data as Video[];
  }

  async getFirstVideos(limit: number): Promise<Video[]> {
    const { data, error } = await this.supabase.getVideosByLimit(limit);
    if (error) {
      console.error('Error fetching first videos:', error);
      return [];
    }
    return data as Video[];
  }

  getMediaThumbnail(link: string): string {
    if (!link) return '';

    // YouTube (youtu.be or youtube.com)
    const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com.*[?&]v=)([^&]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    // Vimeo
    const vimeoMatch = link.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
    }

    // Dailymotion classique
    const dailymotionMatch = link.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
    if (dailymotionMatch) {
      return `https://www.dailymotion.com/thumbnail/video/${dailymotionMatch[1]}`;
    }

    // Dailymotion embedded (geo.dailymotion.com/player.html?video=ID)
    const dailymotionEmbedMatch = link.match(/geo\.dailymotion\.com\/player\.html\?video=([a-zA-Z0-9]+)/);
    if (dailymotionEmbedMatch) {
      return `https://www.dailymotion.com/thumbnail/video/${dailymotionEmbedMatch[1]}`;
    }

    // BFMTV (pas de miniature officielle, on utilise un placeholder)
    // Fallback
    return 'assets/default-video-thumbnail.png';
  }

}

