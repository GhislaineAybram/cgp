/**
 * @fileoverview Medias Component - Partner presentation videos
 * @description Component managing the display of the last three video content featuring
 * trusted partners and their expertise in wealth management services
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { MediasService } from '../../../core/services/medias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MediasListComponent } from '../../../shared/components/medias-list/medias-list.component';

@Component({
  selector: 'app-medias-preview',
  imports: [CommonModule, RouterModule, MediasListComponent],
  templateUrl: './medias-preview.component.html',
  styleUrls: ['./medias-preview.component.scss'],
})
export class MediasPreviewComponent implements OnInit {
  medias: Video[] = [];
  isLoading = true;

  protected mediasService = inject(MediasService);

  async ngOnInit() {
    this.medias = await this.mediasService.getFirstVideos(3);
    this.isLoading = false;
  }
}
