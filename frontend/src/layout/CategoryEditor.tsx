import React, { useState } from 'react';
import { CategoryProps } from '../interface/categoryProps.interface';
import { InputSub } from '../components/inputComponent';
import { SubCategoryComponent } from '../components/subCategoryComponent';


export const Category: React.FC<CategoryProps> = ({ node, addCategory, parentPath = [] }) => {
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
    <>
      <div className='col px-3 py-4'>
        <div className='w-100 py-3  h-100 br-4'>
          <h4>Subcategorias de {node.name}</h4>
          <div className='row'>
            <div className='col'>
              <div className='px-4'>
                <div className='row justify-content-center'>
                  <div className='col-md-8 p-3 br-100 theme-sky box-shadow'>
                    <div className='row p-0'>
                      <div className='col-5 p-0'>
                        <InputSub value={newSubcategoryName} onChange={setNewSubcategoryName} placeholder={'Subcategoria'} />
                      </div>
                      <div className='col-5 p-0'>
                        <InputSub value={newSubcategoryValue} onChange={setNewSubcategoryValue} placeholder={'Valor (Opcional)'} />
                      </div>
                      <div className='col-2 p-0'>
                        <button className='outline-none border-purple fs-3 br-100 px-2 pt-1 poppins-bold theme-purple' onClick={handleAddSubcategory}>➕​</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-3'>
                  {node.children.length > 0 && (
                    <div className='col-md-auto'>
                      {node.children.map((child, index) => (
                        <SubCategoryComponent
                          key={index}
                          node={child}
                          addCategory={addCategory}
                          parentPath={[...parentPath, node.name]}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// developed with 💻 by Luis