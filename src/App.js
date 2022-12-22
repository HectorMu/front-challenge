//Hooks
import useMoveables from "./hooks/useMoveables";
import useImages from "./hooks/useImages";

//Components
import { TopLoader } from "./components";
import { CustomMoveable } from "./components";

const App = () => {
  const { isLoading, getRandomImage } = useImages();

  const {
    selected,
    setSelected,
    addMoveable,
    moveableComponents,
    removeMoveable,
    updateMoveable,
  } = useMoveables();

  return (
    <main>
      <div className="actions">
        <button onClick={() => addMoveable(getRandomImage())}>
          Add new Moveable
        </button>
        <p>Info: Delete a Moveable by pressing the Delete Key</p>
        <p>Current moveables: {moveableComponents.length}</p>
      </div>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        <TopLoader isLoading={isLoading} />
        {moveableComponents.map((item, index) => (
          <CustomMoveable
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            removeMoveable={removeMoveable}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
