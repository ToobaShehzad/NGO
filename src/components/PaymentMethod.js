import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentMethod.css';

function PaymentMethod() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [jazzCashDetails, setJazzCashDetails] = useState({ accountNumber: '', accountTitle: '' });
  const [easyPaisaDetails, setEasyPaisaDetails] = useState({ accountNumber: '', accountTitle: '' });
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    accountTitle: '',
    branchName: '',
    iban: ''
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleJazzCashChange = (e) => {
    setJazzCashDetails({
      ...jazzCashDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleEasyPaisaChange = (e) => {
    setEasyPaisaDetails({
      ...easyPaisaDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBankChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (selectedOption === 'JazzCash') {
      if (!jazzCashDetails.accountNumber || !jazzCashDetails.accountTitle) {
        alert('Please fill in all JazzCash details.');
        return;
      }
      localStorage.setItem('jazzCashDetails', JSON.stringify(jazzCashDetails));
    } else if (selectedOption === 'EasyPaisa') {
      if (!easyPaisaDetails.accountNumber || !easyPaisaDetails.accountTitle) {
        alert('Please fill in all EasyPaisa details.');
        return;
      }
      localStorage.setItem('easyPaisaDetails', JSON.stringify(easyPaisaDetails));
    } else if (selectedOption === 'Bank Account') {
      const { bankName, accountNumber, accountTitle, branchName } = bankDetails;
      if (!bankName || !accountNumber || !accountTitle || !branchName) {
        alert('Please fill in all Bank Account details.');
        return;
      }
      localStorage.setItem('bankDetails', JSON.stringify(bankDetails));
    } else {
      alert('Please select a payment method.');
      return;
    }
    alert('Details saved successfully!');
  };

  return (
    <div className="payment-method-container">
      <div className="inner-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <h1>Payment & Tax</h1>
        <p>Change your Payment method and Tax details.</p>
        <div className="account-options">
          <div
            className={`account-option ${selectedOption === 'JazzCash' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('JazzCash')}
          >
            JazzCash
          </div>
          <div
            className={`account-option ${selectedOption === 'EasyPaisa' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('EasyPaisa')}
          >
            EasyPaisa
          </div>
          <div
            className={`account-option ${selectedOption === 'Bank Account' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('Bank Account')}
          >
            Bank Account
          </div>
        </div>

        {/* Conditionally rendered form fields for JazzCash */}
        {selectedOption === 'JazzCash' && (
          <div className="jazzcash-form">
            <div className="form-group">
              <label htmlFor="jazz-cash-account-number">JazzCash Account Number</label>
              <input
                id="jazz-cash-account-number"
                name="accountNumber"
                type="text"
                placeholder="Enter JazzCash Account Number"
                value={jazzCashDetails.accountNumber}
                onChange={handleJazzCashChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jazz-cash-account-title">JazzCash Account Title</label>
              <input
                id="jazz-cash-account-title"
                name="accountTitle"
                type="text"
                placeholder="Enter JazzCash Account Title"
                value={jazzCashDetails.accountTitle}
                onChange={handleJazzCashChange}
              />
            </div>
          </div>
        )}

        {/* Conditionally rendered form fields for EasyPaisa */}
        {selectedOption === 'EasyPaisa' && (
          <div className="easypaisa-form">
            <div className="form-group">
              <label htmlFor="easy-paisa-account-number">EasyPaisa Account Number</label>
              <input
                id="easy-paisa-account-number"
                name="accountNumber"
                type="text"
                placeholder="Enter EasyPaisa Account Number"
                value={easyPaisaDetails.accountNumber}
                onChange={handleEasyPaisaChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="easy-paisa-account-title">EasyPaisa Account Title</label>
              <input
                id="easy-paisa-account-title"
                name="accountTitle"
                type="text"
                placeholder="Enter EasyPaisa Account Title"
                value={easyPaisaDetails.accountTitle}
                onChange={handleEasyPaisaChange}
              />
            </div>
          </div>
        )}

        {/* Conditionally rendered form fields for Bank Account */}
        {selectedOption === 'Bank Account' && (
          <div className="bank-form">
            <div className="form-group">
              <label htmlFor="bank-name">Bank Name</label>
              <input
                id="bank-name"
                name="bankName"
                type="text"
                placeholder="Enter Bank Name"
                value={bankDetails.bankName}
                onChange={handleBankChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="account-number">Account Number</label>
              <input
                id="account-number"
                name="accountNumber"
                type="text"
                placeholder="Enter Account Number"
                value={bankDetails.accountNumber}
                onChange={handleBankChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="account-title">Account Title</label>
              <input
                id="account-title"
                name="accountTitle"
                type="text"
                placeholder="Enter Account Title"
                value={bankDetails.accountTitle}
                onChange={handleBankChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="branch-name">Branch Name</label>
              <input
                id="branch-name"
                name="branchName"
                type="text"
                placeholder="Enter Branch Name"
                value={bankDetails.branchName}
                onChange={handleBankChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="iban">IBAN</label>
              <input
                id="iban"
                name="iban"
                type="text"
                placeholder="Enter IBAN (if applicable)"
                value={bankDetails.iban}
                onChange={handleBankChange}
              />
            </div>
          </div>
        )}

        {/* Save button */}
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default PaymentMethod;
