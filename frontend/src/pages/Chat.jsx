import { useState, useEffect } from "react";
import { Form, Button, Container, Dropdown } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

const Chat = () => {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [error, setError ] = useState(null)

    useEffect(() => {
        fetch("/Trainer")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch trainers");
                }
                return response.json();
            })
            .then(data => setTrainers(data))
            .catch(error => setError(error.message));
    }, []);

    useEffect(() => {
        if (selectedTrainer) {
            fetch(`/Messages/${selectedTrainer.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch messages");
                    }
                    return response.json();
                })
                .then(data => setMessages(data))
                .catch(error => setError(error.message));
        }
    }, [selectedTrainer]);

    useEffect(() => {
        const ws = new WebSocket("ws://your-websocket-server-url");
        setSocket(ws);

        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        };

        return () => ws.close();
    }, []);

    const handleSelectTrainer = (trainer) => {
        setSelectedTrainer(trainer);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedTrainer) {
            const message = {
                content: newMessage,
                trainerId: selectedTrainer.id,
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
                        {selectedTrainer ? selectedTrainer.name : "Select Trainer"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {trainers.map(trainer => (
                            <Dropdown.Item key={trainer.id} onClick={() => handleSelectTrainer(trainer)}>
                                {trainer.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex flex-column overflow-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`bg-light px-3 pt-3 pb-4 rounded-3 mb-3 position-relative ${msg.self ? "align-self-end" : "align-self-start"}`}
                        style={{ maxWidth: "75%" }}
                    >
                        <div className="fw-bold" style={{ fontSize: "17px" }}>{msg.content}</div>
                        <span className="fw-semibold text-secondary position-absolute bottom-0 end-0 pb-1 pe-3" style={{ fontSize: "13px" }}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
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