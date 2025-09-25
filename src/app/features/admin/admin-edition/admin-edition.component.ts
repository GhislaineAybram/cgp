import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from '../../../models/table';

@Component({
  selector: 'app-admin-edition',
  imports: [],
  templateUrl: './admin-edition.component.html',
  styleUrl: './admin-edition.component.scss',
})
export class AdminEditionComponent<T extends object> {
  @Input() isVisible = false;
  @Input() selectedItem: T | null = null;
  @Input() editionTitle = `Editer l'objet`;
  @Input() databaseTable: Table<T> = { columns: [], rows: [] };

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  closeOnBackdrop(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  getValue(key: string | number | symbol): string {
    if (!this.selectedItem) {
      return '';
    }
    const stringKey = String(key);
    const value = (this.selectedItem as Record<string, unknown>)[stringKey];
    if (value === null || value === undefined) {
      return '';
    }
    if (value instanceof Date) {
      return value.toLocaleDateString('fr-FR');
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  saveChanges() {
    console.log('Sauvegarder les modifications');
    this.close();
  }
}
