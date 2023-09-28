import React, { useEffect } from "react";
import classes from "./Missions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMissions,
  joinMission,
  selectAllMissions,
  selectMissionsError,
  selectMissionsLoading,
} from "../store/slices/missionSlice";
const Missions = () => {
  // dispatch to dispatch redux actions
  const dispatch = useDispatch();

  // selecting the state, mission, loading and error if there is one
  const missions = useSelector(selectAllMissions);
  const missionsLoading = useSelector(selectMissionsLoading);
  const missionsError = useSelector(selectMissionsError);

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, []);

  const clickHandler = (id) => {
    dispatch(joinMission(id));
  };

  const missionsList = missions.map((mission) => (
    <li
      onClick={() => clickHandler(mission.mission_id)}
      key={mission.mission_id}
      className={classes.listItem}
    >
      <span>
        <strong>{mission.mission_name}</strong>
      </span>
      <span>{mission.description}</span>
    </li>
  ));
  return (
    <div className={classes.mission}>
      <h1 className={classes.title}>Our Missions</h1>
      <div className={classes.listHolder}>
        <ul className={classes.list}>{missionsList}</ul>
      </div>
    </div>
  );
};

export default Missions;
