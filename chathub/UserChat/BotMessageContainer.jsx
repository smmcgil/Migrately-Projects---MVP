import React from "react";
import PropTypes from "prop-types";
import { userChatStyles } from "./userChatStyles";

const BotMessageContainer = (props) => {
  return (
    <div
      className="d-flex flex-row justify-content-center mb-2"
      style={userChatStyles.bold}
    >
      <div>
        <p>{props.m.message}</p>
      </div>
    </div>
  );
};
BotMessageContainer.propTypes = {
  m: PropTypes.shape({ message: PropTypes.string, Received: PropTypes.string })
    .isRequired,
};
export default BotMessageContainer;
