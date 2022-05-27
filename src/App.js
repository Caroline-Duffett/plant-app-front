import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [newName, setNewName] = useState()
  const [newScientificName, setNewScientificName] = useState()
  const [newImage, setNewImage] = useState()
  const [newSunLight, setSunLight] = useState()



  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App;
