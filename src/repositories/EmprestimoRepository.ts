import { pool } from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {

    async criar(emprestimo: Emprestimo):Promise<Emprestimo>{
        const query = `INSERT INTO emprestimos (data_emprestimo, data_devolucao, cliente_id, livro_id) VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [
            emprestimo.dataEmprestimo,
            emprestimo.dataDevolucao ?? null,
            emprestimo.clienteId,
            emprestimo.livroId
        ];

        const result= await pool.query(query,values);
         
        return new Emprestimo(
            result.rows[0].data_emprestimo,
            result.rows[0].cliente_id,
            result.rows[0].livro_id,
            result.rows[0].data_devolucao,
            result.rows[0].id
        )
    }

    async buscarPorId(id: number): Promise<Emprestimo | null> {
            const query = 'SELECT * FROM emprestimos WHERE id = $1';
            const values = [id];

            const result = await pool.query(query, values);

            if (result.rows.length === 0) {
                return null;
            }

            return new Emprestimo(
            result.rows[0].data_emprestimo,
            result.rows[0].cliente_id,
            result.rows[0].livro_id,
            result.rows[0].data_devolucao,
            result.rows[0].id
            );

        }

        async listar(): Promise<Emprestimo[]> {
            const query = `SELECT * FROM emprestimos`;
            const result = await pool.query(query);
             return result.rows.map((dados: any) => new Emprestimo(
            dados.data_emprestimo,
            dados.cliente_id,
            dados.livro_id,
            dados.data_devolucao,
            dados.id
             ));
            }

            async atualizar(emprestimo: Emprestimo): Promise<Emprestimo> {

                const query = `UPDATE emprestimos SET data_devolucao = $1 WHERE id = $2 RETURNING *`;

                const values = [
                    emprestimo.dataDevolucao,
                    emprestimo.id
                ];

                const result = await pool.query(query,values);

                return new Emprestimo(
                    result.rows[0].data_emprestimo,
                    result.rows[0].cliente_id,
                    result.rows[0].livro_id,
                    result.rows[0].data_devolucao,
                    result.rows[0].id
                );
                
            }
        }
