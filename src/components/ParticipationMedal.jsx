import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ParticipationMedal = ({ puzzleCompleted }) => {
  if (!puzzleCompleted) return null;

  return (
    <div className="flex items-center mt-4">
      <img src="/assets/image/participacion.png" alt="Medalla de Participación" className="w-8 h-8 mr-2" />
      <span className="text-primary mb-2" data-tip data-for="participationTooltip">
        ¡Has participado en el puzzle!
      </span>
      <ReactTooltip id="participationTooltip" place="top" effect="solid">
        ¡Ahora estás más informado sobre el cuidado del agua!
      </ReactTooltip>
    </div>
  );
};

export default ParticipationMedal;