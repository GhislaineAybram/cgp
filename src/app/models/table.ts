export interface TableColumn<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'date' | 'hour' | 'number' | 'image' | 'status';
  weight?: number;
}

export interface Table<T> {
  columns: TableColumn<T>[];
  rows: T[];
}
