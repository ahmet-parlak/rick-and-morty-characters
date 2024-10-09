import { useState } from "react";
import PropTypes from "prop-types";

import { Tooltip } from "antd";

const Spoiler = ({ text, warning = true }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <>
      <div onClick={handleClick} className={"spoiler"}>
        <Tooltip title={isRevealed ? "Hide" : "Show"} placement="bottom">
          <span className={isRevealed ? "revealed" : "blurred"}>{text}</span>
        </Tooltip>
        {warning && !isRevealed && (
          <Tooltip title={isRevealed ? "Hide" : "Show"} placement="bottom">
            <span className="spoiler-alert">
              {<span className="spoiler-warning">⚠️ Spoiler Alert</span>}
            </span>
          </Tooltip>
        )}
      </div>
    </>
  );
};

Spoiler.propTypes = {
  text: PropTypes.string.isRequired,
  warning: PropTypes.bool,
};

export default Spoiler;
