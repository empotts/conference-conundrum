import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import fbsTeams from './fbsTeams.json';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const grid = 18;


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
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});



function App() {
  const [teams, setTeams] = useState([fbsTeams]);


  const onDragEnd = result => {
    const { source, destination } = result;
  
    // dropped outside the list
    if (!destination) {
      return;
    }
  
    // Convert droppableId back to a number
    const sourceIndex = Number(source.droppableId);
    const destinationIndex = Number(destination.droppableId);
  
    if (sourceIndex === destinationIndex) {
      // Ensure the list is defined
      if (teams[sourceIndex]) {
        const items = reorder(
          teams[sourceIndex],
          source.index,
          destination.index
        );
  
        let newState = [...teams];
        newState[sourceIndex] = items;
  
        setTeams(newState);
      }
    } else {
      // Ensure both lists are defined
      if (teams[sourceIndex] && teams[destinationIndex]) {
        const result = move(
          teams[sourceIndex],
          teams[destinationIndex],
          source,
          destination
        );
  
        setTeams(result);
      }
    }
  };



  return (
    <div className="App">
      <h1>FBS Teams</h1>
      <button
        type="button"
        onClick={() => {
          setTeams([...teams, []]);
        }}
      >
        Add new group
      </button>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {teams.map((teamList, i) => (
            <Droppable key={i} droppableId={`column-${i}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {teamList.map(({ school, logoPath, id }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            <div className="team-thumb">
                              <img src={'/' + logoPath} alt={`${school} Thumb`} />
                            </div>
                            <p>{school}</p>
                           
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
