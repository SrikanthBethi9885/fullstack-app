import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 10px;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 8px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
`;
const ShowHideButton = styled.button`
  position: absolute;
  right: 0;
  
  background: none;
  border: none;
  cursor: pointer;
`;

const SignupLink = styled.div`
  margin-top: 10px;
  text-align: center;
`;
const FormLabelWithButton = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; /* Add this to position the ShowHideButton relative to the container */
`;

const SignupContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const handleSignupSubmit = async (event: any) => {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User signed up successfully');
        setSuccessMessage('User signed up successfully');
        setFormData({
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
        // Add redirection logic or other actions on successful signup
      } else {
        console.error('Error signing up:', response.statusText);
        setSuccessMessage('');
      }
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      setSuccessMessage('');
    }
  };


  const togglePasswordVisibility = (field: string) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
    return (
      <div>
        <FormContainer>
          {successMessage && <h1>{successMessage}</h1>}
          <FormTitle>Sign Up</FormTitle>
          <Form onSubmit={handleSignupSubmit}>
            <FormLabelWithButton>
              Email:
              <FormInput type="text" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </FormLabelWithButton>
            <FormLabelWithButton>
              Username:
              <FormInput type="text" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </FormLabelWithButton>
            <FormLabelWithButton>
              Password:
              <FormInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <ShowHideButton
                type="button"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? 'Hide' : 'Show'}
              </ShowHideButton>
            </FormLabelWithButton>
            <FormLabelWithButton>
              Re-enter Password:
              <FormInput
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <ShowHideButton
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </ShowHideButton>
            </FormLabelWithButton>
            <FormButton type="submit">SignUp</FormButton>
          </Form>
          <SignupLink>
            Already have an account? Click <Link to="/login">here</Link> to login.
          </SignupLink>
        </FormContainer>
      </div>
    );
};

export default SignupContent;
