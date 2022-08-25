import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:7000/api/single/${id}`).then((resut) => {
            setUser(resut.data[0]);
        }).catch(err => console.error(err))
    }, [])
    return (
        <div>
            <h1><Link to={'/'}> Go Home</Link></h1>
            <div className="card">
                <p>USER DATA ARE</p>
                <strong>NAME: </strong> <span>{user.name}</span><br />
                <strong>EMAIL: </strong> <span>{user.email}</span><br />
                <strong>CONTACT: </strong> <span>{user.contact}</span>
            </div>
        </div>
    )
}

export default View