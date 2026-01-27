import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Table } from '../../../models/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-edition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-edition.component.html',
  styleUrl: './admin-edition.component.scss',
})
export class AdminEditionComponent<T extends object> implements OnChanges {
  @Input() isVisible = false;
  @Input() selectedItem: T | null = null;
  @Input() editionTitle = `Éditer l'objet`;
  @Input() creationTitle = `Créer un nouvel objet`;
  @Input() databaseTable: Table<T> = { columns: [], rows: [] };
  @Input() mode: 'edit' | 'create' = 'edit';

  @Output() closeModal = new EventEmitter<void>();
  @Output() updateItem = new EventEmitter<T>();
  @Output() createItem = new EventEmitter<Partial<T>>();

  workingCopy: T | Partial<T> | null = null;
  invalidValues: Partial<Record<keyof T, boolean>> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItem'] || changes['mode']) {
      if (this.mode === 'edit' && this.selectedItem) {
        this.workingCopy = this.deepCopy(this.selectedItem);
      } else if (this.mode === 'create') {
        this.workingCopy = this.createEmptyItem();
      }
    }
  }

  deepCopy(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  createEmptyItem(): Partial<T> {
    const emptyItem: Partial<T> = {};
    this.databaseTable.columns.forEach(col => {
      if (String(col.key) === 'id') return;
      
      const key = col.key as keyof T;
      if (col.type === 'number') {
        (emptyItem as Record<keyof T, T[keyof T]>)[key] = 0 as T[keyof T];
      } else if (col.type === 'date') {
        (emptyItem as Record<keyof T, T[keyof T]>)[key] = '' as T[keyof T];
      } else if (col.type === 'hour') {
        (emptyItem as Record<keyof T, T[keyof T]>)[key] = '' as T[keyof T];
      } else {
        (emptyItem as Record<keyof T, T[keyof T]>)[key] = '' as T[keyof T];
      }
    });
    return emptyItem;
  }

  get modalTitle(): string {
    return this.mode === 'create' ? this.creationTitle : this.editionTitle;
  }

  close() {
    this.workingCopy = null;
    this.invalidValues = {};
    this.closeModal.emit();
  }

  closeOnBackdrop(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  getValue(key: string | number | symbol): string {
    if (!this.workingCopy) {
      return '';
    }
    const stringKey = String(key);
    const value = (this.workingCopy as Record<string, T[keyof T]>)[stringKey];
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
    if (Object.values(this.invalidValues).some(v => v)) {
      console.error('Des valeurs sont invalides');
      return;
    }

    if (!this.workingCopy) {
      return;
    }

    const updatedItem = { ...this.workingCopy };

    this.databaseTable.columns.forEach(col => {
      const input = document.getElementById(String(col.key)) as HTMLInputElement | HTMLTextAreaElement;
      if (input) {
        const key = col.key as keyof T;
        let value: string | number | Date = input.value;

        if (col.type === 'number') {
          value = parseFloat(input.value);
        } else if (col.type === 'date' && input.value) {
          value = input.value;
        }

        (updatedItem as Record<keyof T, T[keyof T]>)[key] = value as T[keyof T];
      }
    });

    if (this.mode === 'create') {
      this.createItem.emit(updatedItem as Partial<T>);
    } else {
      this.updateItem.emit(updatedItem as T);
    }
    
    this.workingCopy = null;
    this.invalidValues = {};
    this.close();
  }

  markInvalid(colKey: keyof T, value: number) {
    this.invalidValues[colKey] = value < 0 || value > 5 || isNaN(value);
  }

  get hasInvalidValues(): boolean {
    return Object.values(this.invalidValues).some(v => v);
  }
}
