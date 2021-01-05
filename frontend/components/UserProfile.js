import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'

const UserProfile = (props) => {
  const userId = props.match.params.userId
  const [user, updateUser] = useState({})

  useEffect(() => {
    axios.get(`/api/user/${userId}`)
      .then(resp => {
        // console.log(resp.data)
        updateUser(resp.data)
      })
  }, [])

  if (!user._id) {
    return <div>
      <h2>
        Loading ...
      </h2>
    </div>
  }

  return <main className="userProfileMain">
      <Navbar/>

    <section className="userData">
      <h1>{user.username}</h1>
      <div className="userImageContainer">
        <img src={user.image} />
      </div>
      <section className="topUserSection">
        <div className="userSectionInner">
          <h2>Location</h2>
          <h3>{user.location}</h3>
        </div>
        <div className="userSectionInner">
          <h2>Availability</h2>
          <h3>{user.availability}</h3>
        </div>
        <div className="userSectionInner">
          <h2>Specialisms</h2>
          <h3>{user.specialisms + " "}</h3>
        </div>
      </section>

      <section className="languagesSection">
        <h2>Languages/Skills</h2>
        <div className="languagesInner">
          {user.languages.map((language, index) => {
            return <div key={index}>
              <button>
                {language}
              </button>
            </div>
          })}
        </div>
      </section>

      <section className="bioSection">
        <h2>Bio</h2>
        <h3>{user.bio}</h3>
      </section>

      <section className="interestsSection">
        <h2>{user.username} would like to collaborate on:</h2>
        <h3>{user.availableFor}</h3>
      </section>
    </section>
    <Footer/>
  </main>
}

export default UserProfile