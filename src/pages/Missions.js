import React, { useEffect } from "react";
import classes from "./Missions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMissions,
  selectAllMissions,
  selectMissionError,
  selectMissionStatus,
} from "../store/slices/missionSlice";
import ActionsButton from "../components/ActionsButton";
const Missions = () => {
  // dispatch to dispatch redux actions
  const dispatch = useDispatch();

  // selecting the state, mission, loading and error if there is one
  const missions = useSelector(selectAllMissions);
  const missionsStatus = useSelector(selectMissionStatus);
  const missionError = useSelector(selectMissionError);
  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions.length]);

  const missionsList = missions.map((mission) => (
    <li key={mission.mission_id} className={classes.listItem}>
      {mission.mission_reserved ? (
        <span className={classes.reserved}>Active member</span>
      ) : null}
      <span>
        <strong>{mission.mission_name}</strong>
      </span>
      <span>{mission.description}</span>
      <ActionsButton data={mission} type="mission" />
    </li>
  ));
  let content;
  if (missionsStatus === "loading") {
    content = <p style={{ textAlign: "center" }}>Loading....</p>;
  } else if (missionsStatus === "failed") {
    content = <p style={{ textAlign: "center" }}>{missionError}</p>;
  } else {
    content = (
      <div className={classes.mission}>
        <h1 className={classes.title}>Our Missions</h1>
        <div className={classes.listHolder}>
          <ul className={classes.list}>{missionsList}</ul>
        </div>
      </div>
    );
  }
  return content;
};

export default Missions;
