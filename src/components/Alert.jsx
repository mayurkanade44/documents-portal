import React, { useEffect } from "react";

export const Alert = ({ message, removeAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="alert alert-success" role="alert">
      Email Has Been Sent
    </div>
  );
};
