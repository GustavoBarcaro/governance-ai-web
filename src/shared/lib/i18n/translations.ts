export type Lang = "en" | "pt";

const en = {
  nav: {
    navigation: "Navigation",
    allDomains: "All Domains",
    activeFrameworks: "Active Frameworks",
    sessions: "sessions",
    noSessionsYet: "No sessions yet",
    signOut: "Sign out",
  },

  authShell: {
    badge: "AI Compliance Advisory Active",
    heroLine1: "Navigate",
    heroLine2: "Compliance.",
    heroLine3: "Command",
    heroLine4: "Governance.",
    tagline:
      "AI-powered regulatory intelligence for modern organizations. Organize frameworks, consult AI, and build compliance roadmaps.",
    features: [
      "Organize governance domains and frameworks",
      "AI-powered compliance consultations",
      "Structured learning path generation",
      "Knowledge assessment and validation",
    ] as string[],
    stats: {
      frameworks: "Frameworks",
      powered: "Powered",
      advisory: "Advisory",
    },
  },

  auth: {
    login: {
      overline: "Sign in",
      title: "Welcome back.",
      description:
        "Continue your governance consultations and pick up where you left off.",
      switchText: "Need an account?",
      switchLink: "Create one",
    },
    signup: {
      overline: "Create account",
      title: "Get started.",
      description:
        "Start organizing your governance domains and consulting regulations with AI.",
      switchText: "Already have an account?",
      switchLink: "Sign in",
    },
    fields: {
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      namePlaceholder: "Your name",
      emailPlaceholder: "user@company.com",
    },
    passwordRules: {
      minLength: "Minimum 8 characters",
      specialChar: "At least 1 special character",
      number: "At least 1 number",
      uppercase: "At least 1 uppercase letter",
    },
    passwordMismatch: "Passwords do not match",
    passwordRequired: "Password is required",
    confirmPasswordRequired: "Please confirm your password",
    submit: {
      login: "Sign in",
      signup: "Create account",
    },
  },

  topics: {
    overline: "Governance Domains",
    titleHasDomains: "Your domains.",
    titleEmpty: "Get started.",
    descriptionHasDomains:
      "Create domains for each regulation or framework and jump back into your consultations.",
    descriptionEmpty:
      "Create your first governance domain to start consulting with AI on regulations and compliance frameworks.",
    addDomain: "Add Domain",
    cancel: "Cancel",
    newDomain: "New governance domain",
    newDomainDesc: "Give it a clear name and a color to identify it at a glance.",
    domainNameLabel: "Domain name",
    domainNamePlaceholder: "e.g. LGPD, ISO 27001, GDPR",
    creating: "Creating...",
    createDomain: "Create domain",
    colorError: "Enter a valid hex color before adding the domain.",
    noDomainsTitle: "No domains yet",
    noDomainsDesc:
      'Click "Add Domain" to create your first governance framework.',
    addFirstDomain: "Add your first domain",
    noConsultationsYet: "No consultations yet",
    deleteDomainTitle: "Delete domain?",
    deleteDomainConfirm: "Delete domain",
    consultations: "consultations",
    openDomain: "Open Domain",
  },

  topicDetails: {
    overline: "Governance Domain",
    subtitle:
      "Open consultations, review compliance progress, and build a governance roadmap for this domain.",
    notFound: "Topic not found.",
    deleteDomainTitle: "Delete domain?",
    deleteDomainConfirm: "Delete domain",
    deleteConsultationTitle: "Delete consultation?",
    deleteConsultationConfirm: "Delete consultation",
    deleteTopicDesc: (name: string) =>
      `This will remove "${name}" and all its consultations. This action cannot be undone.`,
    deleteSessionDesc: (name: string) =>
      `This will remove "${name}" and all messages inside it. This action cannot be undone.`,
  },

  createSession: {
    title: "New consultation",
    placeholder: "What do you want to consult about?",
    creating: "Creating...",
    start: "Start consultation",
  },

  sessionLibrary: {
    title: "Consultation history",
    session: "session",
    sessions: "sessions",
    noConsultations: "No consultations yet",
    startAbove: "Start a consultation above to begin.",
    open: "Open",
  },

  sessionHero: {
    backLabel: "Back to domain",
    tools: "Tools",
  },

  composer: {
    hint: "⌘↵ to send · AI governance advisor",
    send: "Send",
    sending: "Sending...",
    placeholder:
      "Ask about a regulation, request a compliance clarification, or explore a governance requirement.",
  },

  studyTools: {
    tabs: {
      summary: "Summary",
      clarify: "Clarify",
      quiz: "Quiz",
    },
    summary: {
      generate: "Generate Summary",
      generating: "Summarizing...",
      copy: "Copy summary",
      hint: "Generate a concise summary of this compliance consultation.",
    },
    clarify: {
      focusLabel: "Focus area",
      focusPlaceholder: "Which regulation needs clarification?",
      levelLabel: "Knowledge level",
      foundational: "Foundational",
      advanced: "Advanced",
      clarify: "Clarify Regulation",
      clarifying: "Clarifying...",
    },
    quiz: {
      difficultyLabel: "Difficulty",
      questionsLabel: "Questions",
      start: "Start Assessment",
      hint: "The assessment is generated from the content of this consultation.",
      easy: "easy",
      medium: "medium",
      hard: "hard",
    },
  },

  learningPath: {
    overline: "Compliance Roadmap",
    noRoadmap:
      "No compliance roadmap has been generated for this domain yet.",
    noRoadmapTitle: "Compliance roadmap",
    progress: "Progress",
    phases: "phases",
    phase: "Phase",
    passed: "Passed",
    completed: "Completed",
    assessmentPassed: "Assessment passed",
    openConsultation: "Open consultation",
    startConsultation: "Start consultation",
    creating: "Creating...",
    takeAssessment: "Take assessment",
    completionHint:
      "Complete each phase by passing the compliance assessment with at least 70%.",
  },

  learningPathGenerator: {
    aiBadge: "AI generated",
    stepsBadge: "4-6 steps",
    cardTitle: "Generate compliance roadmap",
    uses: "Uses",
    usesValue: "Domain, consultations, and your goal",
    description:
      "Generate a step-by-step compliance roadmap for this governance domain with clear actionable phases.",
    goalLabel: "Goal",
    goalPlaceholder:
      "Example: achieve full LGPD compliance for our data processing operations within 6 months",
    goalHint:
      "Describe your compliance objective or the outcome you need to achieve.",
    generating: "Generating roadmap...",
    generate: "Generate compliance roadmap",
    sessionHint:
      "Pick a consultation if you want the roadmap to use that context too.",
  },

  quiz: {
    backLabel: "Back to consultation",
    title: "Compliance assessment",
    description: "This assessment is based on your current consultation",
    notFound: "Quiz not found.",
  },

  backLinks: {
    backToDomains: "Back to domains",
    backToDomain: "Back to domain",
    backToConsultation: "Back to consultation",
  },

  messages: {
    processing: "Processing...",
    justNow: "Just now",
  },

  learningPathQuiz: {
    complianceAssessment: "Compliance assessment",
    questions: "questions",
    passThreshold: (n: number) =>
      `Score at least ${n}% to complete this compliance phase.`,
    passed: "You passed. This phase is complete.",
    backToRoadmap: "Back to roadmap",
    notFound: "Quiz not found.",
  },
};

export type Translations = typeof en;

const pt: Translations = {
  nav: {
    navigation: "Navegação",
    allDomains: "Todos os Domínios",
    activeFrameworks: "Frameworks Ativos",
    sessions: "consultas",
    noSessionsYet: "Nenhuma consulta ainda",
    signOut: "Sair",
  },

  authShell: {
    badge: "Consultoria IA Ativa",
    heroLine1: "Navegue pela",
    heroLine2: "Conformidade.",
    heroLine3: "Comande a",
    heroLine4: "Governança.",
    tagline:
      "Inteligência regulatória com IA para organizações modernas. Organize frameworks, consulte a IA e crie roadmaps de conformidade.",
    features: [
      "Organize domínios e frameworks de governança",
      "Consultas de conformidade com IA",
      "Geração de trilha de aprendizado estruturada",
      "Avaliação e validação de conhecimento",
    ],
    stats: {
      frameworks: "Frameworks",
      powered: "IA",
      advisory: "24/7",
    },
  },

  auth: {
    login: {
      overline: "Entrar",
      title: "Bem-vindo de volta.",
      description:
        "Continue suas consultas de governança e retome de onde parou.",
      switchText: "Ainda não tem uma conta?",
      switchLink: "Criar conta",
    },
    signup: {
      overline: "Criar conta",
      title: "Comece agora.",
      description:
        "Organize seus domínios de governança e consulte regulações com IA.",
      switchText: "Já tem uma conta?",
      switchLink: "Entrar",
    },
    fields: {
      name: "Nome",
      email: "E-mail",
      password: "Senha",
      confirmPassword: "Confirmar senha",
      namePlaceholder: "Seu nome",
      emailPlaceholder: "usuario@empresa.com",
    },
    passwordRules: {
      minLength: "Mínimo de 8 caracteres",
      specialChar: "Pelo menos 1 caractere especial",
      number: "Pelo menos 1 número",
      uppercase: "Pelo menos 1 letra maiúscula",
    },
    passwordMismatch: "As senhas não coincidem",
    passwordRequired: "A senha é obrigatória",
    confirmPasswordRequired: "Por favor, confirme sua senha",
    submit: {
      login: "Entrar",
      signup: "Criar conta",
    },
  },

  topics: {
    overline: "Domínios de Governança",
    titleHasDomains: "Seus domínios.",
    titleEmpty: "Comece agora.",
    descriptionHasDomains:
      "Crie domínios para cada regulação ou framework e retome suas consultas.",
    descriptionEmpty:
      "Crie seu primeiro domínio de governança para começar a consultar a IA sobre regulações e frameworks de conformidade.",
    addDomain: "Adicionar Domínio",
    cancel: "Cancelar",
    newDomain: "Novo domínio de governança",
    newDomainDesc:
      "Dê um nome claro e uma cor para identificá-lo facilmente.",
    domainNameLabel: "Nome do domínio",
    domainNamePlaceholder: "Ex: LGPD, ISO 27001, GDPR",
    creating: "Criando...",
    createDomain: "Criar domínio",
    colorError: "Insira uma cor hex válida antes de criar o domínio.",
    noDomainsTitle: "Nenhum domínio ainda",
    noDomainsDesc:
      'Clique em "Adicionar Domínio" para criar seu primeiro framework de governança.',
    addFirstDomain: "Adicionar seu primeiro domínio",
    noConsultationsYet: "Nenhuma consulta ainda",
    deleteDomainTitle: "Excluir domínio?",
    deleteDomainConfirm: "Excluir domínio",
    consultations: "consultas",
    openDomain: "Abrir Domínio",
  },

  topicDetails: {
    overline: "Domínio de Governança",
    subtitle:
      "Abra consultas, revise o progresso de conformidade e construa um roadmap de governança para este domínio.",
    notFound: "Domínio não encontrado.",
    deleteDomainTitle: "Excluir domínio?",
    deleteDomainConfirm: "Excluir domínio",
    deleteConsultationTitle: "Excluir consulta?",
    deleteConsultationConfirm: "Excluir consulta",
    deleteTopicDesc: (name: string) =>
      `Isso removerá "${name}" e todas as suas consultas. Esta ação não pode ser desfeita.`,
    deleteSessionDesc: (name: string) =>
      `Isso removerá "${name}" e todas as mensagens dentro dela. Esta ação não pode ser desfeita.`,
  },

  createSession: {
    title: "Nova consulta",
    placeholder: "Sobre o que você quer consultar?",
    creating: "Criando...",
    start: "Iniciar consulta",
  },

  sessionLibrary: {
    title: "Histórico de consultas",
    session: "consulta",
    sessions: "consultas",
    noConsultations: "Nenhuma consulta ainda",
    startAbove: "Inicie uma consulta acima para começar.",
    open: "Abrir",
  },

  sessionHero: {
    backLabel: "Voltar ao domínio",
    tools: "Ferramentas",
  },

  composer: {
    hint: "⌘↵ para enviar · Consultor IA de governança",
    send: "Enviar",
    sending: "Enviando...",
    placeholder:
      "Faça uma pergunta sobre uma regulação, solicite um esclarecimento de conformidade ou explore um requisito de governança.",
  },

  studyTools: {
    tabs: {
      summary: "Resumo",
      clarify: "Esclarecer",
      quiz: "Quiz",
    },
    summary: {
      generate: "Gerar Resumo",
      generating: "Resumindo...",
      copy: "Copiar resumo",
      hint: "Gere um resumo conciso desta consulta de conformidade.",
    },
    clarify: {
      focusLabel: "Área de foco",
      focusPlaceholder: "Qual regulação precisa de esclarecimento?",
      levelLabel: "Nível de conhecimento",
      foundational: "Básico",
      advanced: "Avançado",
      clarify: "Esclarecer Regulação",
      clarifying: "Esclarecendo...",
    },
    quiz: {
      difficultyLabel: "Dificuldade",
      questionsLabel: "Questões",
      start: "Iniciar Avaliação",
      hint: "A avaliação é gerada a partir do conteúdo desta consulta.",
      easy: "fácil",
      medium: "médio",
      hard: "difícil",
    },
  },

  learningPath: {
    overline: "Roadmap de Conformidade",
    noRoadmap:
      "Nenhum roadmap de conformidade foi gerado para este domínio ainda.",
    noRoadmapTitle: "Roadmap de conformidade",
    progress: "Progresso",
    phases: "fases",
    phase: "Fase",
    passed: "Aprovado",
    completed: "Concluído",
    assessmentPassed: "Avaliação aprovada",
    openConsultation: "Abrir consulta",
    startConsultation: "Iniciar consulta",
    creating: "Criando...",
    takeAssessment: "Fazer avaliação",
    completionHint:
      "Complete cada fase passando na avaliação de conformidade com pelo menos 70%.",
  },

  learningPathGenerator: {
    aiBadge: "Gerado por IA",
    stepsBadge: "4-6 etapas",
    cardTitle: "Gerar roadmap de conformidade",
    uses: "Usa",
    usesValue: "Domínio, consultas e seu objetivo",
    description:
      "Gere um roadmap de conformidade passo a passo para este domínio de governança com fases claras e acionáveis.",
    goalLabel: "Objetivo",
    goalPlaceholder:
      "Exemplo: alcançar total conformidade com a LGPD para nossas operações de processamento de dados em 6 meses",
    goalHint:
      "Descreva seu objetivo de conformidade ou o resultado que precisa alcançar.",
    generating: "Gerando roadmap...",
    generate: "Gerar roadmap de conformidade",
    sessionHint:
      "Selecione uma consulta se quiser que o roadmap use esse contexto também.",
  },

  quiz: {
    backLabel: "Voltar à consulta",
    title: "Avaliação de conformidade",
    description: "Esta avaliação é baseada em sua consulta atual",
    notFound: "Avaliação não encontrada.",
  },

  backLinks: {
    backToDomains: "Voltar aos domínios",
    backToDomain: "Voltar ao domínio",
    backToConsultation: "Voltar à consulta",
  },

  messages: {
    processing: "Processando...",
    justNow: "Agora mesmo",
  },

  learningPathQuiz: {
    complianceAssessment: "Avaliação de conformidade",
    questions: "questões",
    passThreshold: (n: number) =>
      `Acerte pelo menos ${n}% para concluir esta fase de conformidade.`,
    passed: "Você passou. Esta fase está concluída.",
    backToRoadmap: "Voltar ao roadmap",
    notFound: "Avaliação não encontrada.",
  },
};

export const translations: Record<Lang, Translations> = { en, pt };
