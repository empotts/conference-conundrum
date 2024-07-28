import { Droppable } from "@hello-pangea/dnd"
import PropTypes from 'prop-types';
import Team from './Team';
import { useState, React } from 'react';

export default function Conference({ droppableKey, teams }) {

    const [conferenceName, setConferenceName] = useState(teams && teams.length > 0 ? teams[0].conference : '');


  const handleConferenceNameChange = (e) => {
    setConferenceName(e.target.value);
  };

  return (
    <div className="flex-row border border-gray-300">
 <input
        type="text"
        value={conferenceName}
        onChange={handleConferenceNameChange}
        className="mb-4 p-2 border border-gray-300"
      />
    <Droppable droppableId={`${droppableKey}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {teams.map((item, index) => (
            <Team
              id={item.id}
              school={item}
              index={index}
              key={item.id}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    </div>
  );
}

Conference.propTypes = {
  droppableKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      school: PropTypes.shape({
        school: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};