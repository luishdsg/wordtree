import { analyzePhrase } from '../services/phraseAnalyzer';
import { createExpectedWord, sampleHierarchy } from './analyzePhrase.longText.test';

describe('analyzePhrase - Same Category Test', () => {
    it('should correctly count words from the same category', () => {
        const phrase = `Eu vi Canários, Papagaios, e Pardais no parque.`.trim();
        const depth = 3;
        const expectedOutput = {
            wordCount: {
                Papagaios: createExpectedWord(1, "Animais", "Aves", "Pássaros"),
                Canários: createExpectedWord(1, "Animais", "Aves", "Pássaros"),
                Pardais: createExpectedWord(1, "Animais", "Aves", "Pássaros"),
            },
            analyzeTime: expect.any(Number),
        };

        const result = analyzePhrase(phrase, sampleHierarchy, depth);

        // Agrupa as contagens de palavras por seu grupo hierárquico
        const groupedCounts: Record<string, number> = {};
        Object.values(result.wordCount).forEach(({ count, path }) => {
            const groupName = path[path.length - 1]; // Nome do grupo no penúltimo nível
            if (groupName) {
                if (!groupedCounts[groupName]) {
                    groupedCounts[groupName] = 0;
                }
                groupedCounts[groupName] += count;
            }
        });
        
        // Constrói as strings de saída
        const groupOutput = Object.entries(groupedCounts)
            .map(([group, count]) => `${group} = ${count} ${count === 1 ? `Um(a) ${group.toLowerCase()} foi mencionado(a)` : ''}`)
            .join(';\n');
        
        const wordInfoOutput = Object.entries(result.wordCount)
            .map(([word, { count, path }]) => `${word}: ${count} (${path[path.length - 1]})`)
            .join(';\n');
        
        // Exibe todos os dados em um único console.log
        console.log(`${wordInfoOutput};\n${groupOutput}`);
        

        // Como todas as palavras pertencem à mesma categoria ("Pássaros"), o teste espera que o count seja acumulado sob essa categoria.
        expect(result.wordCount).toEqual(expect.objectContaining(expectedOutput.wordCount));
        // Verifica se o count total da categoria "Pássaros" está correto
        const totalPássaros = Object.entries(result.wordCount).reduce((acc, [word, { count, path }]) => {
            if (path.includes('Pássaros')) {
                acc += count;
            }
            return acc;
        }, 0);

        expect(totalPássaros).toBe(3);
    });
});
