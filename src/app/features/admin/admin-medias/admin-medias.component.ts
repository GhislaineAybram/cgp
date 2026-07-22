import { Component, inject, OnInit } from '@angular/core';
import { Video, VideoNew } from '../../../models/video';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { MediasService } from '../../../core/services/medias.service';
import { Table } from '../../../models/table';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { ModalSuccessComponent } from '../../../shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';
import { ModalConfirmationComponent } from '../../../shared/components/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-admin-medias',
  standalone: true,
  imports: [AdminPannelComponent, AdminTableComponent, AdminEditionComponent, ModalSuccessComponent, ModalErrorComponent, ModalConfirmationComponent],
  templateUrl: './admin-medias.component.html',
  styleUrls: [],
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
  showConfirmationModal = false;
  videoToDelete: Video | null = null;
  modalMode: 'edit' | 'create' = 'edit';

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
    this.modalMode = 'edit';
    this.isModalOpen = true;
  }

  onCreation() {
    this.selectedVideo = null;
    this.modalMode = 'create';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async onUpdate(updatedVideo: Video) {
    if (!updatedVideo.id) {
      console.error('Impossible de sauvegarder : ID manquant');
      this.showErrorModal = true;
      return;
    }

    try {
      await this.mediasService.updateVideo(updatedVideo.id, updatedVideo);
      this.showSuccessModal = true;
      await this.loadVideos();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.showErrorModal = true;
    } finally {
      this.closeModal();
    }
  }

  async onCreate(newVideo: Partial<Video>) {
    try {
      await this.mediasService.createVideo(newVideo as VideoNew);
      this.showSuccessModal = true;
      await this.loadVideos();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      this.showErrorModal = true;
    } finally {
      this.closeModal();
    }
  }

  onDelete(video: Video) {
    this.videoToDelete = video;
    this.showConfirmationModal = true;
  }

  async confirmDelete() {
    if (!this.videoToDelete) return;

    try {
      await this.mediasService.deleteVideo(this.videoToDelete.id);
      this.showSuccessModal = true;
      await this.loadVideos();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      this.showErrorModal = true;
    } finally {
      this.videoToDelete = null;
    }
  }
}
