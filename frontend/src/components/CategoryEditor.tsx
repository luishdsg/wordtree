import React, { useState } from 'react';

interface Node {
    name: string;
    value?: string;
    children: Node[];
  }
  
  interface CategoryProps {
    node: Node;
    addCategory: (name: string, value: string | undefined, parentPath: string[]) => void;
    parentPath?: string[];
  }
  
  export const Category: React.FC<CategoryProps> = ({ node, addCategory, parentPath = [] }) => {
    const [showSubcategories, setShowSubcategories] = useState(false);
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newSubcategoryValue, setNewSubcategoryValue] = useState('');
  const handleAddSubcategory = () => {
    if (newSubcategoryName) {
      addCategory(newSubcategoryName, newSubcategoryValue || undefined, [...parentPath, node.name]);
      setNewSubcategoryName('');
      setNewSubcategoryValue('');
    }
  };

  return (
    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
      <button onClick={() => setShowSubcategories(!showSubcategories)}>
        {node.name}
      </button>
      {showSubcategories && (
        <div>
          <input
            type="text"
            placeholder="Nome da Subcategoria"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor (Opcional)"
            value={newSubcategoryValue}
            onChange={(e) => setNewSubcategoryValue(e.target.value)}
          />
          <button onClick={handleAddSubcategory}>Adicionar Subcategoria</button>
          {node.children.map((child, index) => (
            <Category
              key={index}
              node={child}
              addCategory={addCategory}
              parentPath={[...parentPath, node.name]}
            />
          ))}
        </div>
      )}
    </div>
  );
};