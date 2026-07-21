# BookStore Manager CLI

## Sobre o projeto

O Sistema de Gerenciamento de Livraria é uma aplicação desenvolvida em Node.js com TypeScript e PostgreSQL que permite realizar o gerenciamento de autores, livros, clientes e empréstimos por meio de um menu interativo no terminal.

O projeto foi desenvolvido com foco na aplicação dos conceitos fundamentais de desenvolvimento back-end utilizando arquitetura em camadas e integração com banco de dados.

## Objetivo

- gerenciar autores, livros, clientes e empréstimos;
- persistir informações em um banco de dados PostgreSQL;
- aplicar regras de negócio durante as operações do sistema;
- realizar consultas relacionais utilizando SQL;
- gerar relatórios a partir dos dados armazenados;
- organizar o código em camadas, promovendo modularização e reutilização;
- utilizar recursos da linguagem TypeScript, programação orientada a objetos e programação assíncrona;
- documentar a instalação, execução e utilização da aplicação no arquivo README.md.

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- pg
- dotenv
- readline/promises
- Git
- GitHub

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Node.js
- PostgreSQL
- npm
- Git


## Como instalar

git https://github.com/manoelhmcorrea-wq/Livraria

Instale as dependências:


npm install


Crie um arquivo `.env` na raiz do projeto contendo:

.env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=livraria

Execute o script SQL localizado em:

src/database/schema.sql

para criar todas as tabelas do banco de dados.

---

## Como executar

Execute o projeto em modo de desenvolvimento:

npm run dev


---
## Estrutura do Projeto

```text
Livraria/

├── src/
│
├── controllers/
│   ├── AutorController.ts
│   ├── ClienteController.ts
│   ├── LivroController.ts
│   ├── EmprestimoController.ts
│   └── RelatorioController.ts
│
├── database/
│   ├── connection.ts
│   ├── schema/
│   │   └── schema.sql
│   └── seed/
│       ├──AutorSeed.sql
│       ├──ClienteSeed.sql
│       ├──EmprestimoSeed.sql
│       └──LivroSeed.sql
│
├── models/
│   ├── Autor.ts
│   ├── Cliente.ts
│   ├── Livro.ts
│   ├── Emprestimo.ts
│   └── Relatorio.ts
│
├── repositories/
│   ├── AutorRepository.ts
│   ├── ClienteRepository.ts
│   ├── LivroRepository.ts
│   ├── EmprestimoRepository.ts
│   └── RelatorioRepository.ts
│
├── services/
│   ├── AutorService.ts
│   ├── ClienteService.ts
│   ├── LivroService.ts
│   ├── RelatorioService.ts
│   └── EmprestimoService.ts
│
├── utils/
│   └── input.ts
│
├── menu/
│   ├──AutorMenu.ts
│   ├──ClienteMenu.ts
│   ├──EmprestimoMenu.ts
│   ├──LivroMenu.ts
│   ├──MainMenu.ts
│   └──RelatorioMenu.ts
│
├── main.ts
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
```
---

## Funcionalidades

### Autores

- Cadastrar autor
- Listar autores
- Buscar autor por ID
- Atualizar autor
- Remover autor

### Livros

- Cadastrar livro
- Listar livros
- Buscar livro
- Atualizar livro
- Remover livro

### Clientes

- Cadastrar cliente
- Listar clientes
- Atualizar cliente
- Desativar cliente

### Empréstimos

- Registrar empréstimo
- Registrar devolução
- Listar empréstimos
- Consultar histórico

### Sistema

- Menu interativo
- Integração com PostgreSQL
- Validação dos dados
- Tratamento de erros
- Separação em camadas (Controller, Service e Repository)

---

## Exemplos de execução

### Cadastro de autor

Entrada:

```
Nome:
Machado de Assis

Nacionalidade:
Brasileiro
```

Saída:

```
Autor cadastrado com sucesso.
```

---

### Cadastro duplicado

Entrada:

```
Machado de Assis
```

Saída:

```
Erro: já existe um autor com esse nome.
```

---

### Livro inexistente

Entrada:

```
ID: 999
```

Saída:

```
Livro não encontrado.
```

---

### Empréstimo realizado

Entrada:

```
Cliente: 2
Livro: 5
```

Saída:

```
Empréstimo registrado com sucesso.
```

---

## Conceitos aplicados

### TypeScript

Utilização de tipagem estática em classes, interfaces, atributos, parâmetros e retornos de funções.

### Interfaces

Representação das entidades do sistema para garantir consistência dos dados.

### Classes

Cada entidade do sistema foi implementada utilizando Programação Orientada a Objetos.

### PostgreSQL

Persistência de dados utilizando consultas SQL.

### Arquitetura em camadas

O projeto foi dividido em:

- Controllers
- Services
- Repositories
- Models
- Database
- Utils
- Menus

Cada camada possui responsabilidades específicas.

### async/await

Utilizado em todas as operações assíncronas envolvendo banco de dados.

### Tratamento de erros

Validação dos dados recebidos e captura de erros provenientes do banco de dados.

---

## Organização do Kanban

Link do Kanban:

```
https://trello.com/b/I21VUbtT/my-trello-board
```

---

## Branches utilizadas

- main
- develop
- feature/database
- feature/autores
- feature/livros
- feature/clientes
- feature/emprestimos
- feature/relatorios
- docs/readme

---

## Melhorias futuras

- Sistema de autenticação de usuários
- Busca por filtros avançados
- Paginação nas listagens
- Interface Web utilizando Express
- API REST
- Docker para facilitar a instalação
- Testes automatizados