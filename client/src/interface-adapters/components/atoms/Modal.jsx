import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./assets/modal.css";

export const Modal = ({ text, points }) => {
  const { t } = useTranslation();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? (
        <IoMdCloseCircleOutline
          className="modal-icon"
          onClick={() => setIsClicked(!isClicked)}
        />
      ) : (
        <CiCircleInfo
          className="modal-icon"
          onClick={() => setIsClicked(!isClicked)}
        />
      )}
      {isClicked ? (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <p>{t(text)}</p>
              <ol>
                {points.map((point, index) => (
                  <li key={index}>{t(point)}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
