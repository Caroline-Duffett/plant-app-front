const NewPlant = (props) => {
  return (
    <div className="new-plant-form-div">
      <h3 className="new-plant-text">Create New Plant</h3>
      <div className="new-plant-form-input-div">
        <form onSubmit={props.handleNewPlantFormSubmit}>
            Name: <input type="text" onChange={props.handleNewNameChange} required/><br/>
            <div className='test'>
            <div className="scientificName-div" id="new-scientific-name-div">
            Scientifc Name: </div><input type="text" onChange={props.handleNewScientificNameChange} className="edit-text" required/><br/>
            </div>
            Image: <input type="text" onChange={props.handleNewImageChange}/><br/>
            Sun Levels: <input type="text" onChange={props.handleNewSunLightChange} required/><br/>
            Water: <input type="text" onChange={props.handleNewWaterChange} required/><br/>
            <div className="create-plant-btn-div">
              <input className="submit-btn-new" type="submit" value="Create plant"/>
            </div>
        </form>
      </div>
    </div>
  )
}

export default NewPlant
