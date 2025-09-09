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
    { key: 'date' as keyof Video, label: 'Date' },
    { key: 'title' as keyof Video, label: 'Titre' },
    { key: 'text' as keyof Video, label: 'Texte' },
    { key: 'channel' as keyof Video, label: 'Chaîne' },
    { key: 'link' as keyof Video, label: 'Lien' },
  ];

  protected mediasService = inject(MediasService);

  async ngOnInit() {
    this.videosDatas = await this.mediasService.getAllVideos();

    this.videosCount = await this.mediasService.loadMediasCount();
  }
}
