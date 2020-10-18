import React from "react";
import "./ChatHeader.css";
import {
  Notifications,
  EditLocationRounded,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
  HelpRounded,
} from "@material-ui/icons";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName == null ? "Select a channel" : channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />

        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <SearchRounded />
        </div>

        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  );
}

export default ChatHeader;
