import { useRef, useState } from 'react';
import Button from './Button';
// import useItemsContext from '../hooks/useItemsContext';
import useItemStore from '../stores/itemsStore';

function AddItemForm() {
  const [value, setValue] = useState('');
  const inputRef = useRef();
  // const { handleAddItem } = useItemsContext();
  const handleAddItem = useItemStore(state => state.addItem);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      alert("Item can't be empty");
      inputRef.current.focus();
      return;
    }
    handleAddItem(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        name='new-item'
        onChange={e => setValue(e.target.value)}
        value={value}
        ref={inputRef}
        autoFocus
      />
      <Button>Add to List</Button>
    </form>
  );
}
export default AddItemForm;
