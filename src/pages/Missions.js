import React, { useEffect } from "react";
import classes from "./Missions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMissions,
  selectAllMissions,
  selectMissionError,
  selectMissionStatus,
} from "../store/slices/missionSlice";
import ListItem from "../components/ListItem";
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

  const missionsList = missions.map((mission, index) => (
    <ListItem
      data={mission}
      key={mission.mission_id}
      index={index}
      type="mission"
    />
  ));
  let content;
  if (missionsStatus === "loading") {
    content = <p style={{ textAlign: "center" }}>Loading....</p>;
  } else if (missionsStatus === "failed") {
    content = <p style={{ textAlign: "center" }}>{missionError}</p>;
  } else {
    content = (
      <div className={classes.mission}>
        <span></span>
        <h1 className={classes.title}>Our Missions</h1>
        <ul className={classes.listHolder}>{missionsList}</ul>
      </div>
    );
  }
  return content;
};

export default Missions;
