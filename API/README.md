# wordree

Para instalar as dependências:
```bash
bun install
```

Para testar o projeto:

```bash
bun test
```

Para rodar o projeto:

# Comando para analisar uma frase

*syntax* : 
```bash 
bun run cli.ts analyze –depth <n> “{phrase}” –verbose (optional) 
```

Analisa a frase fornecida e exibe uma tabela com a contagem de palavras no nível de
profundidade especificado.

Parâmetros:
● **–depth <n>:*** Nível de profundidade da árvore para o qual exibir a contagem
● **“{phrase}”:** texto a ser analisado
● **–verbose:** Caso seja informado deve exibir uma tabela no stdout com as seguintes

## métricas:
*Exemplo de execução:*
○ **Tempo de carregamento dos parâmetros (ms)**
○ **Tempo de verificação da frase (ms)**

### Exemplo 1: Possui uma correspondência e está utilizando todos os parâmetros.
comando: 
```bash 
bun run cli.ts analyze –depth 2 “Eu amo papagaios” –verbose 
```
output: 
```bash
Aves = 1 (Uma ave foi mencionada) 
```
Tempo de carregamento dos parâmetros 50ms
Tempo de verificação da frase 10ms

### Exemplo 2: Possui duas correspondências.
comando: 
```bash
bun run cli.ts analyze –depth 3 “Eu vi gorilas e papagaios” 
```
output: ```bashPássaros = 1; Primatas = 1; ```

### Exemplo 3: Não possui correspondência.
comando: 
```bash
bun run cli.ts analyze –depth 5 “Eu tenho preferência por animais carnívoros” 
```
output: 0;
Na frase não existe nenhum filho do nível 5 e nem o nível 5 possui os termos especificados

```bash
bun run main.ts analyze --depth 3 "Eu vi Rouxinóis, Canários, Falcões, Buteo" --verbose
```

```bash
bun test
```

Projeto crido usando `bun init` na versão bun v1.1.25. [Bun](https://bun.sh).

# developed with 💻 by Luis

