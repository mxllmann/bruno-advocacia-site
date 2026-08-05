// Central place for the firm's real content and contact data.
// Update these values as the client provides final copy / numbers.

export const site = {
  name: "Ramos & Pereira Advocacia",
  shortName: "Ramos & Pereira",
  legalName: "Ramos & Pereira Advocacia",
  oab: "OAB/SC 3.864",
  tagline: "Advocacia de resultado, com atendimento próximo e ética inegociável.",
  description:
    "Ramos & Pereira Advocacia oferece, perante qualquer Tribunal ou Comarca do país, soluções judiciais e extrajudiciais com atendimento personalizado, qualidade, agilidade e ética.",

  phone: "(48) 3012.1677",
  phoneHref: "tel:+554830121677",
  email: "contato@brunoramos.com.br",

  // TODO: substituir pelo número de WhatsApp real do escritório (o telefone
  // atual é fixo e não funciona no WhatsApp). Formato: DDI + DDD + número.
  whatsappNumber: "554830121677",
  whatsappMessage:
    "Olá! Gostaria de falar com a Ramos & Pereira Advocacia sobre um atendimento jurídico.",

  address: {
    line1: "Rua Jornalista Manoel de Menezes, número 115 — sala 301",
    line2: "Itacorubi — Florianópolis — SC — Brasil",
    zip: "CEP: 88034-060",
    mapsQuery:
      "Rua Jornalista Manoel de Menezes, 115, Itacorubi, Florianópolis - SC, 88034-060",
  },

  hours: {
    days: "Segunda à Sexta",
    time: "das 09:00h às 18:00h",
  },
} as const;

export function whatsappUrl(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Equipe", href: "#equipe" },
  { label: "O Escritório", href: "#escritorio" },
  { label: "Contato", href: "#contato" },
] as const;

// icon = key mapped to a lucide icon inside the component
export const practiceAreas = [
  {
    icon: "scale",
    title: "Direito Civil",
    description:
      "Contratos, responsabilidade civil, indenizações e conflitos entre particulares.",
  },
  {
    icon: "plane",
    title: "Direito Aeronáutico",
    description:
      "Questões regulatórias, contratuais e de responsabilidade no setor da aviação.",
  },
  {
    icon: "shopping-bag",
    title: "Direito do Consumidor",
    description:
      "Defesa de consumidores e empresas em relações de consumo e cobranças indevidas.",
  },
  {
    icon: "banknote",
    title: "Direito Financeiro e Bancário",
    description:
      "Revisão de contratos bancários, juros, financiamentos e disputas com instituições.",
  },
  {
    icon: "shield-check",
    title: "Direito Securitário",
    description:
      "Recusa e atraso de seguros, sinistros e cobertura contratual de apólices.",
  },
  {
    icon: "landmark",
    title: "Administrativo, Licitações e Concursos",
    description:
      "Licitações, contratos administrativos, concursos públicos e relações com o Estado.",
  },
  {
    icon: "receipt",
    title: "Direito Tributário",
    description:
      "Planejamento tributário, defesas fiscais e recuperação de tributos pagos a maior.",
  },
  {
    icon: "heart-handshake",
    title: "Família e Sucessões",
    description:
      "Divórcios, guarda, pensão, inventários, partilhas e planejamento sucessório.",
  },
  {
    icon: "briefcase",
    title: "Comercial e Societário",
    description:
      "Constituição de empresas, contratos societários e resolução de conflitos entre sócios.",
  },
  {
    icon: "building-2",
    title: "Direito Imobiliário",
    description:
      "Compra e venda, locações, regularização de imóveis e disputas de posse.",
  },
  {
    icon: "hard-hat",
    title: "Direito Trabalhista",
    description:
      "Atuação para empregados e empregadores em reclamatórias e questões trabalhistas.",
  },
  {
    icon: "gavel",
    title: "Advocacia Recursal",
    description:
      "Recursos em tribunais superiores e sustentação técnica em segunda instância.",
  },
] as const;

export const officePillars = [
  {
    title: "Filosofia",
    text: "Atendimento personalizado, com agilidade, alta qualidade e transparência, atendendo às necessidades de cada cliente e oferecendo serviço sob medida para cada demanda, com compromisso pessoal, ético e técnico para com o contratante.",
  },
  {
    title: "Estrutura",
    text: "Para oferecer atendimento de alto padrão em ambiente confortável e seguro, investiu-se em sede própria com infraestrutura moderna e estacionamento. Contamos ainda com ampla rede de escritórios correspondentes em todo o país.",
  },
  {
    title: "Missão",
    text: "Prestação de serviços jurídicos diferenciados, com qualidade, rapidez e eficiência, para atender de forma adequada as necessidades daqueles que nos confiam seus interesses.",
  },
  {
    title: "Visão",
    text: "Destacar-se na prestação de serviços jurídicos pela excelência, agilidade e pontualidade no atendimento aos clientes.",
  },
  {
    title: "Valores",
    text: "Ética, respeito, comprometimento, eficiência, honestidade e lealdade.",
  },
] as const;

// Placeholder team — substituir por advogados, fotos e bios reais.
export const team = [
  {
    name: "Dr. Ramos",
    role: "Sócio fundador",
    oab: "OAB/SC 3.864",
    bio: "Atuação estratégica em contencioso cível e empresarial, com foco em resultado e atendimento próximo ao cliente.",
  },
  {
    name: "Dr. Pereira",
    role: "Sócio fundador",
    oab: "OAB/SC",
    bio: "Especialista em direito de família, sucessões e tributário, conduzindo casos com sensibilidade e rigor técnico.",
  },
  {
    name: "Nome do Advogado(a)",
    role: "Advogado(a) associado(a)",
    oab: "OAB/SC",
    bio: "Apoio técnico em diferentes áreas, garantindo agilidade e cuidado em cada etapa do processo.",
  },
] as const;
