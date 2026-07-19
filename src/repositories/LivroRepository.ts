import {pool} from '../database/connection';
import { Livro } from '../models/Livro';

export class LivroRepository {
    async criar(livro: Livro): Promise<Livro> {
        const query = 'INSERT INTO livros (titulo, categoria, disponivel, ano_publicacao, autor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [
            livro.titulo, 
            livro.categoria, 
            livro.disponivel, 
            livro.anoPublicacao, 
            livro.autorId,
        ];

        const result = await pool.query(query, values);
        return new Livro(
            result.rows[0].titulo, 
            result.rows[0].categoria,
            result.rows[0].disponivel, 
            result.rows[0].ano_publicacao, 
            result.rows[0].autor_id,
            result.rows[0].id
        );
    }

    async buscarPorTitulo(titulo: string): Promise<Livro | null> {
        const query = 'SELECT * FROM livros WHERE titulo = $1';
        const values = [titulo];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        const dados = result.rows[0];
        return new Livro(
            dados.titulo,
            dados.categoria,
            dados.disponivel,
            dados.ano_publicacao,
            dados.autor_id,
            dados.id
        );
    }

    async listar(): Promise<Livro[]> {
        const query = 'SELECT * FROM livros';
        const result = await pool.query(query);
        return result.rows.map((dados: any) => new Livro(
            dados.titulo,
            dados.categoria,
            dados.disponivel,
            dados.ano_publicacao,
            dados.autor_id,
            dados.id
        ));
    }

    async buscarPorId(id: number): Promise<Livro | null> {
        const query = 'SELECT * FROM livros WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        const dados = result.rows[0];
        return new Livro(
            dados.titulo,
            dados.categoria,
            dados.disponivel,
            dados.ano_publicacao,
            dados.autor_id,
            dados.id
        );
    }

    async atualizar(livro: Livro): Promise<Livro> {
        const query = 'UPDATE livros SET titulo = $1, categoria = $2, disponivel = $3, ano_publicacao = $4, autor_id = $5 WHERE id = $6 RETURNING *';
        const values = [
            livro.titulo,
            livro.categoria,
            livro.disponivel,
            livro.anoPublicacao,
            livro.autorId,
            livro.id
        ];
        const result = await pool.query(query, values);
        return new Livro(
            result.rows[0].titulo,
            result.rows[0].categoria,
            result.rows[0].disponivel,
            result.rows[0].ano_publicacao,
            result.rows[0].autor_id,
            result.rows[0].id
        );
    }

    async remover(id: number): Promise<void> {
        const query = 'DELETE FROM livros WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
    }

    async atualizarDisponibilidade(id:number, disponivel:boolean): Promise<void>{
        const query= `UPDATE livros SET disponivel = $1 WHERE id = $2`;
        const values = [disponivel,id]
        await pool.query(query,values)
    }
}