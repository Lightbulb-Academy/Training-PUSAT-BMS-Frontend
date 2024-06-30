import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const ModalContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
