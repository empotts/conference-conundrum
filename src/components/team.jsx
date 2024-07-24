import { Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';



function Team(props) {
    return (
      <div >
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
          {(provided) => (
            <div
              id={props.id}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="flex items-center border-2 border-gray-300 rounded-sm p-2 pr-3 mb-4"
            >
              <div className="team-thumb mr-2">
                <img
                  src={`./logos/${props.school.school}.png`}
                  style={{ width: "40px", height: "40px" }}
                  alt={`${props.school.school} Thumb`}
                />
              </div>
              <p className="text-sm">{props.school.school}</p>
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