import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRockets,
  selectAllRockets,
  selectRocketError,
  selectRocketsStatus,
} from "../store/slices/rocketsSlice";
import classes from "./Rockets.module.css";
import ListItem from "../components/ListItem";

const Rockets = () => {
  // dispatch to dispatch redux actions
  const dispatch = useDispatch();

  // selecting the state, mission, loading and error if there is one
  const rockets = useSelector(selectAllRockets);
  const rocketsStatus = useSelector(selectRocketsStatus);
  const rocketError = useSelector(selectRocketError);
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    }
  }, [dispatch, rockets.length]);

  const rocketsList = rockets.map((rocket, index) => (
    <ListItem data={rocket} key={rocket.id} index={index} type="rocket" />
  ));
  let content;
  if (rocketsStatus === "loading") {
    content = <p style={{ textAlign: "center" }}>Loading...</p>;
  } else if (rocketsStatus === "failed") {
    content = <p style={{ textAlign: "center" }}>{rocketError}</p>;
  } else {
    content = (
      <div className={classes.rocket}>
        <span></span>
        <h1 className={classes.title}>Rockets</h1>
        <ul className={classes.listHolder}>{rocketsList}</ul>
      </div>
    );
  }
  return content;
};

export default Rockets;
