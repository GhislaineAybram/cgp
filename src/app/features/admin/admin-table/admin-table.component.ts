import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface TableColumn<T extends object> {
  key: keyof T;
  label: string;
  type?: 'text' | 'date' | 'hour' | 'number' | 'image';
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
}
