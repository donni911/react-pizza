import React, { useState } from 'react';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

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
      <ul>
        {categories.length &&
          categories.map((category) => (
            <li
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id ? 'active' : ''}>
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
