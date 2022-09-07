import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const Home = () => {
    /**Hook to store our data from DB */
    const [contacts, setContacts] = useState([]);

    /**Method to get all data usinmg Axios */
    const getAllData = async() =>{
        const response = await axios.get("http://localhost:7070/getall");
        setContacts(response.data)
    }

    /**Use effect hook to keep track of our component and update it */
    useEffect( ()=>{
        getAllData()
    }, []);

    /**delete contact function to delete a contact  */
    const deleteContact =(id)=>{
        if(window.confirm("Are you really sure you want to do this?")){
            axios.delete(`http://localhost:7070/delete/${id}`).then(()=>{
                // toast.success("Succesfully Deleted");
                setTimeout(()=>{
                    getAllData()
                }, 500)
            }).catch(err=>{console.log(err)})
        }
    }
  return (
    <div style={{marginTop: "150px"}}>
        <Link to={'add'}><button className='addItem'>Add Contact</button></Link>
        <table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index)=>{
                    return(<tr>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone_no}</td>
                        <td>
                            <Link to={`edit/${contact.id}`} > <button className='edit'>Edit</button></Link>
                            <Link  to={`view/${contact.id}`}> <button className='view'>View</button></Link>
                             <button className='delete' onClick={()=>deleteContact(contact.id)}>Delete</button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Home