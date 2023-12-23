import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';

export interface ModuleInterface {
  title: string;
  route: string;
  icon: React.ReactNode;
}
const iconStyle: React.CSSProperties = {
  fontSize: '3em',
};

export const DashboardModules: ModuleInterface[] = [
  {
    title: 'Usuarios',
    route: '/users',
    icon: <GroupOutlinedIcon className="text-primary" style={iconStyle} />,
  },
  {
    title: 'Inventario',
    route: '/inventory',
    icon: <Inventory2OutlinedIcon className="text-primary" style={iconStyle} />,
  },
  {
    title: 'Orden',
    route: '/order',
    icon: <NoteAltOutlinedIcon className="text-primary" style={iconStyle} />,
  },
  {
    title: 'Reportes',
    route: '/sales',
    icon: <ShowChartOutlinedIcon className="text-primary" style={iconStyle} />,
  },
  {
    title: 'Ventas',
    route: '/sales',
    icon: <PriceCheckOutlinedIcon className="text-primary" style={iconStyle} />,
  },
];
