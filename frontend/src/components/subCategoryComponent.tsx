import React, { useState } from 'react';
import { InputSub } from '../components/inputComponent';
import { SubCategoryProps } from '../interface/categoryProps.interface';


export const SubCategoryComponent: React.FC<SubCategoryProps> = ({ key, node, addCategory, parentPath = [] }) => {
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newSubcategoryValue, setNewSubcategoryValue] = useState('');
    const [showFormAddSubcategory, setShowFormAddSubcategory] = useState(false);

    const handleAddSubcategory = () => {
        if (newSubcategoryName) {
            addCategory(newSubcategoryName, newSubcategoryValue || undefined, [...parentPath, node.name]);
            setNewSubcategoryName('');
            setNewSubcategoryValue('');
        }
    };
    const fullPath = [...parentPath, node.name].join(' > ');
    return (
        <div className='row border-line br-2 py-3 mt-3'>
            <div className='col-md-auto'>
                <div className='row p-2'>
                    <div onClick={() => setShowFormAddSubcategory(!showFormAddSubcategory)} 
                    className='col-md-auto px-4 py-3 pointer bg-light border-3 mt-2 br-4' key={key}>
                        <p className='fs-5 m-0 text-break 1875remtext-start'>Árvore: <strong className='text-break'>{fullPath}</strong></p>
                        <p className='fs-6 m-0 text-break text-start'>"{node.name}" {node.value && `: "${node.value}"`}</p>
                    </div>
                    {showFormAddSubcategory && (
                        <div className='row mt-2 justify-content-center'>
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
                    )}
                    {node.children && node.children.length > 0 && (
                        <div className='row theme-flor mt-2'>
                            <div className='col-md-12'>
                                {node.children.map((child, index) => (
                                    <SubCategoryComponent
                                        key={index}
                                        node={child}
                                        addCategory={addCategory}
                                        parentPath={[...parentPath, node.name]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
// developed with 💻 by Luis
