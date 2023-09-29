import React, { useEffect } from "react";
import classes from "./Dragons.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDragons,
  selectAllDragons,
  selectDragonError,
  selectDragonStatus,
} from "../store/slices/dragonsSlice";
import ActionsButton from "../components/ActionsButton";
const Dragons = () => {
  // dispatch to dispatch redux actions
  const dispatch = useDispatch();

  // selecting the state, dragons, loading and error if there is one
  const dragons = useSelector(selectAllDragons);
  const dragonsStatus = useSelector(selectDragonStatus);
  const dragonsError = useSelector(selectDragonError);
  useEffect(() => {
    if (dragons.length === 0) {
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons.length]);

  const dragonsList = dragons.map((dragon, index) => (
    <li key={dragon.id} className={classes.listItem}>
      {dragon.dragon_reserved ? (
        <p className="reserved">
          <span className="reserved-content">Reserved</span>
        </p>
      ) : null}
      <p className={classes.title}>
        <strong style={{ fontSize: "28px" }}>{`#${index + 1} `}</strong>
        <strong>{dragon.dragons_name}</strong>
      </p>
      <span>{dragon.description}</span>
      <ActionsButton data={dragon} type="dragon" />
    </li>
  ));
  let content;
  if (dragonsStatus === "loading") {
    content = <p style={{ textAlign: "center" }}>Loading....</p>;
  } else if (dragonsStatus === "failed") {
    content = <p style={{ textAlign: "center" }}>{dragonsError}</p>;
  } else {
    content = (
      <div className={classes.dragons}>
        <span></span>
        <h1 className={classes.title}>Our dragons</h1>
        <ul className={classes.listHolder}>{dragonsList}</ul>
      </div>
    );
  }
  return content;
};

export default Dragons;
