import { readFileSync } from 'fs';
import { loadHierarchy } from './hierarchyLoader';
import { analyzePhrase } from './phraseAnalyzer';

function main() {
    const args = process.argv.slice(2);

    // Adiciona depuração para todos os argumentos
    console.log("Todos os argumentos:", args);

    // Verifica se o comando "analyze" foi passado
    if (args[0] !== 'analyze') {
        console.error("Uso: bun run main.ts analyze --depth <n> --verbose (opcional) \"{phrase}\"");
        return;
    }

    const depthIndex = args.indexOf('--depth');
    const verboseIndex = args.indexOf('--verbose');

    // Adiciona depuração para índices e comprimento dos argumentos
    console.error("depthIndex:", depthIndex);
    console.error("verboseIndex:", verboseIndex);
    console.error("Total de argumentos:", args.length);

    // Verifica se a profundidade foi fornecida e é válida
    if (depthIndex === -1 || args.length <= depthIndex + 1) {
        console.error("Uso2 correto: bun run main.ts analyze --depth <n> --verbose (opcional) \"{phrase}\"");
        return;
    }

    const depth = parseInt(args[depthIndex + 1], 10);
    if (isNaN(depth) || depth < 0) {
        console.error("A profundidade deve ser um número não negativo.");
        return;
    }
    console.log("Depth:", depth);

    // Captura a frase
    const phraseStartIndex = verboseIndex !== -1 ? verboseIndex + 1 : depthIndex + 2;
    const phrase = args.slice(phraseStartIndex).join(' ');
    console.log("Phrase Start Index:", phraseStartIndex);
    console.log("Captured Arguments:", args.slice(phraseStartIndex).join(' '));
    console.log("Phrase:", phrase);

    // Verifica se a frase foi fornecida
    if (!phrase.trim()) {
        console.warn(`Na frase não existe nenhum filho do nível ${depth} e nem o nível ${depth} possui os termos especificados`);
        return;
    }

    // Carrega a hierarquia e analisa a frase
    const { hierarchy, loadTime } = loadHierarchy('./dicts/words.json');
    const { wordCount, analyzeTime } = analyzePhrase(phrase, depth, hierarchy);

    // Exibe os resultados
    const results = Object.entries(wordCount).map(([key, value]) => `${key} = ${value}`).join('; ');
    console.log(results || '0');

    // Exibe os tempos se a opção verbose estiver presente
    if (verboseIndex !== -1) {
        console.log(`Tempo de carregamento dos parâmetros: ${loadTime.toFixed(2)}ms`);
        console.log(`Tempo de verificação da frase: ${analyzeTime.toFixed(2)}ms`);
    }
}

main();
