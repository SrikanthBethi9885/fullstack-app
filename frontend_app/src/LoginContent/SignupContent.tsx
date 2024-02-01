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

const SignupContent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleSignupSubmit = (event: any) => {
        event.preventDefault();
        // Handle signup form submission logic here
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <FormContainer>
                <FormTitle>Sign Up</FormTitle>
                <Form onSubmit={handleSignupSubmit}>
                    <FormLabel>
                        Email:
                        <FormInput type="text" name="email" />
                    </FormLabel>
                    <FormLabel>
                        Username:
                        <FormInput type="text" name="username" />
                    </FormLabel>
                    <FormLabel>
                        Password:
                        <FormInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                        />
                        <ShowHideButton type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </ShowHideButton>
                    </FormLabel>
                    <FormLabel>
                        Re-enter Password:
                        <FormInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                        />
                        <ShowHideButton type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </ShowHideButton>
                        {/* <FormInput type="password" name="confirmPassword" /> */}
                    </FormLabel>
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
