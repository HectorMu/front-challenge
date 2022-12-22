import { useState } from "react";

//Hooks that handle all the Moveables state, by adding, removing, updating, and handle moveable selected
const useMoveables = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  const addMoveable = (randomImage) => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    const FITS = ["cover", "fit", "contain", "fill", "none", "scale-down"];

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        image: randomImage,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        fit: FITS[Math.floor(Math.random() * FITS.length)],
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const removeMoveable = (id) => {
    const updatedMoveables = moveableComponents.filter(
      (moveable) => moveable.id !== id
    );
    setMoveableComponents(updatedMoveables);
  };

  return {
    selected,
    setSelected,
    moveableComponents,
    addMoveable,
    removeMoveable,
    updateMoveable,
  };
};

export default useMoveables;
