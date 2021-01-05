import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'

const UpdateUserProfile = (props) => {
  const userId = props.match.params.userId
  const [cityData, updateCityData] = useState([])
  const token = localStorage.getItem('token')

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    bio: '',
    availability: '',
    specialisms: [],
    languages: [],
    availableFor: '',
    location: '',
    image: ''
  })

  useEffect(() => {
    axios.get(`/api/user/${userId}`)
      .then(res => {
        updateFormData(res.data)
      })
  }, [])

  useEffect(() => {
    axios.get('/api/cities')
      .then(res => {
        updateCityData(res.data)
      })
  }, [])

  function handleData(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleLocation(event) {
    const data = {
      ...formData,
      location: `${event.target.value}`
    }
    updateFormData(data)
  }

  function handleAvailability(event) {
    const data = {
      ...formData,
      availability: `${event.target.value}`
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/api/user/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        props.history.push(`/user/${userId}`)
      })
  }

  function handleDelete() {
    axios.delete(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/')
      })
  }

  return <main className="updateUserMain">
      <Navbar/>
    <h1>Hi <strong>{formData.username}</strong></h1>
    <h2>Update your Profile</h2>
    <div className="userImage">
      <img src={formData.image} />
    </div>

    <form onSubmit={handleSubmit}>

      <label>city
        <select name="location" onChange={handleLocation}>
          {cityData.map((city, index) => {
            return <option selected={city.name === formData.location} key={index} value={city.name}>{city.name}</option>
          })}
        </select>
      </label>

      <label>availability
        <select name="location" onChange={handleAvailability}>
          <option>Immediate</option>
          <option>1 - 2 Weeks</option>
          <option>1 - 2 Months</option>
          <option>Busy for the Foreseeable</option>
        </select>
      </label>

      <label>specialisms
        <input
          type="text"
          onChange={handleData}
          value={formData.specialisms}
          name="specialisms"
        />
      </label>

      <label>languages
        <input
          type="text"
          onChange={handleData}
          value={formData.languages}
          name="languages"
        />
      </label>

      <label>email
        <input
          type="text"
          onChange={handleData}
          value={formData.email}
          name="email"
        />
      </label>

      <label>password
        <input
          type="password"
          onChange={handleData}
          value={formData.password}
          name="password"
        />
      </label>

      <label>confirm password
        <input
          type="password"
          onChange={handleData}
          value={formData.passwordConfirmation}
          name="passwordConfirmation"
        />
      </label>

      <label>bio
        <textarea
          onChange={handleData}
          value={formData.bio}
          name="bio"
        />
      </label>

      <label>I'd like to collaborate on:
        <textarea
          onChange={handleData}
          value={formData.availableFor}
          name="availableFor"
        />
      </label>

      <button>Update</button>
      <button onClick={handleDelete}>
      Delete Profile
    </button>
    </form>
    <Footer/>
  </main>
}

export default UpdateUserProfile