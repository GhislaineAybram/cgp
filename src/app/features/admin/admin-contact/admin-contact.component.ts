import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AdminPannelComponent } from '../admin-pannel/admin-pannel.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { AdminEditionComponent } from '../admin-edition/admin-edition.component';
import { ModalSuccessComponent } from '../../../shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';
import { ModalConfirmationComponent } from '../../../shared/components/modal-confirmation/modal-confirmation.component';
import { Contact, MessageStatus } from '../../../models/contact';
import { Table } from '../../../models/table';
import { ContactsService } from '../../../core/services/contacts.service';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [
    CommonModule,
    AdminPannelComponent,
    AdminTableComponent,
    AdminEditionComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalConfirmationComponent,
  ],
  templateUrl: './admin-contact.component.html',
  styleUrls: [],
})
export class AdminContactComponent implements OnInit {
  contactMessagesCount = 0;
  contactMessagesDatas: Contact[] = [];
  contactMessagesTable: Table<Contact> = {
    columns: [
      { key: 'created_at' as keyof Contact, label: 'Date', type: 'date' },
      { key: 'first_name' as keyof Contact, label: 'Prénom', type: 'text' },
      { key: 'last_name' as keyof Contact, label: 'Nom', type: 'text' },
      { key: 'email' as keyof Contact, label: 'Email', type: 'text' },
      { key: 'phone' as keyof Contact, label: 'Téléphone', type: 'text' },
      { key: 'availability' as keyof Contact, label: 'Disponibilité', type: 'text', weight: 2 },
      { key: 'message' as keyof Contact, label: 'Message', type: 'text', weight: 3 },
      { key: 'status' as keyof Contact, label: 'Statut', type: 'status' },
    ],
    rows: [],
  };

  isModalOpen = false;
  selectedContactMessage: Contact | null = null;
  showSuccessModal = false;
  showErrorModal = false;
  showConfirmationModal = false;
  contactMessageToDelete: Contact | null = null;
  modalMode: 'edit' | 'create' = 'edit';

  protected contactsService = inject(ContactsService);

  async ngOnInit() {
    await this.loadContactsMessages();
  }

  async loadContactsMessages() {
    this.contactMessagesTable.rows = await this.contactsService.getAllContactsMessages();
    this.contactMessagesCount = await this.contactsService.loadContactsMessagesCount();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async onStatusChanged(event: { row: Contact; status: MessageStatus }) {
    const previousStatus = event.row.status;

    event.row.status = event.status;

    try {
      await this.contactsService.updateContactMessage(event.row.id, { status: event.status });
      this.showSuccessModal = true;
    } catch (error) {
      event.row.status = previousStatus;
      console.error('Échec de la mise à jour du statut', error);
      this.showErrorModal = true;
    }
  }

  onDelete(contact: Contact) {
    this.contactMessageToDelete = contact;
    this.showConfirmationModal = true;
  }

  async confirmDelete() {
    if (!this.contactMessageToDelete) return;

    try {
      await this.contactsService.deleteContactMessage(this.contactMessageToDelete.id);
      this.showSuccessModal = true;
      await this.loadContactsMessages();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      this.showErrorModal = true;
    } finally {
      this.contactMessageToDelete = null;
    }
  }
}
