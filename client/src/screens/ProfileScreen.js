import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

const { TabPane } = Tabs;

function ProfileScreen() {
    const user = JSON.parse(localStorage.getItem('currentuser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <div className='bs'>
                        <h1>My Profile</h1>
                        <br />
                        <p><b>Name : </b>{user.name}</p>
                        <p><b>Email : </b>{user.email}</p>
                        <p><b>Is Admin : </b>{user.isAdmin ? 'YES' : 'NO'}</p>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default ProfileScreen;

// Child Component for Bookings Tab
export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchMyBookings() {
            try {
                setLoading(true);
                // This calls the endpoint we created in bookingsRoute.js
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data;
                setBookings(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        }
        fetchMyBookings();
    }, [user._id]);

    return (
        <div className='row'>
            <div className='col-md-6'>
                {loading && <Loader />}
                {error && <Error />}
                {bookings && (bookings.map(booking => {
                    return (
                        <div className='bs' key={booking._id}>
                            <h3>{booking.room}</h3>
                            <p><b>Booking Id : </b>{booking._id}</p>
                            <p><b>Check In : </b>{booking.fromdate}</p>
                            <p><b>Check Out : </b>{booking.todate}</p>
                            <p><b>Amount : </b>{booking.totalamount}</p>
                            <p><b>Status : </b>{booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p>
                            
                            <div className='text-right'>
                                <button className='btn btn-primary'>Cancel Booking</button>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </div>
    );
}