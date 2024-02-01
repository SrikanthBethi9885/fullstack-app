import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Customer {
    Id: number;
    name: string;
    address: string;
    customerid: number
    // Add more fields as needed
}
const itemsPerPage = 5; // Number of items per page

const AboutContent: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newCustomer, setNewCustomer] = useState<Customer>({
        Id: 0, // Assume 0 for a new customer (this should be handled on the server)
        name: '',
        address: '',
        customerid: 0
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };
    const handleShowForm = () => {
        setShowAddForm(true);
    };



    const handleAddCustomer = () => {
        if (!newCustomer.name || !newCustomer.address) {
            setErrorMessage('Name and Address are required.');
            return; // Stop the function if validation fails
        } else {
            setErrorMessage('');
        }
        axios
            .post('http://localhost:5000/api/addCustomer', newCustomer)
            .then((response) => {
                // Assuming the server returns the newly added customer
                setCustomers([...customers, newCustomer]);
                setNewCustomer({
                    Id: newCustomer.Id,
                    name: newCustomer.name,
                    address: newCustomer.address,
                    customerid: newCustomer.customerid
                });
                setSuccessMessage(response.data.message);
                setShowAddForm(false);

            })
            .catch((error) => console.error('Error adding customer:', error));
    };

    // Calculate the index of the first and last item to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(customers.length / itemsPerPage);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        axios
            .get<Customer[]>('http://localhost:5000/api/customers')
            .then((response) => setCustomers(response.data))
            .catch((error) => console.error('Error fetching customers:', error));
    }, []);
    const handleDeleteCustomer = (Id: number) => {
        axios
            .delete(`http://localhost:5000/api/deleteCustomer/${Id}`)
            .then((response) => {
                // Assuming the server returns a success message
                console.log(response.data.message);
                // Update the customers state to reflect the deletion
                setCustomers(customers.filter((customer) => customer.Id !== Id));
                setDeleteMessage(response.data.message)
            })
            .catch((error) => console.error('Error deleting customer:', error));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {deleteMessage && <div style={{ color: 'red' }}>{deleteMessage}</div>}
            <h2>Customer List</h2>
            <table style={{ width: '50%', margin: '0 auto', border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid black' }}> Id</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Customer Id</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Address</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((customer) => (
                        <tr key={customer.Id}>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.Id}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.customerid}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.name}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.address}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}><button onClick={() => handleDeleteCustomer(customer.Id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div style={{ marginTop: '20px' }}>
                <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'center' }}>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <li key={page} style={{ margin: '0 5px' }}>
                            <button onClick={() => handlePageChange(page)}>{page}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Add customer form */}
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleShowForm}>Add Customer</button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {showAddForm && (
                    <div>
                        <label>
                            Customer ID:
                            <input type="number" name="Id" value={newCustomer.customerid} onChange={handleInputChange} />
                        </label>
                        <label>
                            Name:
                            <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="address" value={newCustomer.address} onChange={handleInputChange} />
                        </label>
                        <button onClick={handleAddCustomer}>Submit</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AboutContent

