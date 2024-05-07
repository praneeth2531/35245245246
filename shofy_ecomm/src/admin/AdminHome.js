import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import AdminNavbar from './adminNavbar';
import AdminSidebar from './AdminSidebar';
import Footer from '../components/footer';
import UserCard from "./userscard"

const AdminHome = () => {
    const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user

    const handleUserClick = (user) => {
        setSelectedUser(user); // Set the selected user when clicked
    };

    return (
        <>
        <div className="container-fluid bg-white">
                <AdminNavbar />
        </div>
        <div className=" container-fluid">
            <div className="row">
                <div className="col-md-3" style={{ overflowY: 'auto' }}>
                    <AdminSidebar onUserClick={handleUserClick} /> {/* Pass the click handler to the sidebar */}
                </div>
                <div className="col-md-9">
                    {/* Display the selected user details as a card */}
                    {selectedUser && <UserCard user={selectedUser} />}
                </div>
            </div>
        </div>  
        <div className='container-fluid'>
            <Footer />
        </div>
        </>
    );
}

export default AdminHome;
