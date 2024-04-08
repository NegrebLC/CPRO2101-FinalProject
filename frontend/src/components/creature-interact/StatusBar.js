import React from "react";

const StatusBar = ({ label, value, color }) => {
  const formattedValue = parseFloat(value).toFixed(2);
  return (
    <div className="status-bar-container">
      <div>
        {label}: {formattedValue}%
      </div>
      <div
        style={{
          width: `${formattedValue}%`,
          backgroundColor: color,
          height: "20px",
          margin: "4px 0",
        }}
      ></div>
    </div>
  );
};

export default StatusBar;
