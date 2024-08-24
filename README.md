#Esse diretório possui 2 projetos
  ##FRONTEND  e #API(CLI)

  
# PROJETO FRONTEND

This project was bootstrapped with [React](https://github.com/facebook/create-react-app).

## Scripts Disponíveis

Execulte para baixar as dependências do projeto
### `yarn install`


No diretório do projeto, você pode executar:
### `yarn run start`

Executa o app em modo de desenvolvimento.
Abra [http://localhost:3000](http://localhost:3000)  para visualizá-lo no navegador.

A página será recarregada se você fizer edições.
Você também verá quaisquer erros de lint no console.

### `yarn test`

Inicia o runner de testes em modo interativo.
Consulte a seção sobre [ executar testes ](https://facebook.github.io/create-react-app/docs/running-tests)

### `yarn run build`

Cria o app para produção na pasta  `build`.
Ele agrupa corretamente o React em modo de produção e otimiza a build para melhor desempenho.

A build é minificada e os nomes dos arquivos incluem hashes.
Seu app está pronto para ser implantado!


### `yarn run eject`

**Nota: esta é uma operação irreversível. Uma vez que você  `eject`, não é possível voltar!**

Se você não estiver satisfeito com a ferramenta de build e as escolhas de configuração, você pode  `eject` a qualquer momento. Este comando removerá a única dependência de build do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc) diretamente para o seu projeto, para que você tenha controle total sobre elas. Todos os comandos, exceto  `eject`, ainda funcionarão, mas eles apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você estará por conta própria.

Você não precisa usar o `eject`. O conjunto de recursos curado é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usar esse recurso. No entanto, entendemos que essa ferramenta não seria útil se você não pudesse personalizá-la quando estiver pronto para isso.

## Aprenda Mais

Você pode aprender mais na [documentação do Create React App.](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira a [documentação do React.](https://reactjs.org/).



#---------------------------------------------------------------------------------



# PROJETO WORTREE

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


