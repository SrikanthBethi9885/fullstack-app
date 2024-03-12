// Logout.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutContent: React.FC<{ setAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic (clear token, etc.)
        setAuthenticated(false);

        // Redirect to the login page
        navigate('/login');
    };

    // You might want to add a confirmation message or other UI elements here

    // Call the logout function when the component mounts
    React.useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <div>
            {/* You can add a loading spinner or other UI elements here if needed */}
            Logging out...
        </div>
    );
};

export default LogoutContent
