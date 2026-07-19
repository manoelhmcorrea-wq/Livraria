import {pool} from '../database/connection';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
    async criar(cliente: Cliente): Promise<Cliente> {
        const query = 'INSERT INTO clientes (nome, email, cpf, telefone, ativo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [
            cliente.nome,
            cliente.email,
            cliente.cpf,
            cliente.telefone,
            cliente.ativo
        ];
        const result = await pool.query(query, values);
        return new Cliente(
            result.rows[0].nome,
            result.rows[0].email,
            result.rows[0].cpf,
            result.rows[0].telefone,
            result.rows[0].ativo,
            result.rows[0].id
        );
    }

    async buscarPorCpf(cpf: string): Promise<Cliente | null> {
        const query = 'SELECT * FROM clientes WHERE cpf = $1';
        const values = [cpf];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        return new Cliente(
            result.rows[0].nome,
            result.rows[0].email,
            result.rows[0].cpf,
            result.rows[0].telefone,
            result.rows[0].ativo,
            result.rows[0].id,
            result.rows[0].criado_em
        );
    }

    async listar(): Promise<Cliente[]> {
        const query = 'SELECT * FROM clientes';
        const result = await pool.query(query);
        return result.rows.map((dados: any) => new Cliente(
            dados.nome,
            dados.email,
            dados.cpf,
            dados.telefone,
            dados.ativo,
            dados.id,
            dados.criado_em
        ));
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        const query = 'SELECT * FROM clientes WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        return new Cliente(
            result.rows[0].nome,
            result.rows[0].email,
            result.rows[0].cpf,
            result.rows[0].telefone,
            result.rows[0].ativo,
            result.rows[0].id,
            result.rows[0].criado_em
        );
    }

    async buscarPorEmail(email: string): Promise<Cliente | null> {
        const query = 'SELECT * FROM clientes WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        return new Cliente(
            result.rows[0].nome,
            result.rows[0].email,
            result.rows[0].cpf,
            result.rows[0].telefone,
            result.rows[0].ativo,
            result.rows[0].id
        );
    }

    async atualizar(cliente: Cliente): Promise<Cliente> {
        const query = 'UPDATE clientes SET nome = $1, email = $2, cpf = $3, telefone = $4, ativo = $5 WHERE id = $6 RETURNING *';
        const values = [
            cliente.nome,
            cliente.email,
            cliente.cpf,
            cliente.telefone,
            cliente.ativo,
            cliente.id
        ];
        const result = await pool.query(query, values);
        return new Cliente(
            result.rows[0].nome,
            result.rows[0].email,
            result.rows[0].cpf,
            result.rows[0].telefone,
            result.rows[0].ativo,
            result.rows[0].id
        );
    }

    async remover(id: number): Promise<void> {
        const query = 'DELETE FROM clientes WHERE id = $1';
        const values = [id];
        await pool.query(query, values);
    }
}
