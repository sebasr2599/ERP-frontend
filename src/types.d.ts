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
  cellProps?: Record<string>;
};

interface Product {
  id?: number;
  name: string;
  description: string;
  image?: string;
  priceUnit?: number;
  priceWholesale?: number;
  unitId?: number;
  categoryId?: number;
  category?: Category;
  unit?: Unit;
  equivalencies?: EquivalentUnit[];
}
interface EquivalentUnit {
  id?: number;
  equivalent: number;
  productId?: number;
  unitId: number;
}
interface Unit {
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}
interface loginResponse {
  access_token: string;
  first_name: string;
  last_name: string;
  rol: string;
}
interface Inventory {
  id?: number;
  quantity: number;
  date?: Date;
  location: string;
  productId: number;
  userId?: number;
}
