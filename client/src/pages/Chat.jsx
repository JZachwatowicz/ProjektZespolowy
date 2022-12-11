import React, { useState, useEffect } from "react";
import socket from "../socket";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "../services/ContextProvider";


function Chat() {
    const { currentUser } = useStateContext();
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

    const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <>
            <div className='flex gap-10 flex-wrap justify-center min-h-screen mb-5'>
                <div className="p-11 flex-grow ">
                    <h1 className="mb-8 text-center text-3xl font-semibold">Czat</h1>
                    <hr />
                </div>
                <div className="p-10 flex-column flex justify-around"></div>
                <Toaster />
                <div className="flex flex-row h-full w-full overflow-x-hidden justify-center">
                    <div className="flex flex-row py-8 pl-6 pr-2 w-10/12 bg-white dark:bg-secondary-dark-bg flex-shrink-0">

                        <div className="flex flex-col items-center w-1/3 bg-indigo-100  dark:bg-main-dark-bg border border-gray-200 mt-4 py-6 px-4 rounded-lg" >
                            <div className="flex flex-row items-center justify-center h-12 w-full flex-wrap">
                                <div
                                    className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="ml-2 font-bold text-2xl">Użytkownicy</div>

                            </div>
                            <div className="flex flex-col mt-8">
                                <button className={`${selectedUser === null ? "bg-white dark:bg-secondary-dark-bg " : "hover:text-black"} flex flex-row items-center justify-center hover:bg-gray-100 rounded-xl p-2 ml-2 font-semibold`}
                                    onClick={() => setSelectedUser(null)}>Czat ogólny</button>
                                <div className="flex flex-col overflow-y-auto ">
                                    {/* {users.length!==1 ? null : <span className="pt-8 text-xl">Nikogo tu nie ma!</span>} */}
                                    {users.map((user) => (
                                        <div
                                            key={user.userID}
                                            onClick={() => handleUsernameClick(user)}
                                            className={` flex flex-row items-center hover:bg-gray-100  rounded-xl p-2
                                     ${selectedUser?.userID === user.userID ? "underline bg-white dark:bg-secondary-dark-bg " : "hover:text-black cursor-pointer"}`}
                                        >

                                            <div className="ml-2 font-semibold">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}{" "}{user.self && "(Ty)"}{" "}</div>


                                            {user.connected ? (
                                                <span className="inline-block w-2 h-2 mx-2 bg-green-600 rounded-full"></span>

                                            ) : (
                                                <span className="inline-block w-2 h-2 mx-2 bg-red-600 rounded-full"></span>

                                            )}
                                            {user.hasNewMessages && (
                                                <span className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 leading-none rounded-full">
                                                    {user.hasNewMessages && user.messages.length}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>



                        <div className="flex antialiased justify-center  items-center min-h-screen w-2/3 ">

                            <div className="flex flex-col flex-auto  h-full p-6 ">
                                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 dark:bg-main-dark-bg " >

                                    {selectedUser === null ?
                                        <>
                                            <form onSubmit={handleMessage} className="flex flex-row items-center gap-2 w-full flex-wrap">
                                                <div className="flex-grow">
                                                    <input value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        type="text"
                                                        placeholder="Do wszystkich"
                                                        className={formStyle} />
                                                </div>
                                                <div className="ml-4">
                                                    <button
                                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                                        type="submit">
                                                        <span>Wyślij</span>
                                                    </button>
                                                </div>
                                            </form>
                                            <br />
                                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                                {messages.map((m) => (
                                                    <div key={m.id} className="grid grid-cols-12 gap-y-2">
                                                        {m.name.toUpperCase() !== username.toUpperCase() ?
                                                            <div className="col-start-1 col-end-8 p-3 rounded-lg grid">
                                                                <div className="flex rounded-xl px-2 py-1">
                                                                    {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
                                                                </div>
                                                                <div
                                                                    className="ml-3 dark:text-black text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                                >
                                                                    <div>{m.message}</div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="col-start-6 col-end-13 p-3 rounded-lg grid">
                                                                <div className="flex items-center justify-start flex-row-reverse">

                                                                    {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
                                                                </div>
                                                                <div
                                                                    className=" mr-3 dark:text-black text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                                >
                                                                    <div>{m.message}</div>
                                                                </div>
                                                            </div>
                                                        }


                                                    </div>
                                                ))}

                                            </div>
                                            {typing && typing}






                                        </>
                                        :

                                        <>
                                            <form onSubmit={handlePrivateMessage} className="flex flex-row items-center gap-2 w-full flex-wrap">
                                                <div className="flex-grow">
                                                    <input value={privateMessage}
                                                        onChange={(e) => setPrivateMessage(e.target.value)}
                                                        type="text"
                                                        placeholder="Prywatna wiadomość"
                                                        className={formStyle} />
                                                </div>
                                                <div className="ml-4">
                                                    <button
                                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                                        type="submit">
                                                        <span>Wyślij</span>
                                                    </button>
                                                </div>
                                            </form>

                                            <br />
                                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                                {selectedUser &&
                                                    selectedUser.messages &&
                                                    selectedUser.messages.map((msg, index) => (
                                                        <div key={index} className="grid grid-cols-12 gap-y-2">
                                                            {!msg.fromSelf ?
                                                                <div className="col-start-1 col-end-8 p-3 rounded-lg grid">
                                                                    <div className="flex rounded-xl px-2 py-1">

                                                                        {
                                                                            selectedUser.username.charAt(0).toUpperCase() +
                                                                            selectedUser.username.slice(1)}{" "}
                                                                    </div>
                                                                    <div
                                                                        className="ml-3 dark:text-black text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                                    >
                                                                        <div>{msg.message}</div>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="col-start-6 col-end-13 p-3 rounded-lg grid">
                                                                    <div className="flex items-center justify-start flex-row-reverse">

                                                                        (Ty)
                                                                    </div>
                                                                    <div
                                                                        className=" mr-3 dark:text-black text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                                    >
                                                                        <div>{msg.message}</div>
                                                                    </div>
                                                                </div>
                                                            }


                                                        </div>
                                                    ))}

                                            </div>
                                            {typing && typing}




                                        </>

                                    }


                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <br />
            </div>



        </>
    );
}

export default Chat;

