import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    firstName: '',
    lastName: ''
  });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { username, email, password, phoneNumber } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@xyz\.(com|in)$/;
    const phoneRegex = /^\d{10}$/;
    if (username && emailRegex.test(email) && password && phoneRegex.test(phoneNumber)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      // Call API to register user
      try {
        await axios.post('/api/signup', formData);
        history.push('/login');
      } catch (error) {
        console.error('Error during registration', error);
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <button type="submit">Next</button>
          </>
        ) : (
          <>
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;
