import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

export interface AcceptButtonProps {
  text: string;
}
const AcceptButton = <C extends React.ElementType>(props: ButtonProps<C, { component?: C }> & AcceptButtonProps) => {
  return (
    <Button variant="contained" style={{ backgroundColor: '#900A20', color: 'white' }} {...props}>
      {props.text}
    </Button>
  );
};

export default AcceptButton;
