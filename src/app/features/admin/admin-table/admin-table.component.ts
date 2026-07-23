import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableColumn } from '../../../models/table';
import { MessageStatus } from '../../../models/contact';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-table.component.html',
  styleUrls: [],
})
export class AdminTableComponent<T extends object> {
  @Input() databaseTableName = 'Table name';
  @Input() databaseItemsCount = 0;
  @Input() databaseTable: Table<T> = { columns: [], rows: [] };
  @Input() showCreateButton = true;
  @Input() showEditButton = true;

  @Output() editClicked = new EventEmitter<T>();
  @Output() createClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<T>();
  @Output() statusChanged = new EventEmitter<{ row: T; status: MessageStatus }>();

  get gridTemplateColumns(): string {
    return [...this.databaseTable.columns.map((col: TableColumn<T>) => `${col.weight ?? 1}fr`), '1fr'].join(' ');
  }

  formatValue(value: T[keyof T], type: string): string {
    if (value === null || value === undefined) return '';

    let result: string;

    switch (type) {
      case 'hour':
        result = String(value).slice(0, 5);
        break;

      case 'date': {
        const date = new Date(value as string | number | Date);
        result = isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('fr-FR');
        break;
      }

      case 'status':
        result = this.statusConfig[value as MessageStatus]?.label ?? String(value);
        break;

      default:
        result = String(value);
        break;
    }
    return result;
  }

  statusClass(value: T[keyof T]): string {
    return this.statusConfig[value as MessageStatus]?.class ?? '';
  }

  statusConfig: Record<MessageStatus, { label: string; class: string }> = {
    pending: { label: 'À traiter', class: 'bg-color-warning-800 color-warning-100' },
    treated: { label: 'Répondu', class: 'bg-color-success-800 color-success-100' },
    archived: { label: 'Archivé', class: 'bg-grey-800 color-grey-100' },
  };

  onStatusChange(row: T, newStatus: MessageStatus) {
    this.statusChanged.emit({ row, status: newStatus });
  }

  edit(row: T) {
    this.editClicked.emit(row);
  }

  create() {
    this.createClicked.emit();
  }

  delete(row: T) {
    this.deleteClicked.emit(row);
  }
}
