import React from "react";
import PropTypes from "prop-types";
import { userChatStyles } from "./userChatStyles";
import chatIcon from "../../../assets/images/support/support-icon.png";

const ReceivedMessageContainer = (props) => {
  return (
    <div className="d-flex flex-row justify-content-end mb-2">
      <div className="p-2 me-3" style={userChatStyles.receivedChatBorder}>
        <p className="mb-0">{props.m.message}</p>
      </div>
      <img src={chatIcon} alt={chatIcon} style={userChatStyles.chatBubble} />
    </div>
  );
};
ReceivedMessageContainer.propTypes = {
  m: PropTypes.shape({ message: PropTypes.string, Received: PropTypes.string })
    .isRequired,
};
export default ReceivedMessageContainer;
