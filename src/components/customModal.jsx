import { useContext } from "react";
import Modal from "react-modal";
import { ModalContext } from "../context/modalContext";
import PropTypes from "prop-types";

function CustomModal(props) {
  const { hasDelete, handleDelete, bookId } = props;
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px"
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      {props.children}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        {hasDelete && (
          <button
            className="cursor-pointer bg-red-500 text-white"
            onClick={() => handleDelete(bookId)}
          >
            Delete
          </button>
        )}
      </div>
    </Modal>
  );
}

export default CustomModal;

CustomModal.propTypes = {
  hasDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
  bookId: PropTypes.number,
  children: PropTypes.node
}
