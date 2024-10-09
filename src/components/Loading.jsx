import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Spin } from "antd";

export function MainLoaing({ delay = 0 }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, delay);

    return () => clearTimeout(timer); // Cleanup function
  }, [delay]);

  return (
    <>
      {showSpinner && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
}

MainLoaing.propTypes = {
  delay: PropTypes.number,
};
