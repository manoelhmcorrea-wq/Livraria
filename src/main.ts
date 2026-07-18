import { pool } from './database/connection';
import { MainMenu } from './menus/MainMenu';

//TESTE DE CONEXÃO COM O BANCO DE DADOS

/*async function main() {
  const result = await pool.query('SELECT NOW()');
  console.log(result.rows[0]);
}*/
async function main() {
  const mainMenu = new MainMenu();
  await mainMenu.iniciar();
}
main().catch((error) => {
  console.error('Erro ao iniciar o programa:', error);
  process.exit(1);
});
main();
