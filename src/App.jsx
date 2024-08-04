import { React, useState } from "react";
import teams from "./grouped_teams.json";
import { DragDropContext } from "@hello-pangea/dnd";
import Conference from "./components/Conference";

const teams_array = Object.values(teams).map((conference) =>
  Object.values(conference)
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function App() {
  const [state, setState] = useState(teams_array);
  const [includeG5, setIncludeG5] = useState(true);

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  }

  const handleIncludeG5Change = (e) => {
    setIncludeG5(e.target.checked);
  };

  const filteredState = includeG5
    ? state
    : state.map((group) => group.filter((team) => team.type !== "G5"));

  return (
    <div className="flex-col">
      <div className="flex-row items-center">
        <button
          type="button"
          onClick={() => {
            setState([...state, []]);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        >
          Add Conference
        </button>

        <button
          type="button"
          onClick={() => {
            setState(teams_array);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
        >
          Reset
        </button>
        <label className=" mb-4 m-1">
          <input
            type="checkbox"
            checked={includeG5}
            onChange={handleIncludeG5Change}
            className="mr-2"
          />
          Include G5 Teams
        </label>
      </div>

      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {filteredState.map((el, ind) => (
            <Conference
              key={ind}
              droppableKey={ind}
              teams={el}
              includeG5={includeG5}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
