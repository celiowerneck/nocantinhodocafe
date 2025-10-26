document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // caminhos que você já estava usando
  const caminhosPossiveis = ["./", "../", "../../"];

  // opcional: deixe true só durante desenvolvimento
  const DEV_NO_CACHE = false;

  async function carregarElemento(el, arquivo) {
    if (!el) return;

    // monta todas as tentativas de fetch em paralelo
    const tentativas = caminhosPossiveis.map((base) =>
      fetch(base + arquivo, {
        credentials: "same-origin",
        cache: DEV_NO_CACHE ? "no-store" : "default",
      }).then((r) => (r.ok ? r.text() : Promise.reject()))
    );

    try {
      // usa a primeira que der certo
      const html = await Promise.any(tentativas);
      el.innerHTML = html;
    } catch {
      console.warn(`⚠️ Não foi possível carregar ${arquivo} de: ${caminhosPossiveis.join(", ")}`);
    }
  }

  await Promise.all([
    carregarElemento(header, "header.html"),
    carregarElemento(footer, "footer.html"),
  ]);
});


