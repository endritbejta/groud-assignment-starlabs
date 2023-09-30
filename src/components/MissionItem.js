import React from "react";
import classes from "./MissionItem.module.css";
import ActionsButton from "./ActionsButton";
const MissionItem = ({ mission, index }) => {
  return (
    <li className={classes.missionItem}>
      {mission.mission_reserved ? (
        <p className="reserved">
          <span className="reserved-content">Active Member</span>
        </p>
      ) : null}
      <p className={classes.title}>
        <strong style={{ fontSize: "28px" }}>{`#${index + 1} `}</strong>
        <strong>{mission.mission_name}</strong>
      </p>
      <span>{mission.description}</span>
      <ActionsButton data={mission} type="mission" />
    </li>
  );
};

export default MissionItem;
