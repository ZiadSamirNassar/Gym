import { useState, useEffect } from "react";
import { Form, Button, Container, Dropdown } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userType = localStorage.getItem("type");
        const token = localStorage.getItem("token");
        const endpoint = userType === "member" 
            ? "https://localhost:7052/Trainer" 
            : "https://localhost:7052/Members";

        fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then(data => setUsers(data.data))
            .catch(error => setError(error.message));
    }, []);

    useEffect(() => {
        if (selectedUser) {
            const token = localStorage.getItem("token");

            fetch(`https://localhost:7052/Message/${selectedUser.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch messages");
                    }
                    return response.json();
                })
                .then(data => setMessages(data.data))
                .catch(error => setError(error.message));
        }
    }, [selectedUser]);

    useEffect(() => {
        const ws = new WebSocket("wss://localhost:5074/ws");
        setSocket(ws);

        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        };

        return () => ws.close();
    }, []);

    const handleSelectUser = (user) => {
        if (localStorage.getItem("type") === "trainer") {
            setSelectedUser({ ...user, id: user.memberId });
        } else {
            setSelectedUser({ ...user, id: user.trainerId });
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedUser) {
            const message = {
                content: newMessage,
                userId: selectedUser.id,
                timestamp: new Date().toISOString(),
            };

            socket.send(JSON.stringify(message));

            setMessages(prevMessages => [...prevMessages, { ...message, self: true }]);
            setNewMessage("");
        }
    };

    return (
        <Container fluid className="rounded-2 d-flex flex-column justify-content-between p-0" style={{ height: "90vh" }}>
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <h4 className="fw-semibold">Chat</h4>
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {selectedUser ? selectedUser.name : "Select User"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {users.map(user => (
                            <Dropdown.Item key={user.id} onClick={() => handleSelectUser(user)}>
                                {user.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex flex-column overflow-auto">

                {messages.map((msg, index) => {
                    if (msg.receiverId === selectedUser.id) {
                        return <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-end" style={{maxWidth: "75%", minWidth: "15%"}}>
                            <div className="fw-bold " style={{fontSize: "17px"}}>{ msg.content }</div>
                            <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
                        </div>
                    } else { 
                        return <div className="bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative align-self-start" style={{maxWidth: "75%", minWidth: "15%"}}>
                            <div className="fw-bold " style={{fontSize: "17px"}}>{ msg.content }</div>
                            <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{fontSize: "13px"}}>10:00am</span>
                        </div>
                    }
                })}
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-between border-top p-3" style={{ height: "80px" }}>
                <Form.Control
                    type="text"
                    placeholder="Enter your message"
                    className="py-2 border-black shadow-sm"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                    variant="dark"
                    className="d-flex align-items-center justify-content-between shadow-sm"
                    style={{ height: "40px" }}
                    onClick={handleSendMessage}
                >
                    <Send size={20} />
                </Button>
            </div>
        </Container>
    );
};

export default Chat;