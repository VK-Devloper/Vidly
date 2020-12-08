import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onIteamSelect,
    selectedItem,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onIteamSelect(item)}
          key={item[valueProperty]}
          className={
            item[valueProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{cursor: "pointer"}}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
