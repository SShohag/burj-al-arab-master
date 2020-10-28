import React, { useContext, useEffect, useState } from 'react';
import { UserLogInContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserLogInContext)
    useEffect(() => {
        fetch('http://localhost:8080/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
        }
        })
        .then( res => res.json())
        .then( data => setBookings(data));
    },[])
    return (
        <div>
            <h3> You have total : {bookings.length} bookings now </h3>

            {
                bookings.map(book => <li key={book._id}> {book.name} From: {(new Date(book.checkIn).toString('dd/MM/yyyy'))} To: {(new Date(book.checkOut).toString('dd/MM/yyyy'))}</li> )
            }
        </div>
    );
};

export default Bookings;