import { readFileSync } from 'fs';
import path from 'path';
import type { Hierarchy } from '../interface/hierarchy.interface';
import { createExpectedWord, sampleHierarchy } from './analyzePhrase.longText.test';
import { analyzePhrase } from '../services/phraseAnalyzer';


describe('analyzePhrase - Short Phrase Test', () => {
  it('should correctly identify words in a short phrase', () => {
    const shortPhrase = `Eu vi um Papagaios e um Gorilas`.trim();
    const depth = 3;
    const expectedOutput = {
        wordCount: {
            Papagaios: createExpectedWord(1, "Animais", "Aves", "Pássaros"),
            Gorilas: createExpectedWord(1, "Animais", "Mamíferos", "Herbívoros", "Primatas"),
        },
        analyzeTime: expect.any(Number),
    };
    const result = analyzePhrase(shortPhrase,sampleHierarchy,depth,);

    // Adiciona um console.log para exibir as palavras e suas informações
    console.log('Palavras encontradas e suas informações:');
    Object.entries(result.wordCount).forEach(([word, { count, path }]) => {
        console.log(`Palavras encontradas e suas informações: ${word}: ${count} (${path[path.length - 1]})`);
    });

    // Assegure que o resultado contém os contadores e caminhos esperados para as palavras
    expect(result.wordCount).toEqual(expect.objectContaining(expectedOutput.wordCount));
    expect(result.analyzeTime).toBeGreaterThan(0);
  });
});
