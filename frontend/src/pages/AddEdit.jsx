import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddEdit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    function addUpdateHeading() {
        if (id) {
            document.getElementById('heading').innerText="Update the contact below";
        }
    }

    useEffect(() => {
        getSingleContactRecord();
        addUpdateHeading();
    }, [id]); //only run when we have the id value

    /**Get single contact date */
    function getSingleContactRecord() {
        axios.get(`http://localhost:7000/api/single/${id}`).then((result) => {
            setName(result.data[0].name);
            setEmail(result.data[0].email);
            setContact(result.data[0].contact);
        }).catch(err => toast.error(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { name, email, contact };
        const url = "http://localhost:7000/api/add";
        const url2 = `http://localhost:7000/api/update/${id}`;
        if (name !== '' && email !== '' && contact !== '') {
            if (id) {
                axios.put(url2, dataToSubmit)
                    .then(() => {
                        toast.success("Contact succesfully Updated");
                        setTimeout(() => navigate('/'), 1000);

                    }).catch(err => toast.error(err));
            } else {
                axios.post(url, dataToSubmit)
                    .then((result) => {
                        setName('');
                        setEmail('');
                        setContact('');
                        toast.success("Contact added succesfully");
                        setTimeout(() => navigate('/'), 1000);
                    }).catch(err => toast.error(err.response.data));

            }
        } else {
            toast.error("Please all fields must be filled");
        }
    }
    return (
        <div>
            <h1 id='heading'>Add a contact Below</h1>
            <input value={name || ""} onChange={e => { setName(e.target.value) }} type="text" placeholder='Name here' required />
            <input value={email || ""} onChange={e => { setEmail(e.target.value) }} type="email" placeholder='Email here' required />
            <input value={contact || ""} onChange={e => { setContact(e.target.value) }} type="number" placeholder='Contact here' required />
            <input value={id ? 'Update' : 'Save'} onClick={e => handleSubmit(e)} className='save' />
            <Link to='/'><p>Go back</p></Link>
        </div>
    )
}

export default AddEdit