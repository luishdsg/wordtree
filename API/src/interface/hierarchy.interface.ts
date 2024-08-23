export interface Hierarchy {
    [key: string]: Hierarchy | string[];
}

export interface WordInfo {
    count: number;
    path: string[];
}