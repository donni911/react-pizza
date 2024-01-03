import React from "react";

type CategoriesProps = {
  value: number,
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {

  const categories = [
    {
      id: 0,
      name: 'Всі',
    },
    {
      id: 1,
      name: 'Мясна',
    },
    {
      id: 2,
      name: 'Вегетеріанська',
    },
    {
      id: 3,
      name: 'Гриль',
    },
    {
      id: 4,
      name: 'Гостра',
    },
    {
      id: 5,
      name: 'Закрита',
    },
  ];

  return (
    <div className="categories">
      <ul className='categories-list'>
        {categories.length &&
          categories.map((category) => (
            <li
              key={category.id}
              onClick={() => onClickCategory(category.id)}
              className={`categories-list__item ${value === category.id ? 'active' : ''}`}>
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
