import React, { useState } from 'react';
import './DepositPage.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const DepositPage = ({ loggedInUser }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async () => {
    if (!loggedInUser || !loggedInUser.uid) {
      setMessage('Please log in to deposit.');
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    const userRef = firebase.firestore().collection('users').doc(loggedInUser.uid);

    try {
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const newBalance = userData.balance + parseFloat(amount);
        await userRef.update({ balance: newBalance });
        setMessage(`Successfully deposited Rs. ${amount}`);
        setAmount('');
      } else {
        setMessage('User data not found.');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      setMessage('An error occurred during deposit.');
    }
  };

  return (
    <div className="deposit-container">
      <h2>Deposit Money</h2>
      <div className="deposit-form">
      <input
       type="number"
       className="custom-amount-input"
       placeholder="Amount"
       value={amount}
       onChange={(e) => setAmount(e.target.value)}
      />
      <button className="custom-submit-button" onClick={handleDeposit}>Submit</button>
      <p className="message">{message}</p>
     </div>
    </div>
  );
};

export default DepositPage;

