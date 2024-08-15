import PropTypes from "prop-types";
import { useState } from "react";
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import "./assets/copy-button.css";

export const CopyButton = ({ onClick }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyTimeout = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, "3000");
  };

  return (
    <button className="copy-button" onClick={onClick}>
      {isCopied ? (
        <HiOutlineClipboardDocumentCheck />
      ) : (
        <HiOutlineClipboardDocument onClick={() => copyTimeout()} />
      )}
    </button>
  );
};

CopyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
