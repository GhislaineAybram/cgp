import { Component, inject, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent, TableColumn } from '../admin-table/admin-table.component';
import { MediasService } from '../../../core/services/medias.service';

@Component({
  selector: 'app-admin-medias',
  imports: [AdminPannelComponent, AdminTableComponent],
  templateUrl: './admin-medias.component.html',
  styleUrls: ['./admin-medias.component.scss'],
})
export class AdminMediasComponent implements OnInit {
  videosCount = 0;
  videosDatas: Video[] = [];
  videosColumns: TableColumn<Video>[] = [
    { key: 'date' as keyof Video, label: 'Date', type: 'date' },
    { key: 'title' as keyof Video, label: 'Titre', type: 'text', weight: 2 },
    { key: 'text' as keyof Video, label: 'Texte', type: 'text', weight: 3 },
    { key: 'channel' as keyof Video, label: 'Chaîne', type: 'text' },
    { key: 'link' as keyof Video, label: 'Lien', type: 'text' },
  ];

  protected mediasService = inject(MediasService);

  async ngOnInit() {
    this.videosDatas = await this.mediasService.getAllVideos();

    this.videosCount = await this.mediasService.loadMediasCount();
  }
}
