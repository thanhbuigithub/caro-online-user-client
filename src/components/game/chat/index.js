import React, { useState, useContext, useEffect } from "react";
import GameContext from "../../../contexts/GameContext";
import Config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  messageBox: {
    width: "100%",
    height: 250,
    overflow: "auto",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: "2px",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Chat({}) {
  const classes = useStyles();
  const { chatHistory } = useContext(GameContext);
  const [message, setMessage] = useState("");
  const socket = SocketManager.getSocket();

  const sendMessage = function () {
    if (message.trim() !== "") {
      socket.emit("chat", message);
      setMessage("");
    }
  };

  useEffect(() => {
    let objDiv = document.getElementById("message-box");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chatHistory]);

  return (
    <div className={classes.root}>
      <List className={classes.messageBox} id="message-box">
        {chatHistory.map((chat, index) => (
          <ListItem key={index}>
            <ListItemText
            //primary="Single-line item"
            // secondary={secondary ? 'Secondary text' : null}
            >
              {`${chat.sender.username}: ${chat.message}`}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="Nhập tin nhắn ..."
          inputProps={{ "aria-label": "input message" }}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="send"
          onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default Chat;
