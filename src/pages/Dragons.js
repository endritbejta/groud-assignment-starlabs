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
    <li
      style={{
        background: `url(${dragon.flickr_images[0]})`,
        backgroundSize: "cover",
      }}
      key={dragon.id}
      className={classes.listItem}
    >
      <span className={classes.gradient}></span>
      {dragon.dragon_reserved ? (
        <p className="reserved">
          <span className="reserved-content">Reserved</span>
        </p>
      ) : null}
      <p className={classes["dragon-title"]}>
        <strong>{dragon.name}</strong>
      </p>
      <p className={classes.description}>{dragon.description}</p>
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
        <h1 className={classes.title}>Our dragons</h1>
        <ul className={classes.listHolder}>{dragonsList}</ul>
      </div>
    );
  }
  return content;
};

export default Dragons;
