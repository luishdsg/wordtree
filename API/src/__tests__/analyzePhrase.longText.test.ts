import type { Hierarchy } from "../interface/hierarchy.interface";
import { readFileSync } from 'fs';
import path from 'path';
import { analyzePhrase } from "../services/phraseAnalyzer";
import { longText } from "../config/manifest";

const loadHierarchyFromFile = (filePath: string): Hierarchy => {
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
 
const hierarchyFilePath = path.join(__dirname, '../assets/json/dicts/words.json');
export const sampleHierarchy: Hierarchy = loadHierarchyFromFile(hierarchyFilePath);
export const createExpectedWord = (count: number, ...path: string[]) => ({ count, path });

describe('analyzePhrase - Texto Longo Teste', () => {
    it('deve lidar com textos longos com múltiplas ocorrências de palavras', () => {
        longText.trim();

        const depth = 3;
        const expectedOutput = {
            wordCount: {},
            analyzeTime: expect.any(Number),
        };

        const result = analyzePhrase(longText, sampleHierarchy, depth);
        const groupedWordCounts: Record<string, { count: number, path: string[] }> = {};
        Object.entries(result.wordCount).forEach(([word, { count, path }]) => {
            if (!groupedWordCounts[word]) {
                groupedWordCounts[word] = { count: 0, path };
            }
            groupedWordCounts[word].count += count;
        });

        // Exibe as palavras encontradas e suas informações
        Object.entries(groupedWordCounts).forEach(([word, { count, path }]) => {
            console.log(`Palavras encontradas e suas informações: ${word}: ${count} (${path[path.length - 1]})`);
        });
        // Assegura que o resultado contém todos os contadores e caminhos esperados
        expect(result.wordCount).toEqual(expect.objectContaining(expectedOutput.wordCount));
        expect(result.analyzeTime).toBeGreaterThan(0);
    });
});
// developed with 💻 by Luis
