// Adicionando evento de submit no formulário
document.getElementById('formCadastro').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Obtendo os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    // Realizando a requisição para o servidor
    const resposta = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    });

    // Convertendo a resposta do servidor para JSON
    const data = await resposta.json();

    if (resposta.ok) {
      alert(data.message); // Mostra mensagem de sucesso
    } else {
      alert(`Erro: ${data.error}`); // Exibe erro caso exista
    }
  } catch (error) {
    alert('Erro ao conectar ao servidor.');
    console.error(error); // Log de erro para diagnóstico
  }
});