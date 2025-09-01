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
import { MediasListComponent } from '../../shared/components/medias-list/medias-list.component';

@Component({
  selector: 'app-medias',
  imports: [CommonModule, RouterModule, MediasListComponent],
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.scss'
})

export class MediasComponent implements OnInit {

  medias: Video[] = [];
  isLoading = true;

  constructor(public mediasService: MediasService) {}

  async ngOnInit() {
    this.medias = await this.mediasService.getAllVideos();
    this.isLoading = false;
  }

}
