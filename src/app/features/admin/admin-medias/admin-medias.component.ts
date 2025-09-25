import { Component, inject, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { MediasService } from '../../../core/services/medias.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';

@Component({
  selector: 'app-admin-medias',
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent],
  templateUrl: './admin-medias.component.html',
  styleUrls: ['./admin-medias.component.scss'],
})
export class AdminMediasComponent implements OnInit {
  videosCount = 0;
  videosTable: Table<Video> = {
    columns: [
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'title', label: 'Titre', type: 'text', weight: 2 },
      { key: 'text', label: 'Texte', type: 'text', weight: 3 },
      { key: 'channel', label: 'Chaîne', type: 'text' },
      { key: 'link', label: 'Lien', type: 'text' },
    ],
    rows: [],
  };

  isModalOpen = false;
  selectedVideo: Video | null = null;

  protected mediasService = inject(MediasService);

  async ngOnInit() {
    this.videosTable.rows = await this.mediasService.getAllVideos();

    this.videosCount = await this.mediasService.loadMediasCount();
  }

  onEdit(item: Video) {
    this.selectedVideo = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
