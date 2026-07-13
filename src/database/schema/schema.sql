CREATE TABLE autores (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
nacionalidade VARCHAR(100)
);

CREATE TABLE livros (
id SERIAL PRIMARY KEY,
titulo varchar(150) NOT NULL,
categoria varchar(100) NOT NULL,
disponivel BOOLEAN DEFAULT TRUE,
ano_publicacao INTEGER,
autor_id INTEGER,

CONSTRAINT fk_autor_id FOREIGN KEY (autor_id) REFERENCES autores(id)
);

CREATE TABLE clientes (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
cpf CHAR(11) UNIQUE,
telefone VARCHAR(20),
ativo BOOLEAN DEFAULT TRUE,
criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE emprestimos (
id SERIAL PRIMARY KEY,
data_emprestimo DATE NOT NULL,
data_devolucao DATE,
cliente_id INTEGER NOT NULL,
livro_id INTEGER NOT NULL,

CONSTRAINT fk_cliente_id FOREIGN KEY(cliente_id) REFERENCES clientes(id),
CONSTRAINT fk_livro_id FOREIGN KEY(livro_id) REFERENCES livros(id)
)