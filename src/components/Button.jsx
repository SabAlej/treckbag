// import useItemsContext from '../hooks/useItemsContext';
import useItemStore from '../stores/itemsStore';

function Button({ variant, children }) {
  // const { setEventsButtons } = useItemsContext();
  const setEventsButtons = useItemStore(state => state.setEventsButtons);
  return (
    <button
      className={`btn ${variant === 'secondary' ? 'btn--secondary' : ''}`}
      onClick={() => {
        if (variant === 'secondary') {
          setEventsButtons(children);
        }
      }}
    >
      {children}
    </button>
  );
}
export default Button;
