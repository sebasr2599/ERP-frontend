import { Circle } from '@mui/icons-material';
import { FC } from 'react';
export interface StatusComponentProps {
  status: OrderStatus;
}
const StatusComponent: FC<StatusComponentProps> = ({ status }) => {
  // TODO: Move to individual component
  const iconStyle: React.CSSProperties = {
    fontSize: '1em',
  };
  switch (status) {
    case 'NOT STARTED':
      return (
        <div className="flex flex-row justify-center items-center px-1 gap-2 rounded-full bg-yellow-500 border border-yellow-700">
          <Circle className="text-yellow-700" style={iconStyle} />
          <span className="text-md text-gray-700">No Empezado</span>
        </div>
      );
    case 'STARTED':
      return (
        <div className="flex flex-row justify-center items-center px-1 gap-2 rounded-full bg-lime-500 border border-lime-700">
          <Circle className="text-lime-700" style={iconStyle} />
          <span className="text-md text-gray-700">Empezado</span>
        </div>
      );
    case 'PENDING':
      return (
        <div className="flex flex-row justify-center items-center px-1 gap-2 rounded-full bg-fuchsia-500 border border-fuchsia-700">
          <Circle className="text-fuchsia-700" style={iconStyle} />
          <span className="text-md text-gray-700">En proceso</span>
        </div>
      );
    case 'RELEASED':
      return (
        <div className="flex flex-row justify-center items-center px-1 gap-2 rounded-full bg-indigo-500 border border-indigo-700">
          <Circle className="text-indigo-700" style={iconStyle} />
          <span className="text-md text-gray-700">Completado</span>
        </div>
      );
    case 'BLOCKED':
      return (
        <div className="flex flex-row justify-center items-center px-1 gap-2 rounded-full bg-red-500 border border-red-700">
          <Circle className="text-red-700" style={iconStyle} />
          <span className="text-md text-gray-700">Bloqueado</span>
        </div>
      );

    default:
      return null;
  }
};

export default StatusComponent;
