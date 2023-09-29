import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRockets,
  selectAllRockets,
  selectRocketError,
  selectRocketsStatus,
} from "../store/slices/rocketsSlice";
import classes from "./Rockets.module.css";
import ActionsButton from "../components/ActionsButton";

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
    <li key={rocket.id} className={classes.listItem}>
      {rocket.rocket_reserved ? (
        <span className={classes.reserved}>Reserved</span>
      ) : null}
      <p className={classes.title}>
        <strong style={{ fontSize: "28px" }}>{`#${index + 1} `}</strong>
        <strong>{rocket.rocket_name}</strong>
      </p>
      <span>{rocket.description}</span>
      <ActionsButton data={rocket} type="rocket" />
    </li>
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