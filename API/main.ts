import { readFileSync } from 'fs';
import { loadHierarchy } from './src/services/hierarchyLoader';
import { analyzePhrase } from './src/services/phraseAnalyzer';

function main() {
    const args = process.argv.slice(2);

    // Adiciona depuração para todos os argumentos
    // console.log("Todos os argumentos:", args);

    // Verifica se o comando "analyze" foi passado
    if (args[0] !== 'analyze') {
        // console.error("Uso: bun run main.ts analyze --depth <n> --verbose (opcional) \"{phrase}\"");
        return;
    }

    const depthIndex = args.indexOf('--depth');
    const verboseIndex = args.indexOf('--verbose');

    // Verifica se a profundidade foi fornecida e é válida
    if (depthIndex === -1 || args.length <= depthIndex + 1) {
        // console.error(depthIndex, args.length);
        // console.error("Uso2 correto: bun run main.ts analyze --depth <n> --verbose (opcional) \"{phrase}\"");
        return;
    }

    const depth = parseInt(args[depthIndex + 1], 10);
    if (isNaN(depth) || depth < 0) {
        // console.error("A profundidade deve ser um número não negativo.");
        return;
    }
    console.log("verboseIndex:", verboseIndex);

    // Captura a frase
    const phraseStartIndex = depthIndex + 2;
    const phraseEndIndex = verboseIndex !== -1 ? verboseIndex : undefined;
    const phrase = args.slice(phraseStartIndex, phraseEndIndex).join(' ');
    console.log("Phrase Start Index:", phraseStartIndex);
    console.log("Captured Arguments:", args.slice(phraseStartIndex).join(' '));
    // console.log("Phrase:", phrase);

    // Carrega a hierarquia e analisa a frase
    const { hierarchy, loadTime } = loadHierarchy('./src/assets/json/dicts/words.json');
    const { wordCount, analyzeTime, wordsAtDepth } = analyzePhrase(phrase, hierarchy, depth);
    const wordCountTotal = Object.keys(wordCount).length
    if (wordsAtDepth.length === 0) {
        console.warn(`Aviso: O nível de profundidade (${depth}) não existe na hierarquia.`);
    } else {
        const groupedCounts: Record<string, number> = {};
        Object.values(wordCount).forEach(({ count, path }) => {
            const groupName = path[path.length - 1]; // Nome do grupo no penúltimo nível
            if (groupName) {
                if (!groupedCounts[groupName]) {
                    groupedCounts[groupName] = 0;
                }
                groupedCounts[groupName] += count;
            }
        });
        console.log(`wordCount: ${Object.keys(wordCount)}`);

        if (wordCountTotal > 0) {
            console.log(Object.entries(groupedCounts)
            .map(([group, count]) => `${group} = ${count}  ${count === 1? `Um(a) ${group?.toLowerCase()} foi mencionado(a)`: ''}`)
            .join(';\n'));
        } 
     
        else {
            console.warn(`Na frase não existe nenhum filho do nível ${depth} e nem o nível ${depth} possui os termos especificados`);
        }
    }


    // }

    // Exibe os resultados
    // const results = Object.entries(wordCount).map(([key, value]) => `${key} = ${value}`).join('; ');
    // console.log(results || '0');

    // Exibe os tempos se a opção verbose estiver presente
    if (verboseIndex !== -1) {
        console.log(`Tempo de carregamento dos parâmetros: ${loadTime.toFixed(2)}ms`);
        console.log(`Tempo de verificação da frase: ${analyzeTime.toFixed(2)}ms`);
    }
}

main();
