import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, setCategory } from '../redux/features/menu.slice.js';
import '../styles/components/category.scss';

function CategoryTabs() {
  const dispatch = useDispatch();
  const { categories, status, selectedCategory } = useSelector((state) => state.menu);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [dispatch, status]);

  return (
    <div className={`category-tabs`}>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading categories</p>}
      {status === 'succeeded' && 
        <>
            <p>
                Menu
            </p>
            <div className='category-line'>
                <button className={`category-button ${selectedCategory == 'all' ? "active" : ""}`} onClick={() => dispatch(setCategory('all'))}>
                    all
                </button>
                {categories.map((category) => (
                
                <button key={category.id} className={`category-button ${category.name[0].value == selectedCategory ? "active" : ""}`} onClick={() => dispatch(setCategory(category.name[0].value))}>
                    {category.name[0].value}
                </button>
                ))}
            </div>
        </>
    }
    </div>
  );
}

export default CategoryTabs;