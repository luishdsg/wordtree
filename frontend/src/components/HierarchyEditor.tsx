import React, { useState } from 'react';
import { Category } from './CategoryEditor';

interface Node {
  name: string;
  value?: string;
  children: Node[];
}

export const HierarchyEditor: React.FC = () => {
  const [tree, setTree] = useState<Node[]>([]);
  const [filename, setFilename] = useState('hierarchy.json'); // Nome padrão do arquivo
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryValue, setNewCategoryValue] = useState('');

  const addCategory = (name: string, value?: string, parentPath: string[] = []) => {
    const newTree = [...tree];
    let currentLevel = newTree;

    parentPath.forEach((part) => {
      let existing = currentLevel.find((node) => typeof node === 'object' && node.name === part);
      if (!existing) {
        existing = { name: part, children: [] };
        currentLevel.push(existing);
      }
      currentLevel = (existing as Node).children;
    });

    currentLevel.push({ name, value, children: [] });
    setTree(newTree);
  };

  const convertToDesiredFormat = (nodes: Node[]): any => {
    return nodes.reduce((acc, node) => {
      if (node.children.length > 0) {
        acc[node.name] = convertToDesiredFormat(node.children);
      } else {
        acc[node.name] = node.value || {};
      }
      return acc;
    }, {} as any);
  };

  const handleExport = () => {
    const jsonObject = convertToDesiredFormat(tree);
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Criar um link de download e clicar nele programaticamente
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    // Libere o URL
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
    <div>
      <div>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Valor da Categoria (Opcional)"
          value={newCategoryValue}
          onChange={(e) => setNewCategoryValue(e.target.value)}
        />
        <button onClick={handleAddMainCategory}>Adicionar Categoria Principal</button>
      </div>
      {tree.map((node, index) => (
        <Category key={index} node={node} addCategory={addCategory} parentPath={[]} />
      ))}
      <button onClick={handleExport}>Salvar Estrutura</button>
    </div>
  );
};
