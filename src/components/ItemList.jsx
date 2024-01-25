import { useMemo, useState } from 'react';
import EmptyView from './EmptyView';
import Select from 'react-select';
import { sortingOptions } from '../lib/constants';
import useItemStore from '../stores/itemsStore';
// import useItemsContext from '../hooks/useItemsContext';

function ItemList() {
  // const { items, handleToggleItem, handleRemoveItem } = useItemsContext();
  const items = useItemStore(state => state.items);
  const handleToggleItem = useItemStore(state => state.toggleItem);
  const handleRemoveItem = useItemStore(state => state.removeItem);
  const [sortBy, setSortBy] = useState('default');

  const sortFunctions = useMemo(
    () => ({
      default: (a, b) => a.id - b.id,
      name: (a, b) => a.name.localeCompare(b.name),
      packed: (a, b) => b.packed - a.packed,
      unpacked: (a, b) => a.packed - b.packed,
    }),
    []
  );

  const sortedItems = useMemo(
    () => [...items].sort(sortFunctions[sortBy]),
    [items, sortBy, sortFunctions]
  );

  return (
    <ul className='item-list'>
      {items.length === 0 && <EmptyView />}
      {items.length > 0 && (
        <section className='sorting'>
          <Select
            options={sortingOptions}
            defaultValue={sortingOptions[0]}
            onChange={op => setSortBy(op.value)}
          />
        </section>
      )}
      {sortedItems.map(item => (
        <Item
          key={item.id}
          item={item}
          handleToggleItem={handleToggleItem}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </ul>
  );
}
export default ItemList;

function Item({ item, handleToggleItem, handleRemoveItem }) {
  return (
    <li className='item'>
      <label>
        <input
          type='checkbox'
          checked={item.packed}
          onChange={() => handleToggleItem(item)}
        />
        {item.name}
      </label>
      <button className='remove' onClick={() => handleRemoveItem(item)}>
        ❌
      </button>
    </li>
  );
}
