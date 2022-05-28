import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [newName, setNewName] = useState()
  const [newScientificName, setNewScientificName] = useState()
  const [newImage, setNewImage] = useState()
  const [newSunLight, setNewSunLight] = useState()
  const [newWater, setNewWater] = useState()
  const [plants, setPlants] = useState([])
  const [seeEditForm, setSeeEditForm] = useState(false)
  const [editPlant, setEditPlant] = useState({})

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

  const handleShowEditForm = (event) => {
    if (seeEditForm === false) {
      setSeeEditForm(true)
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

  useEffect(()=>{
    axios
      .get('http://localhost:3000/plants')
      .then((response)=>{
        setPlants(response.data)
      })
  },[])

  const handleDelete = (plantData)=>{
    axios
    .delete(`http://localhost:3000/plants/${plantData._id}`)
      .then(()=>{
        axios
          .get('http://localhost:3000/plants')
          .then((response)=>{
            setPlants(response.data)
          })
      })
  }


  const handleNewPlantFormSubmit = (event) => {
    event.preventDefault()
    axios.post(
     'http://localhost:3000/plants',
     { //must match model
       name: newName,
       scientificName: newScientificName,
       image: newImage,
       sunlight: newSunLight,
       water: newWater,
     }
    ).then(()=>{
      axios
        .get('http://localhost:3000/plants')
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
        `http://localhost:3000/plants/${plantData._id}`,
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
        .get('http://localhost:3000/plants')
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

const assignEditPlant = (plant) => {
  setEditPlant(plant)
  handleShowEditForm()
}



  return (
    <>
      <div className="new-plant-form-div">
        <h3 className="new-plant-text">Create New Plant</h3>
        <div className="new-plant-form-input-div">
          <form onSubmit={handleNewPlantFormSubmit}>
              Name: <input type="text" onChange={handleNewNameChange} required/><br/>
              Scientific Name: <input type="text" onChange={handleNewScientificNameChange} required/><br/>
              Image: <input type="text" onChange={handleNewImageChange} required/><br/>
              Sun Levels: <input type="text" onChange={handleNewSunLightChange} required/><br/>
              Water: <input type="text" onChange={handleNewWaterChange} required/><br/>
              <div className="create-plant-btn-div">
                <input type="submit" value="Create plant"/>
              </div>
          </form>
        </div>
      </div>
      <h1 className="plants-text">Plants</h1>
      <div className="plants-flexbox">
      {
        plants.map((plant) => {
          return (
              <div key={plant._id} className="plant-card">
                <div className="plant-image-div">
                  <img src={plant.image} alt=""/>
                </div>
                <h4 className="plant-name">{plant.name}</h4>
                <p className="plant-scientificName">Scientific Name: {plant.scientificName}</p>
                <p className="plant-sunlight">Sunlight: {plant.sunlight}</p>
                <p className="plant-water">Water: {plant.water}</p>
                <div className="plantBtnsDiv">
                  <button
                    onClick={(event) => {
                      handleDelete(plant)
                    }} className="delete-btn">
                    Delete
                  </button>
                  <button onClick={(event) => {
                    assignEditPlant(plant)
                  }} className="edit-Btn">
                    Edit
                  </button>
                </div>
                {plant._id === editPlant._id ?
                  seeEditForm ?
                  <div className="edit-plant-form-div" key={plant._id}>
                    <h3 className="edit-plant-text">Edit {plant.name}</h3>
                    <form onSubmit={(event) => handleEditForm(event, plant)}>
                        Name: <input type="text" defaultValue={plant.name} onChange={handleNewNameChange} className="edit-text"/><br/>
                        <div className='test'>
                        <div className="scientificName-div">
                        Scientifc Name: </div><input type="text" defaultValue={plant.scientificName} onChange={handleNewScientificNameChange} className="edit-text"/><br/>
                        </div>
                        Image: <input type="text" defaultValue={plant.image} onChange={handleNewImageChange} className="edit-text"/><br/>
                        Sunlight: <input type="text" defaultValue={plant.sunlight} onChange={handleNewSunLightChange}className="edit-text"/><br/>
                        Water: <input type="text" defaultValue={plant.water} onChange={handleNewWaterChange}className="edit-text"/><br/>
                        <div className="editBtnDiv">
                          <input type="submit" value="Submit"/>
                        </div>
                    </form>
                  </div>
              : null
              : null }
              </div>
          )
      })
      }
      </div>
    </>
  )
}

export default App;




// <div className="new-plant-form-div">
//   <h3 className="new-plant-text">Create New Plant</h3>
//   <div className="new-plant-form-input-div">
//     <form onSubmit={handleNewPlantFormSubmit}>
//         Name: <input type="text" onChange={handleNewNameChange} required/><br/>
//         Scientific Name: <input type="text" onChange={handleNewScientificNameChange} required/><br/>
//         Image: <input type="text" onChange={handleNewImageChange} required/><br/>
//         Sun Levels: <input type="text" onChange={handleNewSunLightChange} required/><br/>
//         Water: <input type="text" onChange={handleNewWaterChange} required/><br/>
//         <div className="create-plant-btn-div">
//           <input type="submit" value="Create plant"/>
//         </div>
//     </form>
//   </div>
// </div>
// <h1 className="plants-text">Plants</h1>
// <div className="plants-flexbox">
// {
//   plants.map((plant) => {
//     return (
//       <>
//         <div key={plant._id} className="plant-card">
//           <div className="plant-image-div">
//             <img src={plant.image} alt=""/>
//           </div>
//           <h4 className="plant-name">{plant.name}</h4>
//           <p className="plant-scientificName">Scientific Name: {plant.scientificName}</p>
//           <p className="plant-sunlight">Sunlight: {plant.sunlight}</p>
//           <p className="plant-water">Water: {plant.water}</p>
//           <div className="plantBtnsDiv">
//             <button
//               onClick={(event) => {
//                 handleDelete(plant)
//               }} className="delete-btn">
//               Delete
//             </button>
//             <button onClick={(event) => {
//               handleShowEditForm(plant)
//             }} className="edit-Btn">
//               Edit
//             </button>
//           </div>
        // {(editForm) ?
        //     <div className="edit-plant-form-div" key={plant._id}>
        //       <h3 className="edit-plant-text">Edit {plant.name}</h3>
        //       <form onSubmit={(event) => handleEditForm(event, plant)}>
        //           Name: <input type="text" defaultValue={plant.name} onChange={handleNewNameChange} className="edit-text" required/><br/>
        //           Scientifc Name: <input type="text" defaultValue={plant.release} onChange={handleNewScientificNameChange} className="edit-text" required/><br/>
        //           Image: <input type="text" defaultValue={plant.image} onChange={handleNewImageChange} className="edit-text" required/><br/>
        //           Sunlight: <input type="text" defaultValue={plant.sunlight} onChange={handleNewSunLightChange}className="edit-text" required/><br/>
        //           Water: <input type="text" defaultValue={plant.water} onChange={handleNewWaterChange}className="edit-text" required/><br/>
        //           <input type="submit" value="Submit"/>
        //       </form>
        //     </div>
        // : null}
//         </div>
//       </>
//     )
//   })
// }
// </div>
