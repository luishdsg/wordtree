import { treeStructure } from '../interface/treeStructure.interface';

export const ConvertToDesiredFormat = (nodes: treeStructure[]): any => {
    return nodes.reduce((acc, node) => {
        if (node.children.length > 0) {
            acc[node.name] = ConvertToDesiredFormat(node.children);
        } else {
            acc[node.name] = node.value || {};
        }
        return acc;
    }, {} as any);
};
// developed with 💻 by Luis
