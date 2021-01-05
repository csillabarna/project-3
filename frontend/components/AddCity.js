
import React, { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'

const AddCity = (props) => {

  const [formData, updateFormData] = useState({
    name: '',
    country: '',
    bio: '',
    image: ''
  })

  const inputFields = ['name', 'country', 'bio', 'image']

  function handleChange(event) {
    const data = {
      ...formData,

      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.post('/api/cities', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(props.history.push('/cities'))
        props.history.push('/cities')
      })
  }

  return <main className="addCityMain">
      <Navbar />
    <h1>Add Your City</h1>
    <form onSubmit={handleSubmit}>
      <label>Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>Country
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label>

      <label>Bio
        <textarea
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          >
        </textarea>
      </label>

      <label>Image
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          />
      </label>
      <button>Submit</button>
    </form>
    <Footer/>
  </main>
}

export default AddCity