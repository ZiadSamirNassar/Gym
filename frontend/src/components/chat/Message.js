import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Message = ({ message, isCurrentUser }) => {
  return (
    <ListGroupItem 
      className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}
    >
      <div className={`message ${isCurrentUser ? 'current-user' : 'other-user'}`}>
        {!isCurrentUser && (
          <div className="d-flex align-items-center mb-1">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            <strong>Ziad samir</strong>
          </div>
        )}
        <div className="message-content">Hi, Ali</div>
        <div className="message-time text-muted">
          12:30 PM
        </div>
      </div>
    </ListGroupItem>
  );
};

export default Message;