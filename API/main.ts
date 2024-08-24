import { loadHierarchy } from './src/services/hierarchyLoader';
import { analyzePhrase } from './src/services/phraseAnalyzer';

function main() {
    const args = process.argv.slice(2);

    if (args[0] !== 'analyze') { console.error("ERROR: no analyze"); return; }

    const depthIndex = args.indexOf('--depth');
    const verboseIndex = args.indexOf('--verbose');

    if (depthIndex === -1 || args.length <= depthIndex + 1) { console.error("ERROR: profundidade fornecida é invalida"); return; }

    const depth = parseInt(args[depthIndex + 1], 10);
    if (isNaN(depth) || depth < 0) { console.error("A profundidade deve ser um número não negativo."); return; }

    // Captura a frase
    const phraseStartIndex = depthIndex + 2;
    const phraseEndIndex = verboseIndex !== -1 ? verboseIndex : undefined;
    const phrase = args.slice(phraseStartIndex, phraseEndIndex).join(' ');
    console.log("Phrase Start Index:", phraseStartIndex);
    console.log("Captured Arguments:", args.slice(phraseStartIndex).join(' '));

    // Carrega a hierarquia e analisa a frase
    const { hierarchy, loadTime } = loadHierarchy('./src/assets/json/dicts/words.json');
    const { wordCount, analyzeTime, wordsAtDepth } = analyzePhrase(phrase, hierarchy, depth);
    const wordCountTotal = Object.keys(wordCount).length
    if (wordsAtDepth.length === 0) {
        console.warn(`Aviso: O nível de profundidade (${depth}) não existe na hierarquia.`);
    } else {
        const groupedCounts: Record<string, number> = {};
        Object.values(wordCount).forEach(({ count, path }) => {
            const groupName = path[path.length - 1];
            if (groupName) {
                if (!groupedCounts[groupName]) {
                    groupedCounts[groupName] = 0;
                }
                groupedCounts[groupName] += count;
            }
        });

        if (wordCountTotal > 0) {
            console.log(Object.entries(groupedCounts)
                .map(([group, count]) => `${group} = ${count}  ${count === 1 ? `Um(a) ${group?.toLowerCase()} foi mencionado(a)` : ''}`)
                .join(';\n'));
        } else {
            console.warn(`Na frase não existe nenhum filho do nível ${depth} e nem o nível ${depth} possui os termos especificados`);
        }
    }

    if (verboseIndex !== -1) {
        console.log(`Tempo de carregamento dos parâmetros: ${loadTime.toFixed(2)}ms`);
        console.log(`Tempo de verificação da frase: ${analyzeTime.toFixed(2)}ms`);
    }
}
main();
// developed with 💻 by Luis
