# Terreiros de Jurema 🌿

Catálogo de casas de Jurema Sagrada pelo Brasil, com agenda de giras e festas
públicas — para quem procura a Jurema encontrar casa séria para conhecer.
Um projeto da **Ciência da Jurema Sagrada**.

**Site:** https://rodrigortwo.github.io/terreiros-de-jurema/

## Como funciona

Site 100% estático no GitHub Pages. Não tem cadastro automático, banco de
dados nem login — e não precisa: o catálogo inteiro vive em **um arquivo**.

- [`terreiros.js`](terreiros.js) — as casas e suas agendas. **É o único
  arquivo que você edita no dia a dia.** As instruções estão no topo dele.
- `index.html` / `styles.css` / `app.js` — a página (busca, filtros por
  estado e tradição, agenda agregada, modal da casa).

## Para atualizar

1. Edite `terreiros.js` (adicionar casa, atualizar agenda do mês).
2. Commit e push na branch `main`:

```bash
git add terreiros.js && git commit -m "Atualiza agenda do mês" && git push
```

O GitHub Pages republica sozinho em 1–2 minutos.

## Princípios (inegociáveis)

1. **Só entra casa que pediu para entrar.** Nenhum terreiro é listado sem
   pedido da própria casa, e sai na hora que ela pedir.
2. **A casa manda, a página obedece.** Só publicamos os dados que a casa
   aprovou — endereço é sensível; `endereco: null` mostra "sob consulta".
3. **Agenda só de evento público.** Trabalho fechado para a corrente não
   aparece aqui.
4. **Nenhuma promessa espiritual.** O catálogo informa e aponta o caminho;
   quem recebe, ensina e cura é a casa.

As seis casas atuais são **exemplos fictícios** de demonstração — serão
substituídas conforme casas reais se cadastrarem (contato no site).
