/* ================= TERREIROS DE JUREMA — catálogo =================
   Este é o ÚNICO arquivo que você precisa editar no dia a dia.

   COMO ADICIONAR UMA CASA:
   1. Copie um bloco { ... } abaixo e cole antes do colchete final.
   2. Preencha os campos. Os que a casa não quiser publicar, deixe null.
   3. Salve, faça commit e push — o site atualiza sozinho.

   CAMPOS:
   - id .......... apelido único, sem espaços (ex: "casa-da-mata-pb");
                   vira o link direto da casa: seusite/#casa-<id>
   - nome ........ nome da casa como ela quer aparecer
   - dirigente ... quem dirige (Mestre/Mestra/Pai/Mãe...)
   - tradicoes ... lista: "Jurema de mesa", "Jurema de chão",
                   "Catimbó", "Umbanda cruzada com Jurema"
   - cidade / uf . onde a casa está
   - descricao ... 2–3 frases, escritas ou aprovadas pela casa
   - endereco .... null = "endereço sob consulta" (recomendado;
                   endereço é dado sensível — só publique se a casa pedir)
   - whatsapp .... só números, com DDI e DDD (ex: "5583999990000") ou null
   - instagram ... usuário sem @ (ex: "casadajurema") ou null
   - visitas ..... true se a casa recebe visitantes em giras públicas
   - exemplo ..... true APENAS nas casas fictícias de demonstração.
                   Casa real cadastrada = remova este campo.
   - agenda ...... eventos PÚBLICOS: { data: "AAAA-MM-DD", hora: "19h",
                   titulo: "Gira de mesa" }. Evento que a casa não
                   declarou público NÃO entra aqui.

   REGRA DE OURO: só entra casa que PEDIU para entrar, e só com os
   dados que a casa aprovou. A casa manda, a página obedece.
   =================================================================== */

const TRADICOES = [
  "Jurema de mesa",
  "Jurema de chão",
  "Catimbó",
  "Umbanda cruzada com Jurema",
];

/* As seis casas abaixo são FICTÍCIAS — exemplos de demonstração até as
   primeiras casas reais se cadastrarem. Nenhuma corresponde a casa real. */
const TERREIROS = [
  {
    id: "exemplo-alhandra",
    nome: "Casa do Juremal Florido",
    dirigente: "Mestra do exemplo — vaga aberta",
    tradicoes: ["Jurema de chão"],
    cidade: "Alhandra",
    uf: "PB",
    descricao:
      "Exemplo de casa de chão na terra onde a Jurema é rainha. Gira ao ar livre, pé na terra, maracá e fumaça. Esta casa é fictícia — a vaga é da primeira casa de Alhandra que quiser se cadastrar.",
    endereco: null,
    whatsapp: null,
    instagram: null,
    visitas: true,
    exemplo: true,
    agenda: [
      { data: "2026-10-24", hora: "17h", titulo: "Gira de chão aberta" },
      { data: "2026-12-05", hora: "16h", titulo: "Festa das Mestras" },
    ],
  },
  {
    id: "exemplo-recife",
    nome: "Mesa do Catimbó da Boa Ciência",
    dirigente: "Mestre do exemplo — vaga aberta",
    tradicoes: ["Catimbó", "Jurema de mesa"],
    cidade: "Recife",
    uf: "PE",
    descricao:
      "Exemplo de mesa de Catimbó: princesas, tombo de mesa e trabalho de cura. Casa fictícia de demonstração — o lugar é da primeira mesa pernambucana que pedir cadastro.",
    endereco: null,
    whatsapp: null,
    instagram: null,
    visitas: true,
    exemplo: true,
    agenda: [{ data: "2026-11-13", hora: "19h30", titulo: "Mesa de cura aberta" }],
  },
  {
    id: "exemplo-joao-pessoa",
    nome: "Terreiro das Sete Cidades Encantadas",
    dirigente: "Mestra do exemplo — vaga aberta",
    tradicoes: ["Jurema de mesa", "Jurema de chão"],
    cidade: "João Pessoa",
    uf: "PB",
    descricao:
      "Exemplo de casa que trabalha mesa e chão, com calendário de festas de mestre. Fictícia — aguarda a primeira casa da capital paraibana.",
    endereco: null,
    whatsapp: null,
    instagram: null,
    visitas: true,
    exemplo: true,
    agenda: [{ data: "2026-11-28", hora: "18h", titulo: "Festa de mestre" }],
  },
  {
    id: "exemplo-natal",
    nome: "Casa da Jurema do Alecrim",
    dirigente: "Mestre do exemplo — vaga aberta",
    tradicoes: ["Jurema de chão"],
    cidade: "Natal",
    uf: "RN",
    descricao:
      "Exemplo potiguar: jurema de chão com toque de zabumba e ciência de raiz. Casa fictícia de demonstração.",
    endereco: null,
    whatsapp: null,
    instagram: null,
    visitas: false,
    exemplo: true,
    agenda: [],
  },
  {
    id: "exemplo-sao-paulo",
    nome: "Tenda Paulistana do Exemplo",
    dirigente: "Pai do exemplo — vaga aberta",
    tradicoes: ["Umbanda cruzada com Jurema"],
    cidade: "São Paulo",
    uf: "SP",
    descricao:
      "Exemplo de umbanda cruzada com Jurema na maior cidade do país: gira de mestres uma vez por mês, com fila de atendimento. Casa fictícia de demonstração.",
    endereco: null,
    whatsapp: null,
    instagram: null,
    visitas: true,
    exemplo: true,
    agenda: [
      { data: "2026-10-17", hora: "20h", titulo: "Gira de mestres e mestras" },
      { data: "2026-11-21", hora: "20h", titulo: "Gira de mestres e mestras" },
    ],
  },
  {
    id: "exemplo-salvador",
    nome: "Roça da Jurema com Dendê",
    dirigente: "Mãe do exemplo — vaga aberta",
    tradicoes: ["Umbanda cruzada com Jurema", "Catimbó"],
    cidade: "Salvador",
    uf: "BA",
    descricao:
      "Exemplo baiano: a Jurema que atravessou o São Francisco e se cruzou com o candomblé de caboclo. Casa fictícia de demonstração.",
    endereco: null,
    whatsapp: null,
    instagram: null,
    visitas: true,
    exemplo: true,
    agenda: [{ data: "2026-12-12", hora: "17h", titulo: "Samba de caboclo aberto" }],
  },
];
