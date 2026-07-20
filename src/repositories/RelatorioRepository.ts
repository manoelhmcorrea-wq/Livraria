import {pool} from '../database/connection';
import {Livro} from '../models/Livro'
import { QuantidadeEmprestimoLivro } from '../models/Relatorio';
import { LivroPorAutor } from '../models/Relatorio';
import { ClienteEmprestimoAtivo } from '../models/Relatorio';

export class RelatorioRepository{

    async listarLivrosPorAutor():Promise<LivroPorAutor[]> {
        const query = `SELECT a.nome AS autor, l.titulo FROM livros l JOIN autores a ON l.autor_id = a.id ORDER BY a.nome, l.titulo;`
        
        const result = await pool.query(query);

        return result.rows;
    }

    async listarLivrosDisponiveis(): Promise<Livro[]> {

        const query = `
            SELECT *
            FROM livros
            WHERE disponivel = true
        `;

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

    async listarLivrosEmprestados(): Promise<Livro[]> {

        const query = `SELECT * FROM livros WHERE disponivel = false`;

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

    async listarQuantidadeEmprestimosPorLivro(): Promise<QuantidadeEmprestimoLivro[]> {

    const query = `SELECT l.titulo, COUNT(e.id) AS quantidade FROM livros l LEFT JOIN emprestimos e ON l.id = e.livro_id GROUP BY l.id, l.titulo ORDER BY quantidade DESC`;

    const result = await pool.query(query);

    return result.rows.map((dados: any) => ({
        titulo: dados.titulo,
        quantidade: Number(dados.quantidade)
    }));
    }

    async listarClientesComEmprestimosAtivos(): Promise<ClienteEmprestimoAtivo[]> {

        const query = `SELECT c.nome AS cliente, l.titulo AS livro, e.data_emprestimo FROM emprestimos e JOIN clientes c ON e.cliente_id = c.id JOIN livros l ON e.livro_id = l.id WHERE e.data_devolucao IS NULL ORDER BY c.nome; `;

        const result = await pool.query(query);

        return result.rows.map((dados: any) => ({
            cliente: dados.cliente,
            livro: dados.livro,
            dataEmprestimo: dados.data_emprestimo
        }));
    }
} 




