import { pool } from './database/connection';


//TESTE DE CONEXÃO COM O BANCO DE DADOS

async function main() {
  const result = await pool.query('SELECT NOW()');
  console.log(result.rows[0]);
}

main();
