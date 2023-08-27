import React, { useEffect, useState } from 'react';
import './BankDetailsPage.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const BankDetailsPage = ({ loggedInUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (loggedInUser && loggedInUser.uid && loggedInUser.email) {
      const userRef = firebase.firestore().collection('users').doc(loggedInUser.uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    }
  }, [loggedInUser]);

  return (
    <div className="bank-details-container">
      <h2>Bank Details</h2>
      {userData ? (
        <>
          <p>User ID: {loggedInUser.uid}</p>
          <p>Minimum Balance: Rs. {userData.balance || 0}</p>
          <p>Date of Birth: {userData.dob || 'Not provided'}</p>
          <p>Email: {loggedInUser.email}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default BankDetailsPage;
