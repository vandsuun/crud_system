import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

// Mockando fetch globalmente
global.fetch = jest.fn();

document.body.innerHTML = `
  <form id="formCadastro">
    <input id="nome" value="Teste" />
    <input id="email" value="teste@email.com" />
    <input id="senha" type="password" value="123456" />
    <button type="submit">Cadastrar</button>
  </form>
`;

// Importa o script que contém o código do evento de submit
require('./index.js'); // Importa o arquivo correto (assumindo que está na raiz do projeto)

describe('Teste de envio do formulário de cadastro', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn(); // Mockando alert
  });

  test('Deve enviar o formulário corretamente e exibir mensagem de sucesso', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Cadastro realizado com sucesso!' })
    });

    const form = document.getElementById('formCadastro');
    fireEvent.submit(form);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/cadastro', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Teste', email: 'teste@email.com', senha: '123456' })
    }));
    expect(window.alert).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
  });

  test('Deve exibir mensagem de erro caso o servidor retorne erro', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'E-mail já cadastrado!' })
    });

    const form = document.getElementById('formCadastro');
    fireEvent.submit(form);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(window.alert).toHaveBeenCalledWith('Erro: E-mail já cadastrado!');
  });

  test('Deve exibir mensagem de erro ao falhar na conexão com o servidor', async () => {
    fetch.mockRejectedValueOnce(new Error('Falha na conexão'));

    const form = document.getElementById('formCadastro');
    fireEvent.submit(form);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(window.alert).toHaveBeenCalledWith('Erro ao conectar ao servidor.');
  });
});