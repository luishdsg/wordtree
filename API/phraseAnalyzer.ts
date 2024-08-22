import { performance } from 'perf_hooks';

interface Hierarchy {
    [key: string]: Hierarchy | string[];
}

function findWordsAtDepth(hierarchy: Hierarchy, depth: number): string[] {
    let currentLevel: any[] = [hierarchy];
    for (let i = 0; i < depth; i++) {
        const nextLevel: any[] = [];
        for (const node of currentLevel) {
            if (typeof node === 'object') {
                Object.values(node).forEach(subNode => {
                    if (Array.isArray(subNode)) {
                        nextLevel.push(...subNode); // Adiciona os itens da lista diretamente
                    } else if (typeof subNode === 'object') {
                        nextLevel.push(subNode);
                    }
                });
            }
        }
        currentLevel = nextLevel;
    }
    // Filtra apenas strings
    return currentLevel.flat().filter(item => typeof item === 'string') as string[];
}


export function analyzePhrase(phrase: string, depth: number, hierarchy: Hierarchy): { wordCount: Record<string, number>, analyzeTime: number } {
    const startAnalyze = performance.now();
    const wordsAtDepth = findWordsAtDepth(hierarchy, depth);
    const wordCount: Record<string, number> = {};

    wordsAtDepth.forEach(word => {
        if (typeof word === 'string') {
            const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (regex.test(phrase)) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        }
    });

    const analyzeTime = performance.now() - startAnalyze;
    return { wordCount, analyzeTime };
}

