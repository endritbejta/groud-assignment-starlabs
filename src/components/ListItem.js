import React from "react";
import classes from "./ListItem.module.css";
import ActionsButton from "./ActionsButton";

const ListItem = ({ data, index, type }) => {
  let content;
  if (type === "mission") {
    content = (
      <li className={classes.missionItem}>
        {data.mission_reserved ? (
          <p className="reserved">
            <span className="reserved-content">Active Member</span>
          </p>
        ) : null}
        <p className={classes.title}>
          <strong style={{ fontSize: "28px" }}>{`#${index + 1} `}</strong>
          <strong>{data.mission_name}</strong>
        </p>
        <span>{data.description}</span>
        <ActionsButton data={data} type="mission" />
      </li>
    );
  }
  if (type === "rocket") {
    content = (
      <li
        style={{
          background: `url(${data.flickr_images[0]}), rgba(0, 0, 0, 0.3)`,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
        key={data.id}
        className={classes.listItem}
      >
        <span className={classes["rocket-gradient"]}></span>
        {data.rocket_reserved ? (
          <p className="reserved">
            <span className="reserved-content">Reserved</span>
          </p>
        ) : null}
        <p className={classes.title}>
          <strong style={{ fontSize: "28px" }}>{`#${index + 1} `}</strong>
          <strong>{data.rocket_name}</strong>
        </p>
        <span className={classes.description}>{data.description}</span>
        <ActionsButton data={data} type={type} />
      </li>
    );
  }
  if (type === "dragon") {
    content = (
      <li
        style={{
          background: `url(${data.flickr_images[0]})`,
          backgroundSize: "cover",
          flex: 1,
        }}
        key={data.id}
        className={classes.listItem}
      >
        <span className={classes["dragon-gradient"]}></span>
        {data.dragon_reserved ? (
          <p className="reserved">
            <span className="reserved-content">Reserved</span>
          </p>
        ) : null}
        <p className={classes["dragon-title"]}>
          <strong style={{ fontSize: "28px" }}>{`#${index + 1} `}</strong>
          <strong>{data.name}</strong>
        </p>
        <p className={classes.description}>{data.description}</p>
        <ActionsButton data={data} type="dragon" />
      </li>
    );
  }

  return content;
};

export default ListItem;
