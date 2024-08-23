import { analyzePhrase } from '../services/phraseAnalyzer';
import { createExpectedWord, sampleHierarchy } from './analyzePhrase.longText.test';

describe('analyzePhrase - Two Matches Test', () => {
    it('should correctly identify two different categories', () => {
        const phrase = `Eu vi Gorilas e Papagaios no zoológico.`.trim();
        const depth = 3;
        const expectedOutput = {
            wordCount: {
                Papagaios: createExpectedWord(1, "Animais", "Aves", "Pássaros"),
                Gorilas: createExpectedWord(1, "Animais", "Mamíferos", "Herbívoros", "Primatas"),
            },
            analyzeTime: expect.any(Number),
        };
        const result = analyzePhrase(phrase, sampleHierarchy, depth);

        // Adiciona um console.log para exibir as palavras e suas informações
        Object.entries(result.wordCount).forEach(([word, { count, path }]) => {
            console.log(`Palavras encontradas e suas informações: ${word}: ${count} (Path: ${path.join(' > ')})`);
        });

        // Verifica se as palavras "Gorilas" e "Papagaios" foram identificadas corretamente
        expect(result.wordCount).toEqual(expect.objectContaining(expectedOutput.wordCount));

        // Verifica se cada palavra está na categoria correta
        const primatasCount = Object.values(result.wordCount).reduce((acc, { count, path }) => {
            if (path.includes('Primatas')) {
                acc += count;
            }
            return acc;
        }, 0);

        const passarosCount = Object.values(result.wordCount).reduce((acc, { count, path }) => {
            if (path.includes('Pássaros')) {
                acc += count;
            }
            return acc;
        }, 0);

        expect(primatasCount).toBe(1);
        expect(passarosCount).toBe(1);
    });
});
