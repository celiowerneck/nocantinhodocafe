document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // Caminhos possíveis (tentaremos ambos automaticamente)
  const caminhosPossiveis = ["./", "../", "../../"];

  async function carregarElemento(elemento, arquivo) {
    for (const caminho of caminhosPossiveis) {
      try {
        const resposta = await fetch(caminho + arquivo);
        if (resposta.ok) {
          elemento.innerHTML = await resposta.text();
          return; // sucesso, para de procurar
        }
      } catch (_) {
        // tenta o próximo caminho
      }
    }
    console.warn(`⚠️ Não foi possível carregar ${arquivo}`);
  }

  if (header) await carregarElemento(header, "header.html");
  if (footer) await carregarElemento(footer, "footer.html");
});

