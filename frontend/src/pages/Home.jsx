import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-toastify';
import axios from 'axios'

function Home() {
  //**Variable hoot to store and load data */
  const [datas, setData] = useState([]);

  /**function to fetch data from api */
  const loadData = async () => {
    const response = await axios.get("http://localhost:7000/api/get");
    setData(response.data);
  }
  /** hook to fetch data when state in changed */
  useEffect(() => {
    loadData();
  }, []);

  const delectContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact ?")) {
      axios.delete(`http://localhost:7000/api/remove/${id}`)
      .then(()=>{toast.success("Contact Deleted Succesfully");setTimeout(()=>{loadData()},500)})
      .catch((err)=>{toast.error(err); console.error(err)});
    }
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to={`/addContact`}><button className='addItem' > Add Item</button></Link>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item, index) => {
            return (<tr key={item.id}>
              <th scope='row'>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Link to={`update/${item.id}`}><button className='edit'>Edit</button></Link>
                <button onClick={() => delectContact(item.id)} className='delete'>Delete</button>
                <Link to={`view/${item.id}`}><button className='view'>View</button></Link>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home