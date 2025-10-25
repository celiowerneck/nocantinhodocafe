document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // Detecta automaticamente quantos níveis acima precisamos subir
  // Exemplo:
  // /index.html → "./"
  // /reviews/win-bigly.html → "../"
  // /reviews/livros/win-bigly.html → "../../"
  const depth = window.location.pathname.split("/").length - 2;
  const basePath = "../".repeat(depth === 0 ? 0 : depth - 1);

  // Função genérica para carregar um arquivo externo (header/footer)
  async function carregarElemento(elemento, arquivo) {
    try {
      const resposta = await fetch(basePath + arquivo);
      if (!resposta.ok) throw new Error(`${arquivo} não encontrado`);
      elemento.innerHTML = await resposta.text();
    } catch (erro) {
      console.error(`Erro ao carregar ${arquivo}:`, erro);
    }
  }

  // Carrega o cabeçalho e rodapé, se existirem na página
  if (header) await carregarElemento(header, "header.html");
  if (footer) await carregarElemento(footer, "footer.html");
});

