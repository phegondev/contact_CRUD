import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useParams, useNavigate } from 'react-router-dom'

const AddEdit = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_no, setPhoneNo] = useState('')

    const navigate = useNavigate();
    const {id} = useParams();

    const handleSubmit = (e) =>{
        e.preventDefault()
        const dataToSend = {name, email, phone_no};
        if(name != "" && email != "" && phone_no != ""){
            if(!id){
                axios.post("http://localhost:7070/add", dataToSend).then(()=>{
                    // toast.success("Data have been saved")
                    setTimeout(()=>{navigate("/")},1000)
                }).catch(err=>console.error(err))
            }else{
                axios.put(`http://localhost:7070/update/${id}`, dataToSend).then(()=>{
                    setTimeout(()=>{navigate("/")},1000)
                }).catch(err=>console.log(err))
            }

        }
    }

    const getSingleContact =()=> {
        axios.get(`http://localhost:7070/getsingle/${id}`).then(result=>{
            setName(result.data[0].name)
            setEmail(result.data[0].email)
            setPhoneNo(result.data[0].phone_no)
        }).catch(err=>console.log(err));
    }
    function checkAndUpdateHeading(params) {
        if (id) {
            document.getElementById('heading').innerText = "Update the contact Below";
        }
    }

    useEffect(()=>{
        getSingleContact()
        checkAndUpdateHeading()
    }, [id]);

    return (
        <div>
            <h1 id='heading'>Add a contact Below</h1>
            <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='Name here' required />
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Email here' required />
            <input value={phone_no} onChange={e=>setPhoneNo(e.target.value)} type="number" placeholder='Contact here' required />
            <input onClick={e=>handleSubmit(e)} value={id ? 'Update' : 'Save'} className='save' />
            <Link to={'/'}>Go BACK</Link>
        </div>
    )
}

export default AddEdit