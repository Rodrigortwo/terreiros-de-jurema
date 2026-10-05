/* Terreiros de Jurema — renderização do catálogo (lê TERREIROS de terreiros.js) */
(function () {
  "use strict";

  const grid = document.getElementById("grid-terreiros");
  const agendaLista = document.getElementById("agenda-lista");
  const contagem = document.getElementById("contagem-casas");
  const busca = document.getElementById("busca");
  const filtroUf = document.getElementById("filtro-uf");
  const filtroTradicao = document.getElementById("filtro-tradicao");

  const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const ACENTOS = {
    "Jurema de mesa": "acc-ouro",
    "Jurema de chão": "acc-mata",
    "Catimbó": "acc-terra",
    "Umbanda cruzada com Jurema": "acc-noite",
  };

  /* "2026-11-07" → Date local (sem armadilha de fuso do new Date(string)) */
  function parseData(iso) {
    const [a, m, d] = iso.split("-").map(Number);
    return new Date(a, m - 1, d);
  }
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  function acentoDe(t) {
    return ACENTOS[(t.tradicoes || [])[0]] || "acc-ouro";
  }

  /* ---------- filtros ---------- */
  const ufs = [...new Set(TERREIROS.map(t => t.uf))].sort();
  ufs.forEach(uf => {
    const op = document.createElement("option");
    op.value = uf;
    op.textContent = uf;
    filtroUf.appendChild(op);
  });
  TRADICOES.forEach(tr => {
    const op = document.createElement("option");
    op.value = tr;
    op.textContent = tr;
    filtroTradicao.appendChild(op);
  });

  /* busca indiferente a acentos: "catimbo" encontra "Catimbó" */
  function semAcento(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function filtrados() {
    const q = semAcento(busca.value.trim());
    const uf = filtroUf.value;
    const tr = filtroTradicao.value;
    return TERREIROS.filter(t => {
      if (uf && t.uf !== uf) return false;
      if (tr && !(t.tradicoes || []).includes(tr)) return false;
      if (q) {
        const alvo = semAcento(t.nome + " " + t.dirigente + " " + t.cidade + " " + t.uf + " " + (t.tradicoes || []).join(" ") + " " + t.descricao);
        if (!alvo.includes(q)) return false;
      }
      return true;
    });
  }

  /* ---------- helpers de DOM (textContent: sem HTML vindo dos dados) ---------- */
  function el(tag, className, texto) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (texto !== undefined) n.textContent = texto;
    return n;
  }

  function chipsDe(t) {
    const box = el("div", "chips");
    (t.tradicoes || []).forEach(tr => box.appendChild(el("span", "chip", tr)));
    return box;
  }

  /* ---------- casas ---------- */
  function cardDe(t) {
    const card = el("button", "terreiro " + acentoDe(t));
    /* sem aria-label: o conteúdo interno (nome, selo, dirigente, tradições,
       descrição, visitas) forma o nome acessível completo */
    card.appendChild(el("span", "uf-badge", t.uf));
    if (t.exemplo) card.appendChild(el("span", "mini-selo", "EXEMPLO"));
    card.appendChild(el("span", "terreiro-nome", t.nome));
    card.appendChild(el("span", "terreiro-dirigente", t.dirigente));
    card.appendChild(el("span", "terreiro-local", t.cidade + " · " + t.uf));
    card.appendChild(chipsDe(t));
    card.appendChild(el("span", "terreiro-desc", t.descricao));
    card.appendChild(el("span", "visitas-badge" + (t.visitas ? "" : " fechada"),
      t.visitas ? "🌿 Recebe visitantes em giras públicas" : "Visitas sob consulta"));
    card.addEventListener("click", () => abrirModal(t));
    return card;
  }

  function renderCasas(lista) {
    grid.innerHTML = "";
    if (!lista.length) {
      grid.appendChild(el("p", "grid-vazio", "Nenhuma casa encontrada com esses filtros."));
      contagem.textContent = "";
      return;
    }
    lista.forEach(t => grid.appendChild(cardDe(t)));
    contagem.textContent = lista.length === 1 ? "1 casa" : lista.length + " casas";
  }

  /* ---------- agenda ---------- */
  function renderAgenda(lista) {
    agendaLista.innerHTML = "";
    const eventos = lista
      .flatMap(t => (t.agenda || []).map(ev => ({ t, ev })))
      .filter(({ ev }) => parseData(ev.data) >= hoje)
      .sort((a, b) => parseData(a.ev.data) - parseData(b.ev.data));

    if (!eventos.length) {
      agendaLista.appendChild(el("p", "agenda-vazia",
        "Nenhuma gira pública anunciada para os filtros escolhidos. As casas atualizam a agenda mês a mês."));
      return;
    }

    eventos.forEach(({ t, ev }) => {
      const linha = el("button", "evento");
      const d = parseData(ev.data);
      linha.setAttribute("aria-label",
        ev.titulo + ", " + d.getDate() + " de " + MESES[d.getMonth()] +
        (ev.hora ? " às " + ev.hora : "") + ", " + t.nome + ", " + t.cidade);

      const data = el("span", "evento-data");
      data.appendChild(el("span", "evento-dia", String(d.getDate())));
      data.appendChild(el("span", "evento-mes", MESES[d.getMonth()]));
      linha.appendChild(data);

      const info = el("span", "evento-info");
      info.appendChild(el("span", "evento-titulo", ev.titulo));
      info.appendChild(el("span", "evento-casa", t.nome + " — " + t.cidade + " · " + t.uf));
      linha.appendChild(info);

      if (ev.hora) linha.appendChild(el("span", "evento-hora", ev.hora));
      if (t.exemplo) linha.appendChild(el("span", "mini-selo", "EXEMPLO"));

      linha.addEventListener("click", () => abrirModal(t));
      agendaLista.appendChild(linha);
    });
  }

  /* ---------- modal ---------- */
  const modal = document.getElementById("modal");
  const mCapa = document.getElementById("modal-capa");
  const mSelo = document.getElementById("modal-selo");

  function abrirModal(t) {
    mCapa.className = "modal-capa " + acentoDe(t);
    mSelo.hidden = !t.exemplo;
    document.getElementById("modal-titulo").textContent = t.nome;
    document.getElementById("modal-dirigente").textContent = t.dirigente;
    document.getElementById("modal-local").textContent = t.cidade + " · " + t.uf;

    const chips = document.getElementById("modal-tradicoes");
    chips.innerHTML = "";
    (t.tradicoes || []).forEach(tr => chips.appendChild(el("span", "chip", tr)));

    document.getElementById("modal-desc").textContent = t.descricao;

    const ul = document.getElementById("modal-agenda");
    ul.innerHTML = "";
    const proximos = (t.agenda || [])
      .filter(ev => parseData(ev.data) >= hoje)
      .sort((a, b) => parseData(a.data) - parseData(b.data));
    if (proximos.length) {
      proximos.forEach(ev => {
        const d = parseData(ev.data);
        ul.appendChild(el("li", null,
          d.getDate() + " de " + MESES[d.getMonth()] + (ev.hora ? ", " + ev.hora : "") + " — " + ev.titulo));
      });
    } else {
      ul.appendChild(el("li", null, "Nenhuma gira pública anunciada no momento."));
    }

    document.getElementById("modal-endereco").textContent = t.endereco
      ? "📍 " + t.endereco
      : "📍 Endereço sob consulta — fale com a casa antes de visitar.";

    const contato = document.getElementById("modal-contato");
    contato.innerHTML = "";
    if (t.whatsapp) {
      const a = el("a", "btn btn-ouro", "WhatsApp da casa");
      a.href = "https://wa.me/" + t.whatsapp;
      a.target = "_blank";
      a.rel = "noopener";
      contato.appendChild(a);
    }
    if (t.instagram) {
      const a = el("a", "btn btn-ghost", "@" + t.instagram);
      a.href = "https://instagram.com/" + t.instagram;
      a.target = "_blank";
      a.rel = "noopener";
      contato.appendChild(a);
    }
    if (!t.whatsapp && !t.instagram) {
      contato.appendChild(el("p", "modal-contato-nota",
        t.exemplo
          ? "Esta casa é um exemplo fictício — o contato aparecerá quando casas reais se cadastrarem."
          : "Contato ainda não informado pela casa."));
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    /* foco vai para o modal; guarda quem abriu para devolver ao fechar */
    focoAnterior = document.activeElement;
    botaoFechar.focus();
    history.replaceState(null, "", "#casa-" + t.id);
  }

  let focoAnterior = null;
  const botaoFechar = document.getElementById("modal-fechar");

  function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
    if (focoAnterior && document.contains(focoAnterior)) focoAnterior.focus();
    focoAnterior = null;
  }

  botaoFechar.addEventListener("click", fecharModal);
  modal.addEventListener("click", e => { if (e.target === modal) fecharModal(); });
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") { fecharModal(); return; }
    /* prende o Tab dentro do modal enquanto aberto */
    if (e.key === "Tab") {
      const focaveis = [...modal.querySelectorAll("button, a[href]")].filter(n => n.offsetParent !== null);
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    }
  });

  /* ---------- animação de entrada ---------- */
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".faixa-manifesto, .secao, .cadastro-card, .rodape").forEach(el2 => {
    el2.classList.add("reveal");
    observador.observe(el2);
  });

  /* ---------- aplicar filtros ---------- */
  function aplicar() {
    const lista = filtrados();
    renderAgenda(lista);
    renderCasas(lista);
  }
  busca.addEventListener("input", aplicar);
  filtroUf.addEventListener("change", aplicar);
  filtroTradicao.addEventListener("change", aplicar);

  aplicar();

  /* link direto: seusite/#casa-<id> abre o modal daquela casa */
  if (location.hash.indexOf("#casa-") === 0) {
    const idInicial = decodeURIComponent(location.hash.slice("#casa-".length));
    const alvo = TERREIROS.find(t => t.id === idInicial);
    if (alvo) abrirModal(alvo);
  }
})();
