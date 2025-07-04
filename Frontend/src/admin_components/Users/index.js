import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import AdminNavbar from '../AdminNavbar';

const Users = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch all users on mount
  useEffect(() => {
    axios.get('http://localhost:5100/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Delete user by ID
  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:5100/userdelete/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userId));
          alert('User deleted');
        })
        .catch(err => {
          console.error('Delete user error:', err);
          alert('Failed to delete user');
        });
    }
  };

  // Delete booking by ID
  const deleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      axios.delete(`http://localhost:5100/userbookingdelete/${bookingId}`)
        .then(() => {
          setUserBookings(userBookings.filter(booking => booking._id !== bookingId));
          alert('Booking deleted');
        })
        .catch(err => {
          console.error('Delete booking error:', err);
          alert('Failed to delete booking');
        });
    }
  };

  // Fetch bookings for a specific user and show modal
  const fetchUserBookings = (userId) => {
    axios.get(`http://localhost:5100/getbookings/${userId}`)
      .then(response => {
        setUserBookings(response.data);
        setShowDetails(true);
      })
      .catch(error => {
        console.error('Error fetching user bookings:', error);
        alert('Failed to fetch bookings');
      });
  };

  // Calculate status based on date
  const calculateStatus = (date) => {
    const currentDate = new Date();
    const deliveryDate = new Date(date);
    return deliveryDate >= currentDate ? 'Upcoming' : 'Completed';
  };

  return (
    <div>
      <AdminNavbar />
      <br />
      <h1 className="text-center">Users</h1>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Table striped bordered hover variant="dark" style={{ width: '70%' }}>
          <thead>
            <tr>
              <th>Sl/No</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{ border: 'none', color: 'red', background: 'none', cursor: 'pointer' }}
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>{' '}
                  <Button onClick={() => fetchUserBookings(user._id)} style={{ marginBottom: '12px' }}>
                    View Bookings
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for showing user bookings */}
      {showDetails && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000 }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              maxHeight: '80vh',
              overflowY: 'auto',
              width: '90%',
              maxWidth: '1350px',
              position: 'relative',
            }}
          >
            <h2 className="text-center text-primary mb-4">User Bookings</h2>
            {userBookings.length === 0 ? (
              <p>No bookings found for this user.</p>
            ) : (
              userBookings.map((booking) => {
                const status = calculateStatus(booking.date);
                return (
                  <Card
                    key={booking._id}
                    style={{
                      marginBottom: '20px',
                      padding: '15px',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={`http://localhost:7000/organizer/${booking.templeImage}`}
                      alt={booking.templeName}
                      style={{ height: '80px', width: '120px', borderRadius: '5px' }}
                    />
                    <div>
                      <p><strong>Temple Name:</strong> {booking.templeName}</p>
                    </div>
                    <div>
                      <p><strong>Darshan Name:</strong> {booking.darshanName}</p>
                    </div>
                    <div>
                      <p><strong>Booking ID:</strong> {booking._id.slice(0, 10)}</p>
                    </div>
                    <div>
                      <p><strong>Organizer:</strong> {booking.organizerName}</p>
                    </div>
                    <div>
                      <p><strong>Booking Date:</strong> {booking.BookingDate}</p>
                    </div>
                    <div>
                      <p><strong>Timings:</strong> {booking.open} - {booking.close}</p>
                    </div>
                    <div>
                      <p><strong>Quantity:</strong> {booking.quantity}</p>
                    </div>
                    <div>
                      <p><strong>Price:</strong> {booking.totalamount}</p>
                    </div>
                    <div>
                      <p><strong>Status:</strong> {status}</p>
                    </div>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      style={{ border: 'none', color: 'red', background: 'none', cursor: 'pointer' }}
                      title="Delete Booking"
                    >
                      <FaTrash />
                    </button>
                  </Card>
                );
              })
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button onClick={() => setShowDetails(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
