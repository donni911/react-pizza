import React, { useEffect, useState } from "react";

const Sort = () => {
  const [open, setOpen] = useState(false);
  const [activeSort, setActiveSort] = useState(0);

  const sortingBy = [
    {
      id: 0,
      name: "популярності",
    },
    {
      id: 1,
      name: "ціні",
    },
    {
      id: 2,
      name: "алфавіту",
    },
  ];

  const handleSort = (id: number) => {
    setActiveSort(id);
    setOpen(false);
  }; 

  return (
    <div className="sort">
      <button className="sort__label" onClick={() => setOpen(!open)}>
        <b>Сортувати по:</b>
        <span>{sortingBy[activeSort].name}</span>
      </button>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortingBy &&
              sortingBy.map((el) => (
                <li key={el.id} className={activeSort === el.id ? "active" : ""} onClick={() => handleSort(el.id)}>
                  {el.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
