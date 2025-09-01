import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { MediasService } from '../../../core/services/medias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MediasListComponent } from '../../../shared/components/medias-list/medias-list.component';

@Component({
  selector: 'app-medias-preview',
  imports: [CommonModule, RouterModule, MediasListComponent],
  templateUrl: './medias-preview.component.html',
  styleUrl: './medias-preview.component.scss'
})
export class MediasPreviewComponent implements OnInit {
  medias: Video[] = [];
  isLoading: boolean = true;

  constructor(public mediasService: MediasService) {}

  async ngOnInit() {
    this.medias = await this.mediasService.getFirstVideos(3);
    this.isLoading = false;
  }

}
