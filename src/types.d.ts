interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  rol: string;
  password?: string;
}
interface UserTable {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  rol: string;
}
type Column<T extends TableNode> = {
  label: string;
  renderCell: (node: T) => React.ReactNode;
  footer?: string;
  resize?: ColumnResizeProps;
  sort?: ColumnSortProps;
  select?: ColumnSelectProps;
  tree?: ColumnTreeProps<T>;
  pinLeft?: boolean;
  pinRight?: boolean;
  hide?: boolean;
  cellProps?: Record<string, any>;
};
