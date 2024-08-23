import { performance, } from 'perf_hooks';
import type { Hierarchy } from '../interface/hierarchy.interface';

function findWordsAtDepth(hierarchy: Hierarchy, depth: number, path: string[] = []): { word: string, path: string[] }[] {
    if (depth < 0) return [];
    let results: { word: string, path: string[] }[] = [];
    for (const key in hierarchy) {
        const currentPath = [...path, key];
        const value = hierarchy[key];

        if (Array.isArray(value) && depth === 1) {
            results = results.concat(value.map(word => ({ word, path: currentPath })));
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            results = results.concat(findWordsAtDepth(value as Hierarchy, depth - 1, currentPath));
        }
    }

    return results;
}
function findWordsInHierarchy(hierarchy: Hierarchy, phrase: string, currentPath: string[] = []): Record<string, { count: number, path: string[] }> {
    let wordCount: Record<string, { count: number, path: string[] }> = {};

    for (const key in hierarchy) {
        const value = hierarchy[key];
        const newPath = currentPath.concat(key);

        if (Array.isArray(value)) {
            value.forEach(word => {
                const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                if (regex.test(phrase)) {
                    if (!wordCount[word]) {
                        wordCount[word] = { count: 0, path: newPath };
                    }
                    wordCount[word].count++;
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            const nestedWordCount = findWordsInHierarchy(value as Hierarchy, phrase, newPath);
            wordCount = { ...wordCount, ...nestedWordCount };
        }
    }

    return wordCount;
}


export function analyzePhrase(
    phrase: string,
    hierarchy: Hierarchy,
    depth: number): {
        wordCount: Record<string, {
            count: number,
            path: string[]
        }>,
        analyzeTime: number,
        wordsAtDepth: {
            word: string;
            path: string[];
        }[]
    } {
    const startAnalyze = performance.now();
    const wordsAtDepth = findWordsAtDepth(hierarchy, depth);

    const wordCount = findWordsInHierarchy(hierarchy, phrase);
    const analyzeTime = performance.now() - startAnalyze;
    return { wordCount, analyzeTime, wordsAtDepth };
}

