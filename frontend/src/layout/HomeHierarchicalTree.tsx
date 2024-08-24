import React, { useState } from 'react';
import { ConvertToDesiredFormat } from '../functions/ConvertToDesiredFormat';
import { treeStructure } from '../interface/treeStructure.interface';
import { Category } from './CategoryEditor';
import { InputDefault } from '../components/inputComponent';
import download from './../assets/icons/download-icon.svg'

export const HomeHierarchicalTree: React.FC = () => {
  const [tree, setTree] = useState<treeStructure[]>([]);
  const [filename] = useState('hierarchy.json');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const addCategory = (name: string, value?: string, parentPath: string[] = []) => {
    const newTree = [...tree];
    let currentLevel = newTree;

    parentPath.forEach((part) => {
      let existing = currentLevel.find((node) => typeof node === 'object' && node.name === part);
      if (!existing) {
        existing = { name: part, children: [] };
        currentLevel.push(existing);
      }
      currentLevel = (existing as treeStructure).children;
    });

    currentLevel.push({ name, value, children: [] });
    setTree(newTree);
  };

  const handleExport = () => {
    const jsonObject = ConvertToDesiredFormat(tree);
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddMainCategory = () => {
    if (newCategoryName) {
      addCategory(newCategoryName, newCategoryValue || undefined);
      setNewCategoryName('');
      setNewCategoryValue('');
    }
  };

  return (
    <body className='h-100'>
      <header className='p-3 container'>
          <div className='row align-content-center align-items-center'>
            <div className='col-12 text-center align-items-center align-content-center'>
              <div className="title my-3">Analisador de Hierarquia de Palavras</div>
            </div>
            <div onClick={handleExport} title='download json' className='col-md-1 p-0 m-0 border pointer  br-100 '>
              <img width="50" height="50" className='p-2' title='download json' src={download} alt="donwload-json" />
            </div>
            <div className='col-md-10 mt-2'>
              <input className="c-checkbox" type="checkbox" id="checkbox" />
              <div className="c-formContainer w-100 h-100">
                <form className="c-form w-100 h-100" action="">
                  <InputDefault value={newCategoryName} onChange={setNewCategoryName} placeholder={'Nome da categoria'} />
                  <InputDefault value={newCategoryValue} onChange={setNewCategoryValue} placeholder={'Valor (opcional)'} />
                  <label className="c-form__buttonLabel" htmlFor="checkbox">
                    <button className="c-form__button" type="button" onClick={handleAddMainCategory}>➕​</button>
                  </label>
                  <label className="c-form__toggle box-shadow" htmlFor="checkbox" data-title="Criar Categoria"></label>
                </form>
              </div>
            </div>
            <div className='col-md-2'></div>
        </div>
      </header>
      <main className='w-100 top-line-gray'>
        <div className='container'>
          <p className='fs-3 text-start px-5 my-3 poppins-medium'>Lista Hierárquica</p>
          <div className='row justify-center'>
            <div className='col br-4 border-line p-2'>
              {tree.map((node, index) => (
                <button
                  key={index}
                  className={`outline-none br-100 border-0 px-4 box-shadow mx-2 my-3 py-3 ${activeCategory === node.name ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(node.name);
                  }}>
                  {node.name}
                </button>
              ))}
            </div>
          </div>
          {tree.map((node, index) => (
            <div key={index}>
              {activeCategory === node.name && (
                <Category node={node} addCategory={addCategory} parentPath={[]} />
              )}
            </div>
          ))}
        </div>
      </main>
    </body>
  );
};
// developed with ❤️ by Luis