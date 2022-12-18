import React, { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import toastr from "toastr";
import ChatConnectionScreen from "./ChatConnectionScreen";
import ChatWindow from "./ChatWindow";

const _logger = debug.extend("SupportIcon");

const ConnectionScreen = (props) => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:50001/chathub")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.onclose(() => {
        setConnection();
        setMessages([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      toastr["error"](e, "Connection Failure!");
      _logger(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      toastr["error"](e, "Connection Failure!");
      _logger(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      toastr["error"](e, "Message Failure!");
      _logger(e);
    }
  };

  const onJoinRoomClicked = () => {
    joinRoom(props.user, "1");
  };

  const onCloseClicked = (e) => {
    e.preventDefault();
    closeConnection();
    props.setEnabled(false);
  };

  return (
    <div>
      {!connection ? (
        <ChatConnectionScreen
          onJoinRoomClicked={onJoinRoomClicked}
          onCloseClicked={onCloseClicked}
        />
      ) : (
        <ChatWindow
          onCloseClicked={onCloseClicked}
          messages={messages}
          sendMessage={sendMessage}
          user={props.user}
        />
      )}
    </div>
  );
};

ConnectionScreen.propTypes = {
  setEnabled: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default ConnectionScreen;
