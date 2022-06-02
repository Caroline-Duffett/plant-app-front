// dependencies
import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

// components
import NewPlants from './components/NewPlant'
import CardText from './components/CardText'
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
          //.get('http://localhost:3000/plants')
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
          //.get('http://localhost:3000/plants')
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
     //'http://localhost:3000/plants',
    'https://shrouded-wave-73322.herokuapp.com/plants',
     { //must match model
       name: newName,
       scientificName: newScientificName,
       image: newImage,
       sunlight: newSunLight,
       water: newWater,
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
    setNewImage('')
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

  return (
    <>
      <NewPlants handleNewPlantFormSubmit={handleNewPlantFormSubmit} handleNewNameChange={handleNewNameChange} handleNewScientificNameChange={handleNewScientificNameChange} handleNewImageChange={handleNewImageChange} handleNewSunLightChange={handleNewSunLightChange} handleNewWaterChange={handleNewWaterChange}/>
      <h1 className="plants-text">Plants</h1>
      <div className="plants-flexbox">
      {
        plants.map((plant) => {
          return (
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
          )
        })
      }
      </div>
    </>
  )
}

export default App;
