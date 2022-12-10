import React, { useState, useEffect } from "react";
import socket from "../socket";
import toast, { Toaster } from "react-hot-toast";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import { useStateContext } from "../services/ContextProvider";

const ROOT_CSS = css({
    height: 650,
    width: "100%",
});

function Chat() {
    const {currentUser} = useStateContext();
    // state
    const username = currentUser.first_name + " " + currentUser.last_name;
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [typing, setTyping] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    // private message
    const [privateMessage, setPrivateMessage] = useState("");

    useEffect(() => {
        handleUsername();
        socket.on("user joined", (msg) => {
            console.log("user joined message", msg);
        });

        socket.on("message", (data) => {

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    id: data.id,
                    name: data.name,
                    message: data.message,
                },
            ]);
        });

        return () => {
            socket.off("user joined");
            socket.off("message");
        };
    }, []);

    useEffect(() => {
        socket.on("user connected", (user) => {
            user.connected = true;
            user.messages = [];
            user.hasNewMessages = false;
            setUsers((prevUsers) => [...prevUsers, user]);
            toast.success(`Do czatu dołącza: ${user.username}`);
        });

        socket.on("users", (users) => {
            // setUsers(users);
            users.forEach((user) => {
                user.self = user.userID === socket.id;
                user.connected = true;
                user.messages = [];
                user.hasNewMessages = false;
            });
            // put the current user first, and sort by username
            const sorted = users.sort((a, b) => {
                if (a.self) return -1;
                if (b.self) return 1;
                if (a.username < b.username) return -1;
                return a.username > b.username ? 1 : 0;
            });

            setUsers(sorted);
        });

        socket.on("username taken", () => {
            toast.error("Na czacie jest już użytkownik o tych danych osobowych");
        });

        return () => {
            socket.off("users");
            socket.off("user connected");
            socket.off("username taken");
        };
    }, [socket]);

    useEffect(() => {
        socket.on("user disconnected", (id) => {
            let allUsers = users;

            let index = allUsers.findIndex((el) => el.userID === id);
            let foundUser = allUsers[index];
            foundUser.connected = false;

            allUsers[index] = foundUser;
            setUsers([...allUsers]);
            // disconnected alert
            toast.error(`${foundUser.username} opuszcza czat...`);
        });

        return () => {
            socket.off("user disconnected");
        };
    }, [users, socket]);

    const handleUsername = () => {

        socket.auth = { username };
        socket.connect();
        console.log(socket);

        setTimeout(() => {
            if (socket.connected) {
                console.log("socket.connected", socket);
            }
        }, 1000);
    };

    const handleMessage = (e) => {
        e.preventDefault();
        socket.emit("message", {
            id: Date.now(),
            name: username,
            message,
        });
        setMessage("");
    };

    if (message) {
        socket.emit("typing", username);
    }

    useEffect(() => {
        socket.on("typing", (data) => {
            setTyping(data);
            setTimeout(() => {
                setTyping("");
            }, 1000);
        });

        return () => {
            socket.off("typing");
        };
    }, []);

    useEffect(() => {
        socket.on("private message", ({ message, from }) => {
            const allUsers = users;
            let index = allUsers.findIndex((u) => u.userID === from);
            let foundUser = allUsers[index];

            foundUser.messages.push({
                message,
                fromSelf: false,
            });

            if (foundUser) {
                if (selectedUser) {
                    if (foundUser.userID !== selectedUser.userID) {
                        foundUser.hasNewMessages = true;
                    }
                } else {
                    foundUser.hasNewMessages = true;
                }

                allUsers[index] = foundUser;
                setUsers([...allUsers]);
            }
        });

        return () => {
            socket.off("private message");
        };
    }, [users]);

    const handleUsernameClick = (user) => {
        if (user.self || !user.connected) return;
        setSelectedUser({ ...user, hasNewMessages: false });

        let allUsers = users;
        let index = allUsers.findIndex((u) => u.userID === user.userID);
        let foundUser = allUsers[index];
        foundUser.hasNewMessages = false;

        allUsers[index] = foundUser;
        setUsers([...allUsers]);
    };

    const handlePrivateMessage = (e) => {
        e.preventDefault();
        if (selectedUser) {
            socket.emit("private message", {
                message: privateMessage,
                to: selectedUser.userID,
            });

            let updated = selectedUser;
            updated.messages.push({
                message: privateMessage,
                fromSelf: true,
                hasNewMessages: false,
            });
            setSelectedUser(updated);
            setPrivateMessage("");
        }
    };
    return (
        
        <div className="container-fluid">
            <Toaster />
            <div className="row">
                <div className="col-md-2 pt-3">
                    <button onClick={()=> setSelectedUser(null)}>Powrót do czatu publicznego</button>
                    {users.map((user) => (
                            <div
                                key={user.userID}
                                onClick={() => handleUsernameClick(user)}
                                style={{
                                    textDecoration:
                                        selectedUser?.userID === user.userID && "underline",
                                    cursor: !user.self && "pointer",
                                }}
                            >
                                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}{" "}
                                {user.self && "(Ty)"}{" "}
                                {user.connected ? (
                                    <span className="online-dot"></span>
                                ) : (
                                    <span className="offline-dot"></span>
                                )}
                                {user.hasNewMessages && <b className="text-danger">_ _ _</b>}
                                {user.hasNewMessages && (
                                    <b className="text-danger">
                                        {user.hasNewMessages && user.messages.length}
                                    </b>
                                )}
                            </div>
                        ))}
                </div>

                {selectedUser === null ? 
                    <div className="col-md-5">
                        <form onSubmit={handleMessage} className="text-center pt-3">
                            <div className="row g-3">
                                <div className="col-10">
                                    <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        type="text"
                                        placeholder="Type your message (public)"
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-2">
                                    <button className="btn btn-secondary" type="submit">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>

                        <br />

                        <div className="col">
                            <ScrollToBottom className={ROOT_CSS}>
                                {messages.map((m) => (
                                    <div className="alert alert-secondary" key={m.id}>
                                        {m.name.charAt(0).toUpperCase() + m.name.slice(1)} -{" "}
                                        {m.message}
                                    </div>
                                ))}
                            </ScrollToBottom>
                            <br />
                            {typing && typing}
                        </div>
                    </div>
                     : 
                    <div className="col-md-5">
                        <form onSubmit={handlePrivateMessage} className="text-center pt-3">
                            <div className="row g-3">
                                <div className="col-10">
                                    <input
                                        value={privateMessage}
                                        onChange={(e) => setPrivateMessage(e.target.value)}
                                        type="text"
                                        placeholder="Type your message (private)"
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-2">
                                    <button className="btn btn-secondary" type="submit">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>

                        <br />

                        <div className="col">
                            <ScrollToBottom className={ROOT_CSS}>
                                {selectedUser &&
                                    selectedUser.messages &&
                                    selectedUser.messages.map((msg, index) => (
                                        <div key={index} className="alert alert-secondary">
                                            {msg.fromSelf
                                                ? "(yourself)"
                                                : selectedUser.username.charAt(0).toUpperCase() +
                                                selectedUser.username.slice(1)}{" "}
                                            {" - "}
                                            {msg.message}
                                        </div>
                                    ))}
                            </ScrollToBottom>
                            <br />
                            {typing && typing}
                        </div>
                    </div>
                }

                <br />
            </div>
        </div>
    );
}

export default Chat;
