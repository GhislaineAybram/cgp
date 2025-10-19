import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableColumn } from '../../../models/table';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent<T extends object> {
  @Input() databaseTableName = 'Table name';
  @Input() databaseItemsCount = 0;
  @Input() databaseTable: Table<T> = { columns: [], rows: [] };

  @Output() editClicked = new EventEmitter<T>();

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
      case 'created_at': {
        const date = new Date(value as string | number | Date);
        result = isNaN(date.getTime()) ? String(value) : date.toLocaleDateString('fr-FR');
        break;
      }
      default:
        result = String(value);
        break;
    }
    return result;
  }

  edit(row: T) {
    this.editClicked.emit(row);
  }
}
