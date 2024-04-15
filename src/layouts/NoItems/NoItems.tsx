import { FC } from 'react';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
interface NoItemsProps {
  text: string;
}
const iconStyle: React.CSSProperties = {
  fontSize: '3em',
};
const NoItems: FC<NoItemsProps> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 ">
      <BrokenImageIcon style={iconStyle} className="text-gray-400" />
      <span className="text-4xl text-gray-400">{text}</span>
    </div>
  );
};

export default NoItems;
