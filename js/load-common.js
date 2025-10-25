async function loadCommon() {
  try {
    const headerContainer = document.getElementById("header");
    const footerContainer = document.getElementById("footer");

    if (headerContainer) {
      const headerResponse = await fetch("header.html");
      headerContainer.innerHTML = await headerResponse.text();
    }

    if (footerContainer) {
      const footerResponse = await fetch("footer.html");
      footerContainer.innerHTML = await footerResponse.text();
    }
  } catch (error) {
    console.error("Erro ao carregar header/footer:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadCommon);
