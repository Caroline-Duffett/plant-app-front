// dependencies
import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

// components
import NewPlants from './components/NewPlant'
import CardText from './components/CardText'
import CardTextDB from './components/CardTextDB'
import EditForm from './components/EditForm'
import NotesForm from './components/NotesForm'

const App = () => {
  const [newName, setNewName] = useState()
  const [newScientificName, setNewScientificName] = useState()
  const [newImage, setNewImage] = useState('')
  const [newSunLight, setNewSunLight] = useState()
  const [newWater, setNewWater] = useState()
  const [newNote, setNewNote] = useState()
  const [plants, setPlants] = useState([])
  const [notes, setNotes] = useState([])
  const [seeEditForm, setSeeEditForm] = useState(false)
  const [seeNoteForm, setSeeNoteForm] = useState(false)
  const [editPlant, setEditPlant] = useState({})
  const [notePlant, setNotePlant] = useState([])
  const [query, setQuery] = useState("")
  // auth states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [showUserPlants, setShowUserPlants] = useState(true)
  const [showPlantDB, setShowPlantDB] = useState(false)

// plant edit, create, delete
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewScientificNameChange = (event) => {
    setNewScientificName(event.target.value)
  }

  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
  }

  const handleNewSunLightChange = (event) => {
    setNewSunLight(event.target.value)
  }

  const handleNewWaterChange = (event) => {
    setNewWater(event.target.value)
  }
  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const displayPlantsButton = () => {
    if (showUserPlants === true) {
      setShowUserPlants(false)
      setShowPlantDB(true)
    }
  }
  const displayPlantsDB = () => {
    if (showUserPlants === false) {
      setShowUserPlants(true)
      setShowPlantDB(false)
    }
  }

  const handleShowEditForm = (event) => {
    if (seeEditForm === false) {
      setSeeEditForm(true)
      setSeeNoteForm(false)
    } else {
      setSeeEditForm(false)
      setNewName()
      setNewScientificName()
      setNewImage()
      setNewSunLight()
      setNewWater()
      setEditPlant({})
    }
  }

  const handleShowNoteForm = (event) => {
    if (seeNoteForm === false) {
      setSeeNoteForm(true)
      setSeeEditForm(false)
    } else {
      setSeeNoteForm(false)
      setNewNote()
      setNotePlant({})
    }
  }

  useEffect(()=>{
    axios
      //.get('http://localhost:3000/plants')
      .get('https://shrouded-wave-73322.herokuapp.com/plants')
      .then((response)=>{
        setPlants(response.data)
        setNotes(response.data.notes)
      })
  },[])

  const handleDelete = (plantData)=>{
    axios
    //.delete(`http://localhost:3000/plants/${plantData._id}`)
    .delete(`https://shrouded-wave-73322.herokuapp.com/plants/${plantData._id}`)
      .then(()=>{
        axios
          // .get('http://localhost:3000/plants')
          .get(`https://shrouded-wave-73322.herokuapp.com/plants/`)
          .then((response)=>{
            setPlants(response.data)
          })
      })
  }

  const handleNoteDelete = (plantData, notesData)=>{
    axios
    //.delete(`http://localhost:3000/notes/${plantData._id}/${notesData}`)
    .delete(`https://shrouded-wave-73322.herokuapp.com/notes/${plantData._id}/${notesData}`)
      .then(()=>{
        axios
          // .get('http://localhost:3000/plants')
          .get(`https://shrouded-wave-73322.herokuapp.com/plants`)
          .then((response)=>{
            setPlants(response.data)
          })
      })
    console.log(plantData._id);
    console.log(notesData);
  }

  const handleNewPlantFormSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    axios.post(
    // 'http://localhost:3000/plants',
    'https://shrouded-wave-73322.herokuapp.com/plants',
     { //must match model
       name: newName,
       scientificName: newScientificName,
       image: newImage,
       sunlight: newSunLight,
       water: newWater,
       user: currentUser.username
     }
    ).then(()=>{
      axios
        //.get('http://localhost:3000/plants')
        .get('https://shrouded-wave-73322.herokuapp.com/plants')
        .then((response)=>{
          setPlants(response.data)
        })
    })
    setNewName()
    setNewScientificName()
    setNewImage()
    setNewSunLight()
    setNewWater()
  }

  const handleEditForm = (event, plantData) => {
    event.preventDefault();
    axios
      .put(
        //`http://localhost:3000/plants/${plantData._id}`,
        `https://shrouded-wave-73322.herokuapp.com/plants/${plantData._id}`,
        {
          name: newName,
          scientificName: newScientificName,
          image: newImage,
          sunlight: newSunLight,
          water: newWater,
        }
      )
    .then(()=>{
      axios
        //.get('http://localhost:3000/plants')
        .get('https://shrouded-wave-73322.herokuapp.com/plants')
        .then((response)=>{
          setPlants(response.data)
        })
    })
    setSeeEditForm(false)
    setNewName()
    setNewScientificName()
    setNewImage()
    setNewSunLight()
    setNewWater()
  }

  const handleNoteForm = (event, noteData) => {
    event.preventDefault();
    axios
      .post(
        //`http://localhost:3000/notes/${noteData._id}`,
        `https://shrouded-wave-73322.herokuapp.com/notes/${noteData._id}`,
        {
          note: newNote,
        }
      )
    .then(()=>{
      axios
        //.get('http://localhost:3000/plants')
        .get('https://shrouded-wave-73322.herokuapp.com/plants')
        .then((response)=>{
          setNotes(response.data)
          setPlants(response.data)
        })
    })
    // setSeeNoteForm(false)
    setNewNote()
    console.log(noteData._id);
  }

const assignEditPlant = (plant) => {
  setEditPlant(plant)
  handleShowEditForm()
}

const assignNotePlant = (plant) => {
  setNotePlant(plant)
  handleShowNoteForm()
}

// login, create user

const handleCreateUser = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    axios
      //.post('http://localhost:3000/createaccount', userObj)
      .post('https://shrouded-wave-73322.herokuapp.com/createaccount', userObj)
      .then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
      //console.log(response);
    })
    // console.log(username);
    // console.log(password);
    setUsername('')
    setPassword('')
  }

  const handleLogin = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    axios
      //.put('http://localhost:3000/login', userObj)
      .put('https://shrouded-wave-73322.herokuapp.com/login', userObj)
      .then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
        console.log(response);
      } else {
        console.log(response);
        setToggleError(true)
        setErrorMessage(response.data)
      }
    })
  }

  const handleLogout = () => {
    setCurrentUser({})
    handleToggleLogout()
  }

  const handleToggleForm = () => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

  return (
    <>
      <div>
        {toggleLogout ?
          <button onClick={handleLogout} className='logoutBtn'>Logout</button> :
          <div className='appFormDiv'>
            {toggleLogin ?
              //login form
              <div className="login-div">
                <h1 className="plants-text login-fields">Login</h1>
                <form onSubmit={handleLogin} className='inputForm'>
                  <input type='text' placeholder='username' className='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                  <input type='password' placeholder='password' className='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                  {toggleError ?
                    <h5 className='errorMsg'>{errorMessage}</h5>
                    :
                    null
                  }
                  <input type='submit' value='Login' className='submitBtn'/>
                </form>
              </div>
            :
            // new user form
            <div className="App" className='login-div'>
              <h1 className="plants-text login-fields">Create an Account</h1>
              <form onSubmit={handleCreateUser} className='inputForm'>
                <input type='text' placeholder='username' className='textInput' minLength="4" maxLength="15" unique="true" required onChange={(event)=> {setUsername(event.target.value)}}/>
                <input type='password' placeholder='password' className='textInput'  minLength="1" maxLength="16" required onChange={(event)=> {setPassword(event.target.value)}}/>
                {toggleError ?
                  <h5 class='errorMsg'>{errorMessage}</h5>
                  :
                  null
                }
                <input type='submit' value='Register' className='submitBtn'/>
              </form>
            </div>
            }
            <div className="acct-btn-div">
              <button onClick={handleToggleForm} className='account-btn'>{toggleLogin ? 'New Account' : 'Login'}</button>
            </div>
          </div>
        }
      </div>
      { currentUser.username ?
        <>
          <div className="toggle-btns-div">
            <button onClick={displayPlantsDB} className="toggle-show-btns">Show Your Plants</button>
            <button onClick={displayPlantsButton} className="toggle-show-btns">Show Database</button>
          </div>
        <h1 className="plants-text">Hello, {currentUser.username}!</h1>
        { showPlantDB ?
          <div className="search-bar-div">
          <input className="search-bar" placeholder="Search for Plant" onChange={event => setQuery(event.target.value)}/>
        </div>: null}
        { showUserPlants ?
          <>
            <NewPlants handleNewPlantFormSubmit={handleNewPlantFormSubmit} handleNewNameChange={handleNewNameChange} handleNewScientificNameChange={handleNewScientificNameChange} handleNewImageChange={handleNewImageChange} handleNewSunLightChange={handleNewSunLightChange} handleNewWaterChange={handleNewWaterChange}/>
            <h1 className="plants-text">Plants</h1>
            <div className="search-bar-div">
              <input className="search-bar" placeholder="Search for Plant" onChange={event => setQuery(event.target.value)}/>
            </div>
            <div className="plants-flexbox">
            {
              plants.filter(plant => {
                if (query === '') {
                  return plant
                } else if (plant.name.toLowerCase().includes(query.toLowerCase())) {
                  return plant
                }
              }).map((plant) => {
                return (
                  <>
                  { plant.user === currentUser.username ?
                  <div key={plant._id} className="plant-card">
                    <CardText plant={plant} handleDelete={handleDelete} assignEditPlant={assignEditPlant} assignNotePlant={assignNotePlant}/>
                      {plant._id === editPlant._id ?
                        seeEditForm ?
                        <EditForm plant={plant} handleEditForm={handleEditForm} handleNewNameChange={handleNewNameChange} handleNewScientificNameChange={handleNewScientificNameChange} handleNewImageChange={handleNewImageChange} handleNewSunLightChange={handleNewSunLightChange} handleNewWaterChange={handleNewWaterChange}/>
                      : null
                      : null }
                    {plant._id === notePlant._id ?
                      seeNoteForm ?
                      <NotesForm plant={plant} handleNoteDelete={handleNoteDelete} handleNoteForm={handleNoteForm} handleNewNoteChange={handleNewNoteChange}/>
                    : null
                    : null
                    }
                  </div>
                  : null}
                  </>
                )
              })
            }
            </div>
        </>
      : <div className="plants-flexbox">
      {
        plants.filter(plant => {
          if (query === '') {
            return plant
          } else if (plant.name.toLowerCase().includes(query.toLowerCase())) {
            return plant
          }
        }).map((plant) => {
          return (

            <div key={plant._id} className="plant-card">
              <CardTextDB plant={plant} handleDelete={handleDelete} assignEditPlant={assignEditPlant} assignNotePlant={assignNotePlant}/>

              {plant._id === notePlant._id ?
                seeNoteForm ?
                <NotesForm plant={plant} handleNoteDelete={handleNoteDelete} handleNoteForm={handleNoteForm} handleNewNoteChange={handleNewNoteChange}/>
              : null
              : null
              }
            </div>


          )
        })

      }
      </div>}
      </>
      :
      null }
    </>
  )
}

export default App;
