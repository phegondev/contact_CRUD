import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'

const View = () => {

    const {id} = useParams()
    const [contact, setContact] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:7070/getsingle/${id}`).then(result=>{
            setContact(result.data[0])
            console.log(result.data)
        }).catch(err=>console.log("something is fishing"))
    })
  return (
    <div>
        <h1><Link to={'/'}>Go Home</Link></h1>
        <div className='card'>
                <p>USER CONTACT ARE:</p>
                <strong>NAME: </strong><span>{contact.name}</span><br/>
                <strong>EMAIL: </strong><span>{contact.email}</span><br/>
                <strong>PHONE NO: </strong><span>{contact.phone_no}</span><br/>
        </div>
    </div>
  )
}

export default View