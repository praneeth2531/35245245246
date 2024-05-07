import React from 'react';
import './Sidebar.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
     {user.image && (
              <img src={`http://localhost:3001/${user.image}`} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%',marginRight:"20px" }} />
            )}
      <div className="user-details">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
