const CardTextDB = (props) => {
  return (
    <>
      <div className="plant-image-div">
        <img src={props.plant.image} alt=""/>
      </div>
      <h4 className="plant-name">{props.plant.name}</h4>
      <p className="plant-scientificName">{props.plant.scientificName}</p>
      <p className="plant-sunlight">Sunlight: {props.plant.sunlight}</p>
      <p className="plant-water">Water: {props.plant.water}</p>

      <div className="plantBtnsDiv">
        <button onClick={(event) => {
          props.assignNotePlant(props.plant)
        }} className="note-btn">
          Notes
        </button>
      </div>
    </>
  )
}

export default CardTextDB
