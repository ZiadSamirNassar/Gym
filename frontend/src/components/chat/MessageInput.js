import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='m-3'>
      <InputGroup>
        <FormControl
          placeholder="اكتب رسالتك..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="رسالة الدردشة"
        />
        <Button 
          variant="primary" 
          type="submit" 
          disabled={!message.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </InputGroup>
    </form>
  );
};

export default MessageInput;