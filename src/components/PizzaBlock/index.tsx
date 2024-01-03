import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectCartItem } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  count?: number;
  rating: number;
};

type PizzaBlockProps = {
  key?: number,
  pizza: Pizza;
};

const typeNames: string[] = ['тонке', 'традиційне'];

const PizzaBlock: React.FC<PizzaBlockProps> = ({ pizza }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItem(pizza.id));
  const currentCount = cartItem?.count ? cartItem.count : 0;

  const [activeType, setActiveType] = useState<number | string>(0);
  const [activeSize, setActiveSize] = useState(0);

  useEffect(() => {
    setActiveType(typeNames[0]);
    setActiveSize(pizza.sizes[0]);
  }, []);

  const handleAddButton = () => {
    const item = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: activeType,
      size: activeSize
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <div className="u-cover">
        <img className="pizza-block__image" src={pizza.imageUrl} alt={pizza.title} />
      </div>
      <Link to={`pizza/${pizza.id}`} className="pizza-block__title">{pizza.title}</Link>
      <div className="pizza-block__selector">
        <ul>
          {pizza.types.length &&
            pizza.types.map((type, id) => (
              <li
                className={activeType === typeNames[type] ? 'active' : ''}
                onClick={() => setActiveType(typeNames[type])}
                key={id}>
                {typeNames[type]}
              </li>
            ))}
        </ul>
        <ul>
          {pizza.sizes.length &&
            pizza.sizes.map((size, id) => (
              <li
                className={activeSize === size ? 'active' : ''}
                onClick={() => setActiveSize(size)}
                key={id}>
                {size} см.
              </li>
            ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {pizza.price} грн</div>
        <button className="button button--outline button--add" onClick={handleAddButton}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавити</span>
          <i>{currentCount}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
