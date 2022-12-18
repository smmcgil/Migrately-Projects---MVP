import React, { useEffect, useRef, useState } from "react";
import { userChatStyles } from "./userChatStyles";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import UserMessageContainer from "./UserMessageContainer";
import ReceivedMessageContainer from "./ReceivedMessageContainer";
import BotMessageContainer from "./BotMessageContainer";

const ChatWindow = (props) => {
  const [messages, setMessages] = useState();
  const messageRef = useRef();

  useEffect(() => {
    setMessages(props.messages.map(mapMessage));
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [props.messages]);

  const mapMessage = (m, index) => {
    if (m.user === props.user) {
      return <UserMessageContainer m={m} key={index} />;
    }
    if (m.user === "MyChat Bot") {
      return <BotMessageContainer m={m} key={index} />;
    } else {
      return <ReceivedMessageContainer m={m} key={index} />;
    }
  };

  return (
    <Card style={userChatStyles.chatWindow}>
      <Card.Header style={userChatStyles.chatHeader}>
        <div className="row">
          <div className="col" style={userChatStyles.bold}>
            Live Chat
          </div>
          <div className="col-7"></div>
          <button
            type="button"
            className="d-flex ms-auto btn-close col-6"
            aria-label="Close"
            onClick={props.onCloseClicked}
          />
        </div>
      </Card.Header>
      <Card.Body ref={messageRef} className="overflow-auto">
        {messages}
      </Card.Body>
      <Card.Footer style={userChatStyles.chatFooter}>
        <ChatInput sendMessage={props.sendMessage} />
      </Card.Footer>
    </Card>
  );
};

ChatWindow.propTypes = {
  onCloseClicked: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default ChatWindow;
