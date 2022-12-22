import React from "react";
import "./styles.css";

const TopLoader = ({ isLoading, message = "Loading..." }) => {
  return (
    isLoading && (
      <div className={"loader"}>
        <h3>{message}</h3>
      </div>
    )
  );
};

export default TopLoader;
