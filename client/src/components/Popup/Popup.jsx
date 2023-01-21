import "./Popup.css";

const Popup = ({ unmount, children }) => {
  return (
    <div className="Popup">
      <div>{children}</div>
      <button type="button" onClick={unmount}>
        x
      </button>
    </div>
  );
};
export default Popup;
