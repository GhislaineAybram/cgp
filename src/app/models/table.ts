export interface TableColumn<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'date' | 'hour' | 'number' | 'image';
  weight?: number;
}

export interface Table<T> {
  columns: TableColumn<T>[];
  rows: T[];
}
