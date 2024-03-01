# Projeto de Web Scraping com Nest.js

### Este é um projeto de web scraping desenvolvido utilizando o framework Nest.js. O objetivo é extrair informações de um site específico, processá-las e disponibilizá-las através de uma API REST.

## Como Rodar o Projeto

### Para rodar o projeto, execute o seguinte comando:

```bash
npm run start:dev
```

Isso iniciará o servidor localmente, pela porta 3000

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **Controllers:** Contém os controladores da API.
- **Interface:** Define as interfaces dos dados utilizados no projeto.
- **Modules:** Módulos do Nest.js.
- **Scraper:** Contém os scripts responsáveis por realizar o web scraping.
- **Services:** Serviços utilizados pelo projeto.
- **Utils:** Utilitários diversos.

## Bibliotecas Utilizadas

O projeto faz uso das seguintes bibliotecas:

- **Nest.js:** Framework web para Node.js e criação da API
- **Puppeteer:** Biblioteca que foi utilizada para realização do web scraping.
- **Cheerio:** Implementação do jQuery para Node.js, utilizada para analisar e manipular documentos HTML.

## Endpoints da API

- `GET /products`: Retorna todos os produtos disponíveis.
- `GET /products/:id`: Retorna os detalhes de um produto específico.

Além disso, é possível filtrar os produtos utilizando os parâmetros de consulta `nutrition` e `nova` da seguinte maneira:

- `GET /products/?nutrition=A&nova=1`: Aplica os filtros de nutrição e grupo NOVA.

## Etapas do Web Scraping

As etapas do web scraping são claramente separadas e organizadas dentro do projeto. O processo inclui:

1. Acessar o site alvo.
2. Buscar os produtos disponíveis.
3. Filtrar os produtos conforme os critérios especificados.
4. Retornar os resultados através da API.
