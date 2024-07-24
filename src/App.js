import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import fbsTeams from "./fbsTeams.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Team from "./components/team";

function App() {
  const [teams, setTeams] = useState(fbsTeams);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(teams);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTeams(items);
  };

  return (
    <div className="App">
      <h1>FBS Teams</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="teams">
          {(provided) => (
            <ul
              className="teams"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Team id="1" school="Alabama" logoPath="../logos/alabama.png" />
              {teams.map(({ school, logoPath, id }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        id={id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="team-thumb">
                          <img
                            src={logoPath ? "/" + logoPath : "/"}
                            alt={`${school} Thumb`}
                          />
                        </div>
                        <p>{school}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
