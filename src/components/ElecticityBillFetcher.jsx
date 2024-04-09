import React, { useState, useEffect } from 'react';

const ElecticityBillFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const extractAccountInfo = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    console.log(doc);
  
    // Find elements by class within the "info" section
    const nameElement = doc.getElementById('#customername'); // Account holder's name
    const accountNumberElement = doc.querySelector('.info .data:nth-child(4)'); // Account number
    const billBalanceElement = doc.querySelector('.info .data:nth-child(5)'); 
  
    // Extract text content
    const accountHolderName = nameElement ? nameElement.textContent.trim() : 'N/A';
    const accountNumber = accountNumberElement ? accountNumberElement.textContent.trim() : 'N/A';
    const billBalance = billBalanceElement ? billBalanceElement.textContent.trim() : 'N/A';
  
    return {
      accountHolderName,
      accountNumber,
      billBalance
    };
  }

  const CEB_PAYMENT_URL = "https://cors-anywhere.herokuapp.com/https://payment.ceb.lk/mobile_pay/index/2794669125/1000.00/x/@/en/3"

  const fetchData = async () => {
    try {
      const response = await fetch(CEB_PAYMENT_URL);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const textData = await response.text();

      const accountInfo = extractAccountInfo(textData);
      setData(accountInfo);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Extract and display extracted information
  const { accountHolderName, accountNumber, billBalance } = data;
  return (
    <div>
      <p>Account Holder Name: {accountHolderName}</p>
      <p>Account Number: {accountNumber}</p>
      <p>Bill Balance: {billBalance}</p>
    </div>
  );
};

export default ElecticityBillFetcher;
