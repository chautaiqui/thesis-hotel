import React from "react";
import "./css/roomitem.style.css";
export const RoomItem = ({ room, selected }) => {
  const { name, roomType } = room;
  const initStyle = {
    background: selected ? "orange" : "",
  };
  return (
    <div className="room-item" style={initStyle}>
      <img
        src="https://ads-cdn.fptplay.net/static/banner/2021/06/dd341095806370ce9e416137f6bc00f2_5340.png"
        alt="icon"
        className="room-item-icon"
      />
      <p>
        <b>Name:{name}</b>
      </p>
      <p>
        <b>Capacity:{roomType.capacity}</b>
      </p>
    </div>
  );
};
