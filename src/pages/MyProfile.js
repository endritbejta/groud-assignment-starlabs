import React, { useEffect, useState } from "react";
import classes from "./MyProfile.module.css";
import { useSelector } from "react-redux";
import { selectAllMissions } from "../store/slices/missionSlice";
import ListItem from "../components/ListItem";
import { selectAllRockets } from "../store/slices/rocketsSlice";

const MyProfile = () => {
  // selecting the state from store
  const missionsData = useSelector(selectAllMissions);
  const rocketsData = useSelector(selectAllRockets);

  // new state for reserved content
  const [reservedMissions, setReservedMissions] = useState([]);
  const [reservedRockets, setReserveRockets] = useState([]);

  useEffect(() => {
    // finding the reserved data
    const reservedMissions = missionsData.filter(
      (mission) => mission.mission_reserved
    );
    const reservedRockets = rocketsData.filter(
      (rocket) => rocket.rocket_reserved
    );
    // updating the state
    setReservedMissions(reservedMissions);
    setReserveRockets(reservedRockets);

    // add your content data to dependencies
  }, [missionsData, rocketsData]);

  const missionsContent = reservedMissions.map((mission, index) => (
    <ListItem
      data={mission}
      key={mission.mission_id}
      index={index}
      type="mission"
    />
  ));

  const rocketsContent = reservedRockets.map((rocket, index) => (
    <ListItem data={rocket} key={rocket.id} index={index} type="rocket" />
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
          <ul>{rocketsContent}</ul>
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
