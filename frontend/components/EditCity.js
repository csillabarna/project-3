import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'

const EditCity = (props) => {
  const cityName = props.match.params.cityName

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    bio: '',
    image: ''
  })

  useEffect(() => {
    axios.get(`/api/cities/${cityName}`)
      .then(axiosResp => {
        setFormData(axiosResp.data)
      })
  }, [])

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    setFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    axios.put(`/api/cities/${cityName}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/cities')
      })
  }

  console.log(formData)

  return <main className="editCityMain">
      <Navbar/>
    <h1>Edit Details about <strong>{cityName}</strong></h1>
    <div className="cityImage">
      <img src={formData.image} />
    </div>
    <form onSubmit={handleSubmit}>

      <label>Bio
        <textarea 
        onChange={handleChange} 
        value={formData.bio} 
        name="bio">
        </textarea>
      </label>
      <label>Image
        <input
          type="text"
          onChange={handleChange}
          value={formData.image}
          name="image"
        />
      </label>
      <button>Submit</button>

    </form>
    <Footer/>
  </main>
}

export default EditCity