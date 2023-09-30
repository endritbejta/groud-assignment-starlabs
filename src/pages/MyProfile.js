import React, { useEffect, useState } from "react";
import classes from "./MyProfile.module.css";
import { useSelector } from "react-redux";
import { selectAllMissions } from "../store/slices/missionSlice";
import MissionItem from "../components/MissionItem";
import { selectAllDragons } from "../store/slices/dragonsSlice";
import { selectAllRockets } from "../store/slices/rocketsSlice";
import RocketsAndDragonsItem from "../components/RocketsAndDragonsItem";
const MyProfile = () => {
  // selecting the state from store
  const missionsData = useSelector(selectAllMissions);

  // new state for reserved content
  const [reservedMissions, setReservedMissions] = useState([]);

  useEffect(() => {
    // finding the reserved data
    const reservedMissions = missionsData.filter(
      (mission) => mission.mission_reserved
    );

    // updating the state
    setReservedMissions(reservedMissions);

    console.log(reservedMissions);
    // add your content data to dependencies
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
          <h3>Active missions</h3>
          <ul>{missionsContent}</ul>
        </div>
        <div className={classes["reserved-rockets"]}>
          <h3>Reserved rockets</h3>
          <ul>{/* rockets content here */}</ul>
        </div>
        <div className={classes["reserved-dragons"]}>
          <h3>Reserved dragons</h3>
          <ul>{/* rockets content here */}</ul>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
