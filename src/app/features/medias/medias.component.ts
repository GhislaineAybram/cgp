/**
 * @fileoverview Medias Component - Partner presentation videos
 * @description Component managing the display of video content featuring
 * trusted partners and their expertise in wealth management services
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasService } from '../../core/services/medias.service';
import { Video } from '../../models/video';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medias',
  imports: [CommonModule, RouterModule],
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.scss'
})

export class MediasComponent implements OnInit {

  medias: Video[] = [];
  isLoading = true;

  constructor(public mediasService: MediasService) {}
  
  ngOnInit(): void {
    this.loadAllVideos();
  }

  async loadAllVideos(): Promise<void> {
    try {
      this.isLoading = true;
      this.medias = await this.mediasService.getAllVideos();
    } catch (error) {
      console.error('Unexpected error loading videos:', error);
      this.medias = [];
    } finally {
      this.isLoading = false;
    }
  }

  getMediaThumbnail(link: string): string {
    return this.mediasService.getMediaThumbnail(link);
  }

  shouldShowToggle(text: string | null | undefined): boolean {
    return this.mediasService.shouldShowToggle(text);
  }

  toggleText(mediaId: string): void {
    this.mediasService.toggleText(mediaId);
  }

  isTextExpanded(mediaId: string): boolean {
    return this.mediasService.isTextExpanded(mediaId);
  }

}
