import React from "react";
import classes from "./ActionsButton.module.css";
import { useDispatch } from "react-redux";
import { joinMission, leaveMission } from "../store/slices/missionSlice";
import { reserveRocket, cancelReservation } from "../store/slices/rocketsSlice";

/**
 * @typedef {'mission' | 'rocket' | 'dragon'} ActionType
 */

/**
 * @param {Object} props - The component's props.
 * @param {Object} props.data - The data of a single object for missions, rockets, or dragons.
 * @param {ActionType} props.type - The type of action ('mission', 'rocket', or 'dragon').
 * @returns {JSX.Element} - The rendered component.
 */

const ActionsButton = ({ data, type }) => {
  let content;
  if (type === "mission") {
    // content logic here
    content = data.mission_reserved === true ? "Leave Mission" : "Join Mission";
  } else if (type === "dragon") {
    // content logic here
    content =
      data.dragon_reserved === true ? "Cancel Reservation" : "Reserve dragon";
  } else if (type === "rocket") {
    content =
      data.rocket_reserved === true ? "Cancel Reservation" : "Reserve Rocket";
  }
  const dispatch = useDispatch();
  const clickHandler = () => {
    if (data.mission_reserved) {
      dispatch(leaveMission(data.mission_id));
    } else dispatch(joinMission(data.mission_id));
  };
  const clickHandlerRockets = () => {
    if (data.rocket_reserved) {
      dispatch(cancelReservation(data.id));
    } else dispatch(reserveRocket(data.id));
  };

  return (
    <div>
      <button type="button" className={classes.button} onClick={clickHandler}>
        {content}
      </button>
      <button
        type="button"
        className={classes.button}
        onClick={clickHandlerRockets}
      >
        {content}
      </button>
    </div>
  );
};

export default ActionsButton;
