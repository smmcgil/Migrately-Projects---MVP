import React, { useState, useRef } from "react";
import { PropTypes } from "prop-types";
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";
import { userChatStyles } from "./userChatStyles";
import debug from "sabio-debug";
import upload from "../../../assets/images/support/upload.png";

const _logger = debug.extend("SupportIcon");

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(HTMLInputElement);

  const onUploadClicked = () => {
    inputRef.current?.click();
  };

  const onUploadSelected = (e) => {
    _logger(e.target.files[0]);
  };

  const onFormChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.sendMessage(message);
    setMessage("");
  };

  return (
    <Form style={userChatStyles.chatInput}>
      <InputGroup>
        <div className="m-2">
          <FormControl
            ref={inputRef}
            className="d-none"
            type="file"
            onChange={onUploadSelected}
          />
          <img
            src={upload}
            alt={upload}
            type="button"
            onClick={onUploadClicked}
          />
        </div>
        <FormControl
          placeholder="Chat Here!"
          onChange={onFormChange}
          value={message}
        />
        <Button
          styles={userChatStyles.chatInputButton}
          variant="primary"
          type="submit"
          onClick={onSubmit}
          disabled={!message}
        >
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};
ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatInput;
