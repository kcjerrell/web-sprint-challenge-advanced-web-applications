import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// import { editColorService, deleteColorService } from '../services/colorServices';
import fetchColorService from '../services/fetchColorService';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`/api/colors/${editColor.id}`, editColor)
      .then(res => fetchColors())
      .catch(err => console.log(err));
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/api/colors/${colorToDelete.id}`)
      .then(res => fetchColors())
      .catch(err => console.log(err));
  };

  const fetchColors = () => {
    fetchColorService()
      .then(colors => {
        console.log(colors);
        setColors(colors)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor} />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
