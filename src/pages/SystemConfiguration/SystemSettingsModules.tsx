import { Category, Groups3, Scale } from '@mui/icons-material';

const iconStyle: React.CSSProperties = {
  fontSize: '3em',
};

const SystemSettingsModules: ModuleInterface[] = [
  {
    title: 'Categorias',
    route: '/categories',
    icon: <Category className="text-gray-600" style={iconStyle} />,
  },
  {
    title: 'Clientes',
    route: '/clients',
    icon: <Groups3 className="text-gray-600" style={iconStyle} />,
  },

  {
    title: 'Unidades',
    route: '/units',
    icon: <Scale className="text-gray-600" style={iconStyle} />,
  },
];

export default SystemSettingsModules;
