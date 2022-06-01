const NotesForm = (props) => {
  return (
    <div className="note-plant-form-div" key={props.plant._id}>
    <p className="notes-label">Notes:</p>
    {
      props.plant.notes.map((note) => {
      return (
        <>
          <table key={note._id} className="note-div">
            <tbody>
              <tr>
                <td className="note-box">{note.note}</td>
                <td className="x-box">
                  <i onClick={(event) => {
                    props.handleNoteDelete(props.plant, note._id)
                  }}>❌</i>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )
    })
    }
      <h3 className="edit-plant-text">Add Note to: {props.plant.name}</h3>
      <form onSubmit={(event) => props.handleNoteForm(event, props.plant)}>
          Note: <input type="text" onChange={props.handleNewNoteChange} className="note-text"/><br/>
          <div className="editBtnDiv">
            <input className="submit-btns" type="submit" value="Submit"/>
          </div>
      </form>
    </div>
  )
}

export default NotesForm
