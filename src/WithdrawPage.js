import React, { useState } from 'react';
import './WithdrawPage.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const WithdrawPage = ({ loggedInUser }) => {
  const [amount, setAmount] = useState('');

  const [message, setMessage] = useState('');

  const handleWithdraw = async () => {
    if (!loggedInUser || !loggedInUser.uid) {
      setMessage('Please log in to withdraw.');
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
        if (parseFloat(amount) > userData.balance) {
          setMessage('Minimum balance insufficient.');
        } else {
          const newBalance = userData.balance - parseFloat(amount);
          await userRef.update({ balance: newBalance });
          setMessage(`Successfully withdrawn Rs. ${amount}`);
          setAmount('');
        }
      } else {
        setMessage('User data not found.');
      }
    } catch (error) {
      console.error('Withdraw error:', error);
      setMessage('An error occurred during withdrawal.');
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Money</h2>
      <div className="withdraw-form">
      <input
       type="number"
       className="custom-amount-input"
       placeholder="Amount"
       value={amount}
      onChange={(e) => setAmount(e.target.value)}
      />

<button className="custom-submit-button" onClick={handleWithdraw}>Submit</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default WithdrawPage;

