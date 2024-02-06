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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
`;

const SignupLink = styled.span`
  margin-top: 10px;
  text-align: center;
  display: block;
`;
const MessageContainer = styled.div<any>`
  margin-top: 10px;
  text-align: center;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const LoginContent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginMessage, setLoginMessage] = useState('');
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();

    // Assuming you have a login API endpoint, update the URL accordingly
    const loginEndpoint = 'http://localhost:5000/api/login'; // Change the URL

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('User logged in successfully');
        setLoginMessage(responseData.message);
        setFormData({
          username: '',
          password: ''
        })
        // Add redirection logic or other actions on successful login
      } else {
        console.error('Error logging in:', response.statusText);
        setLoginMessage(responseData.message);
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      setLoginMessage('Internal Server Error');
    }
  };

    return (
        <div>
        {loginMessage && (
          <MessageContainer success={loginMessage.includes('successful')}>
            {loginMessage}
          </MessageContainer>
        )}
            <FormContainer>
                <FormTitle>Login</FormTitle>
          <Form>
                    <FormLabel>
                        Username:
              <FormInput type="text" name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
                    </FormLabel>
                    <FormLabel>
                        Password:
              <FormInput type="password" name="password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </FormLabel>
            <FormButton onClick={handleLoginSubmit}>Login</FormButton>
                </Form>
                <SignupLink>
                    Don't have an account? Click <Link to="/signup" >here</Link> to signup.
                </SignupLink>
            </FormContainer>
        </div>
    );
};

export default LoginContent;
