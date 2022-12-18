import React from "react";
import { Card, Button } from "react-bootstrap";
import { userChatStyles } from "./userChatStyles";
import PropTypes from "prop-types";

const ChatConnectionScreen = (props) => {
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
      <Card.Body>
        <Button
          type="button"
          onClick={props.onJoinRoomClicked}
          className="btn btn-info ms-13 mt-20"
        >
          Join Chat
        </Button>
      </Card.Body>
      <Card.Footer style={userChatStyles.chatFooter}></Card.Footer>
    </Card>
  );
};

ChatConnectionScreen.propTypes = {
  onJoinRoomClicked: PropTypes.func.isRequired,
  onCloseClicked: PropTypes.func.isRequired,
};

export default ChatConnectionScreen;
