## General Assembly, Software Engineering Immersive - project 3
 
# Dev.Map 🌎

Dev.Map is a travel sharing platform for developers.
Users can create an account to share experience in the city, add a new city if it is not in the database and also chat, network with local like minded people.



This was my first MERN stack (MongoDB, Express.js, React.js & Node.js) application.
My focus was to build the app’s reviewing function, whereby a user can post, edit and delete comments when authenticated.


Deployed on Heroku: https://dev-map-cs.herokuapp.com/
 

Quick peek of the working app ⬇️

![app working](./frontend/images/devmap.gif)


## Overview
We worked as a team of three on this project. Each day we had a team stand-up to discuss our next steps. We were working on features individually but also collaborated throughout the day to solve problems or debug each others' code.
 
We built a `MongoDB` database of cities, and served this data using `Express`. Used `JWT Authentication` to create accounts, login and update profiles. The front end is built with React where users can search for cities and connect with other users in the chosen city. They can delete, update, create comments on the city page and also add a new city to the database.
 
## Brief
- Build a full-stack application by making your own back- and  front end
- Use an Express API to serve your data from a Mongo database and/or build your own
- Build a complete product- multiple relationships and CRUD functionality for the models
- Build a professional frontend design with React
- Deploy online so it's publicly accessible
 
## Technologies Used

- JavaScript(ES6)
- <span style="color: orange;">M</span>ongoDB and Mongoose
-  <span style="color: orange;">E</span>xpress
-  <span style="color: orange;">R</span>eact
-  <span style="color: orange;">N</span>ode.js
- Bcrypt & JWT
- Insomnia 
- SCSS
- Git and GitHub
- Heroku
- Mongo Atlas 
 
 
 
## Approach Taken
The original idea was a dating app which has evolved throughout time and turned into this beautiful professional’s sharing platform for travel and coding enthusiasts.
 
First we whiteboard it out the basic structure and functions of what we wanted to implement and also the stretch goals.
We built the user and city schema together along with a couple of example data in our seed file along with the starter controller function.

## Method
 
**Login user**

To create the login functionality I used `jsonwebtoken`.
A JSON web token is a standardized, optionally validated and/or encrypted container format that is used to securely transfer information between two parties.

```
function loginUser(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '48h' }
      )
      res.status(202).send({ token, message: 'Login was successful!' })
    })

}
```

**Search** 

I also contributed with the search function. 
In order to store the relevant property values to the Search component, I used the `useState` and `useEffect` React hook and axios to fetch the data from the backend.
 
```
  const [cityData, updateCityData] = useState([])
  const [search, updateSearch] = useState('')

  useEffect(() => {
    axios.get('/api/cities')
      .then(axiosResp => {
        updateCityData(axiosResp.data)
      })
  }, [])

  function searchCity() {
    const filteredCities = cityData.filter(city => {
      const name = city.name.toLowerCase()
      const text = search.toLowerCase()
      return name.includes(text)
    })
    return filteredCities
  }
 ```

**Seed**

I was also responsible for creating the script for seeding our database.
I used two APIs
- the countries `REST API` to get some information about the cities
- the unsplash API for the images.

Unfortunately unsplash had a demo limit for requests - 50 requests per hour.
I decided to get all capital cities of the world so that rate-limit was a real problem to get through. I was using a `setInterval` function to get all the images within the boundaries of the API.
```
 .then((cityInfo) => {
    const promises = []

    for (let i = 0; i < cityInfo.length; i++) {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(cityInfo[i].name)}&client_id=${CLIENT_ID}`
      const timeoutInterval = 1000 * 60 * 1.5 * (i + 1)
      promises.push(new Promise((resolve) => {
        setTimeout(() => {
          axios.get(url)
            .then(({ data }) => {
              cityInfo[i].image = data.results[0] ? data.results[0].urls.full : ''
              console.log(`name: ${cityInfo[i].name}
                           image: ${cityInfo[i].image}`)
              resolve(cityInfo[i])
            })
        }, timeoutInterval)
      }))
    }
    return Promise.all(promises)
  })
```

 I exported the data, cleaned it, got the right format.
 I removed the function above and pasted my new list into the seeding file. This process saved our team a huge amount of time since the original seeding process would have lasted for 6 hours. 


## Challenges
Since this project was the first we worked on together via GitHub. It was challenging sometimes to sync our work and merge the files. By the end of the week we improved a lot and got comfortable working remotely and using Git.
 
## Future enhancements.

The "chat users in the city" button takes the user to another separate chat app, what initially we wanted to include in our project. Unfortunately we couldn't manage to merge it on time, so we connected via a link not to lose this functionality. 

If given more time, we would have liked to spend it to provide more information about the cities, even a map with the coffeeshops and nice meeting spots in the chosen city.
 
 
# Summary
 
As mentioned above, working with a remote team on this app provided an opportunity for me to get more familiar with Git and GitHub along with the other collaborative tools we used. This included everything from communicating about new packages and working through merge conflicts, organizing our tasks and timelines. 

  Overall, it was exciting to see how quickly the app took shape.
As the first full stack project I have worked on to completion, it was a very enlightening experience to see how different technologies in the MERN stack relate to form a complete application.
 



