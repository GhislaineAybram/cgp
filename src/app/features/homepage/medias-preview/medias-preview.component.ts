import { Component, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { MediasService } from '../../../core/services/medias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medias-preview',
  imports: [CommonModule, RouterModule],
  templateUrl: './medias-preview.component.html',
  styleUrl: './medias-preview.component.scss'
})
export class MediasPreviewComponent implements OnInit {
  medias: Video[] = [];
  isLoading = true;

  constructor(
    public mediasService: MediasService,
  ) {}

  ngOnInit(): void {
    this.loadAllVideos();
  }

  async loadAllVideos(): Promise<void> {
    try {
      this.isLoading = true;
      this.medias = await this.mediasService.getFirstVideos(3);
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
