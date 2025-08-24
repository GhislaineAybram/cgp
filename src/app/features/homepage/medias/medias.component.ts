/**
 * @fileoverview Medias Component - Partner presentation videos
 * @description Component managing the display of video content featuring
 * trusted partners and their expertise in wealth management services
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../supabase.service';

@Component({
  selector: 'app-medias',
  imports: [CommonModule],
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.scss'
})

export class MediasComponent implements OnInit {

  medias: Video[] = [];
  isLoading = true;

  constructor(private supabase: SupabaseService) {}
  
  ngOnInit(): void {
    this.loadAllVideos();
  }

  async loadAllVideos(): Promise<void> {
    try {
      this.isLoading = true;
      const { data, error } = await this.supabase.getAllVideos();
      if (error) {
        console.error('Error loading videos:', error);
        this.medias = [];
      } else {
        this.medias = data as Video[];
      }
    } catch (error) {
      console.error('Unexpected error loading videos:', error);
      this.medias = [];
    } finally {
      this.isLoading = false;
    }
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
    this.expandedMediaIds.add(mediaId);
  }

}
