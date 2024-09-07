import React from 'react';
import CategoryTabs from './components/CategoryTabs';
import ProductList from './components/ProductList';
import './styles/main.scss'

function App() {
  return (
    <div className="app">
      <CategoryTabs />
      <ProductList />
    </div>
  );
}

export default App;
