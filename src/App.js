import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import fbsTeams from './fbsTeams.json';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';








function App() {


 





  return (
    <div className="App">

      <h1>FBS Teams</h1>
      <DragDropContext >
        <Droppable droppableId="teams">
          {(provided) => (
            <ul className="teams" {...provided.droppableProps} ref={provided.innerRef}>
              {fbsTeams.map(({ school, logoPath, conference }, index) => {
                return (
                  <Draggable key={school} draggableId={school} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="team-thumb">
                          <img src={'/' + logoPath} alt={`${school} Thumb`} />
                        </div>
                        <p>
                          {school}
                        </p>
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
