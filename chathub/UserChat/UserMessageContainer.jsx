import React from "react";
import PropTypes from "prop-types";
import { userChatStyles } from "./userChatStyles";
import chatIcon from "../../../assets/images/support/support-icon.png";

const UserMessageContainer = (props) => {
  return (
    <div className="d-flex flex-row justify-content-start mb-2">
      <img src={chatIcon} alt={chatIcon} style={userChatStyles.chatBubble} />
      <div className="p-2 ms-3" style={userChatStyles.userChatBorder}>
        <p className="mb-0">{props.m.message}</p>
      </div>
    </div>
  );
};
UserMessageContainer.propTypes = {
  m: PropTypes.shape({ message: PropTypes.string, user: PropTypes.string })
    .isRequired,
};
export default UserMessageContainer;
