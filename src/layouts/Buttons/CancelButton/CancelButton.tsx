import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

export interface CancelButtonProps {
  text: string;
}
const CancelButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & CancelButtonProps) => {
  return (
    <Button variant="contained" style={{ backgroundColor: '#F6F6FB', color: 'black' }} {...props}>
      {props.text}
    </Button>
  );
};

export default CancelButton;
