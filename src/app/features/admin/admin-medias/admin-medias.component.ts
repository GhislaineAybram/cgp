import { Component, inject, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { MediasService } from '../../../core/services/medias.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { ModalSuccessComponent } from '../../../shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';

@Component({
  selector: 'app-admin-medias',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent, ModalSuccessComponent, ModalErrorComponent],
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
  showSuccessModal = false;
  showErrorModal = false;

  protected mediasService = inject(MediasService);

  async ngOnInit() {
    await this.loadVideos();
  }

  async loadVideos() {
    this.videosTable.rows = await this.mediasService.getAllVideos();
    this.videosCount = await this.mediasService.loadMediasCount();
  }

  onEdit(video: Video) {
    this.selectedVideo = { ...video };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async onSave(updatedVideo: Video) {
    if (!updatedVideo.id) {
      console.error('Impossible de sauvegarder : ID manquant');
      return;
    }

    const { error } = await this.mediasService.updateVideo(updatedVideo.id, updatedVideo);

    if (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.showErrorModal = true;
    } else {
      this.showSuccessModal = true;
      await this.loadVideos();
    }
  }
}
