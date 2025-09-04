/**
 * @fileoverview Common Medias Component - Shared presentation logic
 * @description This component centralizes the display logic and reusable UI
 * elements for medias-related content, used by both the MediasComponent and
 * MediasPreviewComponent to ensure consistency in layout, formatting, and behavior.
 *
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, inject, Input } from '@angular/core';
import { Video } from '../../../models/video';
import { MediasService } from '../../../core/services/medias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medias-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medias-list.component.html',
  styleUrls: ['./medias-list.component.scss'],
})
export class MediasListComponent {
  @Input() medias: Video[] = [];
  @Input() isLoading = true;
  @Input() buttonText = `Retour vers la page d'accueil`;
  @Input() buttonLink = '/';

  protected mediasService = inject(MediasService);
}
