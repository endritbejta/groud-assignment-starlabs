import React, { useEffect, useState } from "react";
import classes from "./MyProfile.module.css";
import { useSelector } from "react-redux";
import { selectAllMissions } from "../store/slices/missionSlice";
import MissionItem from "../components/MissionItem";
const MyProfile = () => {
  const missionsData = useSelector(selectAllMissions);
  console.log("missions data: ", missionsData);
  const [reservedMissions, setReservedMissions] = useState([]);
  useEffect(() => {
    const reservedMissions = missionsData.filter(
      (mission) => mission.mission_reserved
    );
    setReservedMissions(reservedMissions);
    console.log(reservedMissions);
  }, [missionsData]);

  const missionsContent = reservedMissions.map((mission, index) => (
    <MissionItem key={mission.mission_id} mission={mission} index={index} />
  ));
  return (
    <div className={classes["my-profile"]}>
      <h3 className={classes.title}>
        Your active missions and reserved dragons/rockets.
      </h3>
      <div className={classes["lists-container"]}>
        <div className={classes["reserved-missions"]}>
          <ul>{missionsContent}</ul>
        </div>
        <div className={classes["reserved-rockets"]}>2</div>
        <div className={classes["reserved-dragons"]}>3</div>
      </div>
    </div>
  );
};

export default MyProfile;
