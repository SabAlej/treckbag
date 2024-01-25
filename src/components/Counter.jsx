// import useItemsContext from '../hooks/useItemsContext';
import useItemStore from '../stores/itemsStore';

function Counter() {
  // const { countPacked } = useItemsContext();
  const { packed, total } = useItemStore(state => state.countPacked());

  return (
    <p>
      <b>{packed}</b> / {total} items packed
    </p>
  );
}
export default Counter;
