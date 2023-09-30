import React from "react";
import classes from "./ActionsButton.module.css";
import { useDispatch } from "react-redux";
import { joinMission, leaveMission } from "../store/slices/missionSlice";
import { reserveRocket, cancelReservation } from "../store/slices/rocketsSlice";
import { cancelDragon, reserveDragon } from "../store/slices/dragonsSlice";

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
    if (type === "mission") {
      if (data.mission_reserved) {
        dispatch(leaveMission(data.mission_id));
      } else dispatch(joinMission(data.mission_id));
    }
    if (type === "rocket") {
      if (data.rocket_reserved) {
        dispatch(cancelReservation(data.id));
      } else dispatch(reserveRocket(data.id));
    }
    if (type === "dragon") {
      if (data.dragon_reserved) {
        dispatch(cancelDragon(data.id));
      } else dispatch(reserveDragon(data.id));
    }
  };

  return (
    <button type="button" className={classes.button} onClick={clickHandler}>
      {content}
    </button>
  );
};

export default ActionsButton;
