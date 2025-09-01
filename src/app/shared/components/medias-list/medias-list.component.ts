import { Component, Input } from '@angular/core';
import { Video } from '../../../models/video';
import { MediasService } from '../../../core/services/medias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medias-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medias-list.component.html',
  styleUrls: ['./medias-list.component.scss']
})
export class MediasListComponent {
  @Input() medias: Video[] = [];
  @Input() isLoading: boolean = true;
  @Input() buttonText: string = `Retour vers la page d'accueil`;
  @Input() buttonLink: string = '/';

  constructor(public mediasService: MediasService) {}

}
