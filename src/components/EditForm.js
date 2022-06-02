const EditForm = (props) => {
  return (
    <div className="edit-plant-form-div" key={props.plant._id}>
      <h3 className="edit-plant-text">Edit {props.plant.name}</h3>
      <form onSubmit={(event) => props.handleEditForm(event, props.plant)}>
          Name: <input type="text" defaultValue={props.plant.name} onChange={props.handleNewNameChange} className="edit-text"/><br/>
          <div className='test'>
          <div className="scientificName-div">
          Scientifc Name: </div><input type="text" defaultValue={props.plant.scientificName} onChange={props.handleNewScientificNameChange} className="edit-text"/><br/>
          </div>
          Image: <input type="url" defaultValue={props.plant.image} onChange={props.handleNewImageChange} className="edit-text"/><br/>
          Sunlight: <input type="text" defaultValue={props.plant.sunlight} onChange={props.handleNewSunLightChange}className="edit-text"/><br/>
          Water: <input type="text" defaultValue={props.plant.water} onChange={props.handleNewWaterChange}className="edit-text"/><br/>
          <div className="editBtnDiv">
            <input className="submit-btns" type="submit" value="Submit"/>
          </div>
      </form>
    </div>
  )
}

export default EditForm
