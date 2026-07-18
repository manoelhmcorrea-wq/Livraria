import {pool} from '../database/connection';
import { Autor } from '../models/Autor';

export class AutorRepository {
    async criar(autor: Autor): Promise<Autor> {
        const query = 'INSERT INTO autores (nome, nacionalidade)   VALUES ($1, $2) RETURNING *';
        const values = [
            autor.nome, 
            autor.nacionalidade
        ];
        const result = await pool.query(query, values);
        return new Autor(result.rows[0].nome, result.rows[0].nacionalidade, result.rows[0].id);
    }

    async buscarPorNome(nome: string): Promise<Autor | null> {
        const query = 'SELECT * FROM autores WHERE nome = $1';
        const values = [nome];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        const dados = result.rows[0];
        return new Autor( dados.nome, dados.nacionalidade, dados.id);
    }

    async listar(): Promise<Autor[]> {
        const query = 'SELECT * FROM autores';
        const result = await pool.query(query);
        return result.rows.map((dados: any) => new Autor(dados.nome, dados.nacionalidade, dados.id));
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        const query = 'SELECT * FROM autores WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        const dados = result.rows[0];
        return new Autor(dados.nome, dados.nacionalidade, dados.id);
    }

    async atualizar(autor: Autor): Promise<Autor> {
        const query = 'UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *';
        const values = [
            autor.nome,
            autor.nacionalidade,
            autor.id
        ];
        const result = await pool.query(query, values);
        return new Autor(result.rows[0].nome, result.rows[0].nacionalidade, result.rows[0].id);
    }

    async remover(id: number): Promise<void> {
        const query = 'DELETE FROM autores WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
    }
}