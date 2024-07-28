import { Draggable } from "@hello-pangea/dnd"
import PropTypes from 'prop-types';
import React from "react";

function Team({ id, index, school = { school: '' } }) {
  return (
    <div className=" max-h-32">
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <div
            id={id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex items-center border-2 border-gray-300 rounded-sm p-3"
          >
            <div className="team-thumb mr-2">
              <img
                src={`./logos/${school.school}.png`}
                style={{ width: "30px", height: "30px",  objectFit: "contain" }}
                alt={`${school.school} Thumb`}
              />
            </div>
            <p className="text-sm">{school.school}</p>
          </div>
        )}
      </Draggable>
    </div>
  );
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  school: PropTypes.shape({
    school: PropTypes.string.isRequired
  }).isRequired
};

export default Team;