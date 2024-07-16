import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [design, setDesign] = useState(
    localStorage.getItem("currentDesign") || "design1"
  );

  useEffect(() => {
    const root = document.documentElement;
    const designs = {
      design1: {
        "--component-color": "#252c41",
        "--component-background-color": "#2b3348",
        "--background-color": "#1c2029",
        "--text-color": "#d1d1d1",
        "--button-color": "#3a8dca",
        "--button-color-hover": "#2b3348",
        "--input-color": "#2a3147",
        "--input-focus-color": "#3a8dca",
        "--border-color": "#3a3f4b",
        "--success-color": "#27ae60",
        "--warning-color": "#f2c94c",
        "--error-color": "#cd1605",
      },
      design2: {
        "--component-color": "#394053",
        "--component-background-color": "#323a4f",
        "--background-color": "#262b38",
        "--text-color": "#f8f8f2",
        "--button-color": "#f29559",
        "--button-color-hover": "#f27735",
        "--input-color": "#3b4252",
        "--input-focus-color": "#d08770",
        "--border-color": "#434c5e",
        "--success-color": "#a3be8c",
        "--warning-color": "#ebcb8b",
        "--error-color": "#bf616a",
      },
      design3: {
        "--component-color": "#2e3440",
        "--component-background-color": "#3b4252",
        "--background-color": "#2b303b",
        "--text-color": "#e5e9f0",
        "--button-color": "#007bff",
        "--button-color-hover": "#0056b3",
        "--input-color": "#434c5e",
        "--input-focus-color": "#88c0d0",
        "--border-color": "#4c566a",
        "--success-color": "#15bd4a",
        "--warning-color": "#d08770",
        "--error-color": "#bf616a",
      },
    };
    Object.keys(designs[design]).forEach((key) => {
      root.style.setProperty(key, designs[design][key]);
    });
  }, [design]);

  const changeDesign = (newDesign) => {
    setDesign(newDesign);
    localStorage.setItem("currentDesign", newDesign);
  };

  return (
    <DesignContext.Provider value={{ design, changeDesign }}>
      {children}
    </DesignContext.Provider>
  );
};

DesignProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
