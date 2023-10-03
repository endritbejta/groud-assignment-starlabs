import React, { useEffect, useState,  } from "react";
import classes from "./MyProfile.module.css";
import { useSelector } from "react-redux";
import { selectAllMissions } from "../store/slices/missionSlice";
import ListItem from "../components/ListItem";
import { selectAllRockets } from "../store/slices/rocketsSlice";
import { selectAllDragons } from "../store/slices/dragonsSlice";

const MyProfile = () => {
  // selecting the state from store
  const missionsData = useSelector(selectAllMissions);
  const rocketsData = useSelector(selectAllRockets);
  const dragonsData = useSelector(selectAllDragons);

  // new state for reserved content
  const [reservedMissions, setReservedMissions] = useState([]);
  const [reservedRockets, setReserveRockets] = useState([]);
  const [reserveDragons, setReservedDragons] = useState([]);

  useEffect(() => {
    // finding the reserved data
    const reservedMissions = missionsData.filter(
      (mission) => mission.mission_reserved
    );
    const reservedRockets = rocketsData.filter(
      (rocket) => rocket.rocket_reserved
    );
    const reservedDragons = dragonsData.filter(
      (dragon) => dragon.dragon_reserved
    );
    // updating the state
    setReservedMissions(reservedMissions);
    setReserveRockets(reservedRockets);
    setReservedDragons(reservedDragons);

    // add your content data to dependencies
  }, [missionsData, rocketsData, dragonsData,]);

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

  const dragonsContent = reserveDragons.map((dragon, index) => (
    <ListItem data={dragon} key={dragon.id} index={index} type="dragon" />
  ) )



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
          <ul>{dragonsContent}</ul>
          
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
