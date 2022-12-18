import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { userChatStyles } from "./userChatStyles";
import chatIcon from "../../../assets/images/support/support-icon.png";

const SupportIcon = (props) => {
  const [isHovered, setHovered] = useState(false);

  const onMouseIn = () => {
    setHovered(true);
  };
  const onMouseOut = () => {
    setHovered(false);
  };

  return (
    <Image
      onClick={props.onIconClicked}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
      style={{
        ...userChatStyles.messageButton,
        ...{
          boxShadow: isHovered ? "0 0 30px #045BB2" : null,
          transform: isHovered ? "scale(1.5,1.5)" : null,
          border: isHovered ? "1px solid #045BB2" : "3px solid #045BB2",
        },
      }}
      src={chatIcon}
      alt={chatIcon}
    />
  );
};
SupportIcon.propTypes = {
  onIconClicked: PropTypes.func.isRequired,
};
export default SupportIcon;
