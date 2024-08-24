import { analyzePhrase } from '../services/phraseAnalyzer';
import { createExpectedWord, sampleHierarchy } from './analyzePhrase.longText.test';


describe('analyzePhrase -Teste De Frase Curta', () => {
  it('deve identificar corretamente as palavras em uma frase curta', () => {
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

    console.log('Palavras encontradas e suas informações:');
    Object.entries(result.wordCount).forEach(([word, { count, path }]) => {
        console.log(`Palavras encontradas e suas informações: ${word}: ${count} (${path[path.length - 1]})`);
    });

    expect(result.wordCount).toEqual(expect.objectContaining(expectedOutput.wordCount));
    expect(result.analyzeTime).toBeGreaterThan(0);
  });
});
// developed with 💻 by Luis

