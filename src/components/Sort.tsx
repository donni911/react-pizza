import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SortItem, selectSort, setSort } from "../redux/slices/filterSlice";


export const sortList: SortItem[] = [
  {
    sortProperty: '-rating',
    name: "популярності (desc)",
  },
  {
    sortProperty: 'rating',
    name: "популярності (asc)",
  },
  {
    sortProperty: '-price',
    name: "ціні (desc)",
  },
  {
    sortProperty: 'price',
    name: "ціні (asc)",
  },
  {
    sortProperty: '-title',
    name: "алфавіту (desc)",
  },
  {
    sortProperty: 'title',
    name: "алфавіту (asc)",
  },
];

const Sort = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
  const sort = useSelector(selectSort);

  const sortRef = useRef<HTMLDivElement>(null);

  const handleSort = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <button className="sort__label" onClick={() => setOpen(!open)}>
        <b>Сортувати по:</b>
        <span>{sort.name}</span>
      </button>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList &&
              sortList.map((el, id) => (
                <li
                  key={id}
                  className={sort.sortProperty === el.sortProperty ? "active" : ""}
                  onClick={() => handleSort(el)}>
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
