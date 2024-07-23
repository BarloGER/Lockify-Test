import { useEffect, useState } from "react";
import "./assets/crypto-lock.css";

export const CryptoLock = () => {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const generateRandomNumber = () => Math.floor(Math.random() * 10);

    const createMatrix = () => {
      const rows = 31;
      const cols = 21;
      const newMatrix = [];

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Define positions for the flat design padlock
          if (
            (i === 5 && j >= 8 && j <= 12) || // Start bar of the lock
            (i === 6 && j >= 7 && j <= 8) ||
            (i === 6 && j >= 12 && j <= 13) ||
            (i === 7 && j === 7) ||
            (i === 7 && j === 13) ||
            (i === 8 && j === 7) ||
            (i === 8 && j === 13) ||
            (i === 9 && j === 7) ||
            (i === 9 && j === 13) ||
            (i === 10 && j === 7) ||
            (i === 10 && j === 13) ||
            (i === 11 && j === 7) ||
            (i === 11 && j === 13) ||
            (i === 12 && j === 7) ||
            (i === 12 && j === 13) ||
            (i === 13 && j === 7) ||
            (i === 13 && j === 13) || // End bar of the lock
            (i === 14 && j >= 5 && j <= 15) ||
            (i === 15 && j >= 5 && j <= 15) ||
            (i === 16 && j >= 5 && j <= 8) ||
            (i === 16 && j >= 12 && j <= 15) ||
            (i === 17 && j >= 5 && j <= 8) ||
            (i === 17 && j >= 12 && j <= 15) ||
            (i === 18 && j >= 5 && j <= 8) ||
            (i === 18 && j >= 12 && j <= 15) ||
            (i === 19 && j >= 5 && j <= 9) ||
            (i === 19 && j >= 11 && j <= 15) ||
            (i === 20 && j >= 5 && j <= 9) ||
            (i === 20 && j >= 11 && j <= 15) ||
            (i === 21 && j >= 5 && j <= 9) ||
            (i === 21 && j >= 11 && j <= 15) ||
            (i === 22 && j >= 5 && j <= 9) ||
            (i === 22 && j >= 11 && j <= 15) ||
            (i === 23 && j >= 5 && j <= 15) ||
            (i === 24 && j >= 5 && j <= 15) ||
            (i === 25 && j >= 5 && j <= 15)
          ) {
            row.push(generateRandomNumber());
          } else {
            row.push(" ");
          }
        }
        newMatrix.push(row);
      }

      setMatrix(newMatrix);
    };

    createMatrix();
    const interval = setInterval(createMatrix, 130);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crypto-lock">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="crypto-lock__rows">
          {row.map((num, colIndex) => (
            <span key={colIndex} className="crypto-lock__numbers">
              {num}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
