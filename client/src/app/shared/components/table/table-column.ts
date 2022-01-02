export interface TableColumn {
  name: string;
  dataKey: string;
  position?: 'right' | 'left';
  isSortTable?: boolean;
  isShowTable?: boolean;
  style?: 'none' | 'download' | 'expired' | 'date' | 'image';
}
