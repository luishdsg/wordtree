import { treeStructure } from "./treeStructure.interface";

export interface CategoryProps {
    node: treeStructure;
    addCategory: (name: string, value: string | undefined, parentPath: string[]) => void;
    parentPath?: string[];
  }
  export interface SubCategoryProps {
    key: number;
    node: treeStructure;
    addCategory: (name: string, value: string | undefined, parentPath: string[]) => void;
    parentPath?: string[];
  }
// developed with ❤️ by Luis
