import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface TableColumn<T extends object> {
  key: keyof T;
  label: string;
  type?: 'text' | 'date' | 'hour' | 'number' | 'image';
  weight?: number;
}

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
  @Input() databaseColumns: TableColumn<T>[] = [];
  @Input() databaseDatas: T[] = [];

  get gridTemplateColumns(): string {
    return [...this.databaseColumns.map(col => `${col.weight ?? 1}fr`), '1fr'].join(' ');
  }

  formatValue(value: unknown, type: string): string {
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
      default:
        result = String(value);
        break;
    }
    return result;
  }
}
