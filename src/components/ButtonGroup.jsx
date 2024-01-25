import Button from './Button';
import { secondaryBtns } from '../lib/constants';

function ButtonGroup() {
  return (
    <section className='button-group'>
      {secondaryBtns.map(text => (
        <Button key={text} variant='secondary'>
          {text}
        </Button>
      ))}
    </section>
  );
}
export default ButtonGroup;
