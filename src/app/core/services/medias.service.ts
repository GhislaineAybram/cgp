import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { Video } from '../../models/video';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  constructor(private supabase: SupabaseService) {}

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
    const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    // Vimeo
    const vimeoMatch = link.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      const vimeoId = vimeoMatch[1];
      return `https://vumbnail.com/${vimeoId}.jpg`;
    }

    // Dailymotion
    const dailymotionMatch = link.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
    if (dailymotionMatch) {
      return `https://www.dailymotion.com/thumbnail/video/${dailymotionMatch[1]}`;
    }

    // Fallback
    return '/assets/default-video-thumbnail.jpg';
  }

  expandedMediaIds = new Set<string>();

  shouldShowToggle(text: string | null | undefined): boolean {
    return !!text && text.length > 250;
  }

  toggleText(mediaId: string): void {
    if (this.expandedMediaIds.has(mediaId)) {
      this.expandedMediaIds.delete(mediaId);
    } else {
      this.expandedMediaIds.add(mediaId);
    }
  }

  isTextExpanded(mediaId: string): boolean {
    return this.expandedMediaIds.has(mediaId);
  }
}

