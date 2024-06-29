/* eslint-disable react/prop-types */
import Modal from "react-modal";

function CustomModal(props) {
  const { isModalOpen, setModalOpen, hasDelete, handleDelete, bookId } = props;

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
    <Modal isOpen={isModalOpen} style={customStyles} ariaHideApp={false}>
      {props.children}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => setModalOpen(false)}
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
