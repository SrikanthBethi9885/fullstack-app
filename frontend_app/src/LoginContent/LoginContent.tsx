import React from 'react';
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

const LoginContent = () => {
    const handleLoginSubmit = (event: any) => {
        event.preventDefault();
        // Handle login form submission logic here
    };

    return (
        <div>
            <FormContainer>
                <FormTitle>Login</FormTitle>
                <Form onSubmit={handleLoginSubmit}>
                    <FormLabel>
                        Username:
                        <FormInput type="text" name="username" />
                    </FormLabel>
                    <FormLabel>
                        Password:
                        <FormInput type="password" name="password" />
                    </FormLabel>
                    <FormButton type="submit">Login</FormButton>
                </Form>
                <SignupLink>
                    Don't have an account? Click <Link to="/signup" >here</Link> to signup.
                </SignupLink>
            </FormContainer>
        </div>
    );
};

export default LoginContent;
