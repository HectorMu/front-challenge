import { useRef, useState } from "react";
import Moveable from "react-moveable";

const CustomMoveable = ({
  updateMoveable,
  removeMoveable,
  top,
  left,
  width,
  height,
  index,
  color,
  id,
  image,
  fit,
  setSelected,
  isSelected = false,
}) => {
  const ref = useRef();

  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    id,
  });

  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();

  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
      image,
      fit,
    });

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
    });
  };

  const onResizeEnd = async (e) => {
    console.log(e);
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    const { lastEvent } = e;
    const { drag } = lastEvent;
    const { beforeTranslate } = drag;

    const absoluteTop = top + beforeTranslate[1];
    const absoluteLeft = left + beforeTranslate[0];

    updateMoveable(
      id,
      {
        top: absoluteTop,
        left: absoluteLeft,
        width: newWidth,
        height: newHeight,
        color,
        image,
        fit,
      },
      true
    );
  };

  return (
    <>
      <div
        tabIndex={"0"}
        ref={ref}
        className="draggable"
        id={"component-" + id}
        style={{
          position: "absolute",
          top: top,
          resize: "both",
          left: left,
          width: width,
          height: height,
          background: color,
        }}
        onClick={() => setSelected(id)}
        onKeyDown={(e) => {
          if (e.key === "Delete") {
            removeMoveable(id);
          }
        }}
      >
        <img
          onClick={() => setSelected(id)}
          style={{
            resize: "both",
            width: "100%",
            height: "100%",
            objectFit: fit,
            pointerEvents: "none",
          }}
          src={image?.url}
          alt=""
        />
      </div>

      <Moveable
        target={isSelected && ref.current}
        resizable
        draggable
        snappable={true}
        onDrag={(e) => {
          updateMoveable(id, {
            top:
              e.top < 0
                ? 0
                : e.clientY + e.height >= parentBounds.height
                ? parentBounds.height - e.height
                : e.top,

            left:
              e.left < 0
                ? 0
                : e.clientX + e.width >= parentBounds.width
                ? parentBounds.width - e.width
                : e.left,

            width,
            height,
            image,
            color,
            fit,
          });
        }}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false}
        throttleResize={0}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};

export default CustomMoveable;
