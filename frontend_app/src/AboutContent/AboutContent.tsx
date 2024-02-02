import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Customer {
    Id: number;
    name: string;
    address: string;
    customerid: number;
    // Add more fields as needed
    isEditing?: boolean; // New field for tracking editing state
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
    const [deleteMessage, setDeleteMessage] = useState('');
    const [editing, setEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };
    const handleShowForm = () => {
        setShowAddForm(true);
        setEditing(true);
    };
    const handleCancel = () => {
        setShowAddForm(false);
        setEditing(false);
        setNewCustomer({
            Id: 0,
            name: '',
            address: '',
            customerid: 0,
        });
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
                setDeleteMessage(response.data.message);

            })
            .catch((error) => console.error('Error deleting customer:', error));
    };

    const handleEditCustomer = (customer: Customer) => {
        setCustomers((prevCustomers) =>
            prevCustomers.map((c) =>
                c.Id === customer.Id ? { ...c, isEditing: !c.isEditing } : { ...c, isEditing: false }
            )
        );
        setNewCustomer({ ...customer, isEditing: true });
        setEditing(true);
    };

    const handleUpdateCustomer = (customer: Customer) => {
        if (!newCustomer.name || !newCustomer.address) {
            setErrorMessage('Name and Address are required.');
            return;
        } else {
            setErrorMessage('');
        }

        axios
            .put(`http://localhost:5000/api/updateCustomer/${newCustomer.Id}`, newCustomer)
            .then((response) => {
                console.log(response.data.message);
                setSuccessMessage(response.data.message);
                setCustomers((prevCustomers) =>
                    prevCustomers.map((c) =>
                        c.Id === customer.Id ? { ...c, isEditing: false } : c
                    )
                );
                setNewCustomer({
                    Id: 0,
                    name: '',
                    address: '',
                    customerid: 0,
                });
                setShowAddForm(false);
            })
            .catch((error) => console.error('Error updating customer:', error));
    };




    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}{successMessage && (setTimeout(() => setSuccessMessage(''), 5000) as any)}</div>}
            {deleteMessage && (
                <div style={{ color: 'red' }}>
                    {deleteMessage}
                    {deleteMessage && (setTimeout(() => setDeleteMessage(''), 5000) as any)}
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>

                Customer List <div style={{ color: 'green', marginLeft: '5px' }}>{customers.length}</div>
            </div>
            {/* Add customer form */}
            <div style={{ marginBottom: '10px' }}>
                <button onClick={handleShowForm}>Add Customer</button>
                {errorMessage && (
                    <div style={{ color: 'red' }}>
                        {errorMessage}
                        {errorMessage && (setTimeout(() => setErrorMessage(''), 5000) as any)}
                    </div>
                )}
                {showAddForm && (
                    <div>

                        <label>
                            Customer ID:
                            <input
                                type="number"
                                name="customerid"
                                //value={newCustomer.customerid}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                //value={newCustomer.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                //value={newCustomer.address}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={handleAddCustomer}>Submit</button>
                        {editing && <button onClick={handleCancel}>Cancel</button>}
                    </div>
                )}



            </div>

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
                    {/* {currentItems.map((customer) => (
                        <tr key={customer.Id}>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.Id}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.customerid}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.name}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.address}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}><button onClick={() => handleDeleteCustomer(customer.Id)}>Delete</button></td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>
                                <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                            </td>
                        </tr>
                    ))} */}
                    {currentItems.map((customer) => (
                        <tr key={customer.Id}>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.Id}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{customer.customerid}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>
                                {customer.isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCustomer.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    customer.name
                                )}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>
                                {customer.isEditing ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={newCustomer.address}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    customer.address
                                )}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>
                                <button onClick={() => handleDeleteCustomer(customer.Id)}>Delete</button>
                                {customer.isEditing ? (
                                    <>
                                        <button onClick={() => handleUpdateCustomer(customer)}>Update</button>
                                        <button onClick={() => handleEditCustomer(customer)}>Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            {/* <div style={{ marginTop: '20px' }}>
                <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'center' }}>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <li key={page} style={{ margin: '0 5px' }}>
                            <button onClick={() => handlePageChange(page)}>{page}</button>
                        </li>
                    ))}
                </ul>
            </div> */}
            <div style={{ marginTop: '20px' }}>
                <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'center' }}>
                    <li style={{ margin: '0 5px' }}>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            {"< Previous"}
                        </button>
                    </li>
                    <li style={{ margin: '0 5px' }}>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            {"Next >"}
                        </button>
                    </li>
                </ul>
            </div>



        </div>
    );
};

export default AboutContent

