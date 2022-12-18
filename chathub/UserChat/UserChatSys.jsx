import React, { useState } from "react";
import SupportIcon from "./SupportIcon";
import ChatConnectionHub from "./ChatConnectionHub";
import debug from "sabio-debug";

const _logger = debug.extend("SupportIcon");

const UserChatSys = () => {
  const [isEnabled, setEnabled] = useState(false);
  const [user, setUser] = useState("Default User");

  const onIconClicked = () => {
    setEnabled(!isEnabled);
  };

  _logger(setUser);

  return (
    <div className="fixed-bottom d-flex">
      <div className="ms-auto me-6 mb-6">
        {isEnabled ? (
          <ChatConnectionHub setEnabled={setEnabled} user={user} />
        ) : (
          <SupportIcon onIconClicked={onIconClicked} />
        )}
      </div>
    </div>
  );
};

export default UserChatSys;
