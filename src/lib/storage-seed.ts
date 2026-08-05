import {
  Challenge,
  Difficulty,
  Genre,
  ChallengeType,
  LevelTitle,
  Medal,
  Achievement,
  RivalWriter,
  WritingGuide,
  UserProfile,
} from '@/types/storyforge'

export const LEVEL_TITLES: LevelTitle[] = [
  {
    title: 'Aprendiz',
    requiredXp: 0,
    description: 'Iniciando os primeiros traços do seu grimório.',
  },
  {
    title: 'Contista',
    requiredXp: 500,
    description: 'Domina as breves narrativas e contos curtos.',
  },
  {
    title: 'Cronista',
    requiredXp: 1500,
    description: 'Registra visões do mundo com maestria e estilo.',
  },
  {
    title: 'Romancista',
    requiredXp: 3500,
    description: 'Tece tramas longas e personagens inesquecíveis.',
  },
  {
    title: 'Mestre da Narrativa',
    requiredXp: 7000,
    description: 'Forja mundos inteiros através do poder das palavras.',
  },
  {
    title: 'Lenda Literária',
    requiredXp: 12000,
    description: 'Seu nome é ecoado pelas eras no StoryForge.',
  },
]

export const INITIAL_PROFILE: UserProfile = {
  name: 'Escritor(a) em Aventura',
  avatar: 'SF',
  xp: 350,
  coins: 80,
  streak: 4,
  bestStreak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  equippedTitle: 'Aprendiz',
  unlockedTitles: ['Aprendiz'],
  unlockedMedals: [],
  unlockedAchievements: [],
  dailyGoal: 1000,
}

export const INITIAL_RIVALS: RivalWriter[] = [
  {
    id: 'r1',
    name: 'Aurelius Vane',
    avatar: 'AV',
    title: 'Mestre da Narrativa',
    xp: 8450,
    streak: 12,
  },
  { id: 'r2', name: 'Lyra Silvertongue', avatar: 'LS', title: 'Romancista', xp: 4820, streak: 9 },
  { id: 'r3', name: 'Gideon Vance', avatar: 'GV', title: 'Romancista', xp: 3900, streak: 5 },
  { id: 'r4', name: 'Elowen Starling', avatar: 'ES', title: 'Cronista', xp: 2150, streak: 14 },
  { id: 'r5', name: 'Dante Thorne', avatar: 'DT', title: 'Contista', xp: 1280, streak: 3 },
  { id: 'r6', name: 'Kaelen Frost', avatar: 'KF', title: 'Contista', xp: 890, streak: 2 },
  { id: 'r7', name: 'Seraphina Reed', avatar: 'SR', title: 'Aprendiz', xp: 420, streak: 6 },
  { id: 'r8', name: 'Ignis Ember', avatar: 'IE', title: 'Aprendiz', xp: 190, streak: 1 },
]

export const MEDALS: Medal[] = [
  {
    id: 'm-fantasia',
    title: 'Guardião da Fantasia',
    description: 'Conclua 10 desafios do gênero Fantasia',
    genre: 'Fantasia',
    icon: 'Sparkles',
    requiredCount: 10,
  },
  {
    id: 'm-romance',
    title: 'Tecelão de Romances',
    description: 'Conclua 10 desafios do gênero Romance',
    genre: 'Romance',
    icon: 'Heart',
    requiredCount: 10,
  },
  {
    id: 'm-scifi',
    title: 'Viajante das Estrelas',
    description: 'Conclua 10 desafios de Ficção Científica',
    genre: 'Ficção Científica',
    icon: 'Rocket',
    requiredCount: 10,
  },
  {
    id: 'm-terror',
    title: 'Senhor dos Sombrios',
    description: 'Conclua 10 desafios do gênero Terror',
    genre: 'Terror',
    icon: 'Skull',
    requiredCount: 10,
  },
  {
    id: 'm-drama',
    title: 'Espelho da Alma',
    description: 'Conclua 10 desafios do gênero Drama',
    genre: 'Drama',
    icon: 'Mask',
    requiredCount: 10,
  },
  {
    id: 'm-misterio',
    title: 'Detetive do Enigma',
    description: 'Conclua 10 desafios do gênero Mistério',
    genre: 'Mistério',
    icon: 'Search',
    requiredCount: 10,
  },
  {
    id: 'm-slice',
    title: 'Cronista do Cotidiano',
    description: 'Conclua 10 desafios de Slice of Life',
    genre: 'Slice of Life',
    icon: 'Coffee',
    requiredCount: 10,
  },
  {
    id: 'm-historico',
    title: 'Guardião do Tempo',
    description: 'Conclua 10 desafios de Ficção Histórica',
    genre: 'Histórico',
    icon: 'Hourglass',
    requiredCount: 10,
  },
  {
    id: 'm-infantil',
    title: 'Contador de Fábulas',
    description: 'Conclua 10 desafios de Literatura Infantil',
    genre: 'Infantil',
    icon: 'Smile',
    requiredCount: 10,
  },
  {
    id: 'm-humor',
    title: 'Mestre da Comédia',
    description: 'Conclua 10 desafios do gênero Humor',
    genre: 'Humor',
    icon: 'Laugh',
    requiredCount: 10,
  },
  {
    id: 'm-conquistador',
    title: 'Mestre Conquistador',
    description: 'Conclua 50 desafios no total',
    icon: 'Trophy',
    requiredCount: 50,
  },
]

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Primeira História',
    description: 'Conclua seu primeiro desafio de escrita.',
    icon: 'Feather',
    category: 'completion',
    currentProgress: 0,
    targetCount: 1,
    xpReward: 100,
    coinsReward: 25,
    unlocked: false,
  },
  {
    id: 'ach-7-streak',
    title: 'Chama Persistente',
    description: 'Alcance uma sequência de 7 dias consecutivos.',
    icon: 'Flame',
    category: 'streak',
    currentProgress: 4,
    targetCount: 7,
    xpReward: 200,
    coinsReward: 50,
    unlocked: false,
  },
  {
    id: 'ach-30-streak',
    title: 'Fogo Inextinguível',
    description: 'Alcance uma sequência de 30 dias consecutivos.',
    icon: 'Zap',
    category: 'streak',
    currentProgress: 4,
    targetCount: 30,
    xpReward: 500,
    coinsReward: 150,
    unlocked: false,
  },
  {
    id: 'ach-50-challenges',
    title: 'Bibliofilo Devotado',
    description: 'Conclua 50 desafios de escrita.',
    icon: 'BookOpen',
    category: 'completion',
    currentProgress: 0,
    targetCount: 50,
    xpReward: 1000,
    coinsReward: 300,
    unlocked: false,
  },
  {
    id: 'ach-100k-words',
    title: 'Lorde dos Manuscritos',
    description: 'Escreva um total de 100.000 palavras.',
    icon: 'PenTool',
    category: 'words',
    currentProgress: 2450,
    targetCount: 100000,
    xpReward: 1500,
    coinsReward: 500,
    unlocked: false,
  },
  {
    id: 'ach-spec-terror',
    title: 'Especialista em Terror',
    description: 'Conclua 10 desafios de Terror.',
    icon: 'Ghost',
    category: 'genre',
    currentProgress: 0,
    targetCount: 10,
    xpReward: 300,
    coinsReward: 75,
    unlocked: false,
  },
  {
    id: 'ach-spec-romance',
    title: 'Especialista em Romance',
    description: 'Conclua 10 desafios de Romance.',
    icon: 'Heart',
    category: 'genre',
    currentProgress: 0,
    targetCount: 10,
    xpReward: 300,
    coinsReward: 75,
    unlocked: false,
  },
  {
    id: 'ach-spec-scifi',
    title: 'Especialista em Ficção Científica',
    description: 'Conclua 10 desafios de Sci-Fi.',
    icon: 'Cpu',
    category: 'genre',
    currentProgress: 0,
    targetCount: 10,
    xpReward: 300,
    coinsReward: 75,
    unlocked: false,
  },
  {
    id: 'ach-spec-fantasia',
    title: 'Especialista em Fantasia',
    description: 'Conclua 10 desafios de Fantasia.',
    icon: 'Wand2',
    category: 'genre',
    currentProgress: 0,
    targetCount: 10,
    xpReward: 300,
    coinsReward: 75,
    unlocked: false,
  },
  {
    id: 'ach-maratonista',
    title: 'Maratonista Literário',
    description: 'Escreva em 10 dias consecutivos no mesmo mês.',
    icon: 'Calendar',
    category: 'special',
    currentProgress: 4,
    targetCount: 10,
    xpReward: 400,
    coinsReward: 100,
    unlocked: false,
  },
  {
    id: 'ach-first-medal',
    title: 'Primeira Medalha',
    description: 'Ganhe qualquer medalha de especialista.',
    icon: 'Award',
    category: 'special',
    currentProgress: 0,
    targetCount: 1,
    xpReward: 250,
    coinsReward: 80,
    unlocked: false,
  },
]

export const GENERATOR_POOLS = {
  themes: [
    'Uma traição esquecida no tempo',
    'A busca pela última lágrima de dragão',
    'Um amor proibidíssimo em tempos de guerra',
    'A descoberta de um portal no sótão da avó',
    'O último dia de um mundo em colapso',
    'Uma inteligência artificial que aprendeu a chorar',
    'A maldição da relíquia dourada',
    'Um reencontro após vinte anos de silêncio',
    'O pacto com uma sombra faminta',
    'A invenção de uma máquina de ler pensamentos',
    'Uma cidade onde nunca para de chover',
    'Um segredo guardado dentro de um violino',
    'A conspiração para roubar as estrelas',
    'O último trem da meia-noite',
    'Uma biblioteca cujos livros reescrevem o destino',
    'O mistério da carta sem remetente',
    'Um duelo de mágica num circo clandestino',
    'A promessa feita sob a luz da lua cheia',
    'Um diário encontrado numa garrafa naufragada',
    'A levitação misteriosa da estátua do vilarejo',
  ],
  genres: [
    'Fantasia',
    'Romance',
    'Ficção Científica',
    'Terror',
    'Drama',
    'Mistério',
    'Slice of Life',
    'Histórico',
    'Infantil',
    'Humor',
  ] as Genre[],
  emotions: [
    'Nostalgia profunda',
    'Esperança desesperada',
    'Melancolia serena',
    'Paranoia crescente',
    'Alegria eufórica',
    'Luto transformador',
    'Tensão sufocante',
    'Sensação de libertação',
    'Remorso amargo',
    'Culpa inconfessável',
    'Curiosidade obsessiva',
  ],
  characters: [
    'Um alquimista aposentado e rabugento',
    'Uma detetive telepata que detesta barulho',
    'Um garoto que conversa com corvos',
    'Um cavaleiro com medo de altura',
    'Uma mercenária que coleciona flores secas',
    'Um cientista que previu o fim do amanhã',
    'Uma fantasma que esqueceu como morreu',
    'Um imperador disfarçado de cozinheiro',
    'Uma bibliotecária de relíquias proibidas',
    'Um marinheiro que nunca viu o oceano',
    'Uma androide com memórias humanas enxertadas',
    'Um bruxo que falha em todas as poções',
  ],
  settings: [
    'Uma estufa abandonada coberta de névoa',
    'Um observatório astronômico nas montanhas',
    'Um vagão de trem em movimento perpétuo',
    'A taverna do Fim do Mundo',
    'Uma metrópole submersa iluminada por neon',
    'Um mosteiro suspenso entre nuvens',
    'Uma casa de chá no centro de Tóquio',
    'O interior de uma baleia mecânica',
    'Uma floresta onde as árvores sussurram segredos',
    'Um beco chuvoso em Londres vitoriana',
    'A sala de espera de um aeroporto interestelar',
    'Um sótão repleto de relógios parados',
  ],
  objects: [
    'Um espelho trincado',
    'Um relógio de bolso que anda para trás',
    'Uma chave de bronze sem fechadura',
    'Uma bússola que aponta para o perigo',
    'Um anel com uma pedra azul pulsação',
    'Um diário com páginas em branco',
    'Uma caixa de música quebrada',
    'Um mapa desenhado em pele de dragão',
    'Uma pena de fênix dourada',
    'Um frasco de tinta prateada',
  ],
  mandatoryWords: [
    'Sussurro',
    'Sombra',
    'Eclipse',
    'Eternidade',
    'Cicatriz',
    'Efêmero',
    'Labirinto',
    'Crepúsculo',
    'Relíquia',
    'Sinfonia',
    'Destino',
    'Fagulha',
    'Penumbra',
  ],
  forbiddenWords: [
    'E',
    'Não',
    'Porque',
    'Mas',
    'Tempo',
    'Amor',
    'Morte',
    'Olhos',
    'Noite',
    'Luz',
    'Casa',
    'Vida',
  ],
  wordLimits: [100, 250, 300, 500, 750, 1000, 1500],
}

// Function to generate 200+ challenges
export function generateSeedChallenges(): Challenge[] {
  const verbatimPrompts: Array<{
    prompt: string
    genre: Genre
    diff: Difficulty
    type: ChallengeType
    goal: number
  }> = [
    {
      prompt: 'Escreva uma história utilizando exatamente três personagens.',
      genre: 'Drama',
      diff: 'Médio',
      type: 'Personagens',
      goal: 500,
    },
    {
      prompt: "Escreva uma cena sem usar a letra 'A'.",
      genre: 'Slice of Life',
      diff: 'Muito Difícil',
      type: 'Restrição linguística',
      goal: 300,
    },
    {
      prompt: 'Conte uma história em apenas 100 palavras.',
      genre: 'Humor',
      diff: 'Fácil',
      type: 'Limite de palavras',
      goal: 100,
    },
    {
      prompt: 'Escreva apenas através de diálogos.',
      genre: 'Romance',
      diff: 'Médio',
      type: 'Diálogo',
      goal: 600,
    },
    {
      prompt:
        'Escreva uma história cujo último parágrafo muda completamente o significado da narrativa.',
      genre: 'Mistério',
      diff: 'Difícil',
      type: 'Estrutura',
      goal: 800,
    },
    {
      prompt: 'Faça um conto utilizando cinco objetos sorteados.',
      genre: 'Fantasia',
      diff: 'Médio',
      type: 'Objetos',
      goal: 700,
    },
    {
      prompt: 'Escreva um capítulo onde o antagonista está certo.',
      genre: 'Ficção Científica',
      diff: 'Difícil',
      type: 'Perspectiva',
      goal: 1000,
    },
  ]

  const challenges: Challenge[] = []
  let idCount = 1

  // Add verbatim items
  verbatimPrompts.forEach((item, idx) => {
    challenges.push({
      id: `c-verbatim-${idx + 1}`,
      title: item.prompt.length > 40 ? item.prompt.substring(0, 38) + '...' : item.prompt,
      prompt: item.prompt,
      genre: item.genre,
      difficulty: item.diff,
      type: item.type,
      wordGoal: item.goal,
      xpReward:
        item.diff === 'Fácil'
          ? 50
          : item.diff === 'Médio'
            ? 100
            : item.diff === 'Difícil'
              ? 200
              : 350,
      coinsReward:
        item.diff === 'Fácil' ? 10 : item.diff === 'Médio' ? 20 : item.diff === 'Difícil' ? 40 : 70,
      isDaily: idx === 0,
      isWeekly: idx === 1,
      isMonthly: idx === 2,
    })
  })

  const genres: Genre[] = [
    'Fantasia',
    'Romance',
    'Ficção Científica',
    'Terror',
    'Drama',
    'Mistério',
    'Slice of Life',
    'Histórico',
    'Infantil',
    'Humor',
  ]
  const difficulties: Difficulty[] = ['Fácil', 'Médio', 'Difícil', 'Muito Difícil']
  const types: ChallengeType[] = [
    'Limite de palavras',
    'Personagens',
    'Restrição linguística',
    'Diálogo',
    'Estrutura',
    'Objetos',
    'Perspectiva',
    'Conceito',
  ]

  const promptTemplates = [
    'Escreva uma cena em que [PERSONAGEM] descobre um [OBJETO] escondido em [CENÁRIO].',
    'Crie um conto sobre [TEMA], terminando com a palavra [PALAVRA].',
    'Descreva um confronto silencioso em um(a) [CENÁRIO] focado no sentimento de [EMOÇÃO].',
    'Escreva uma narrativa onde o tempo passa ao contrário para o protagonista.',
    'Desenvolva um diálogo tenso entre dois antigos amigos reunidos por uma tragédia.',
    'Crie um capítulo focado unicamente na descrição tátil e auditiva de uma tempestade magica.',
    'Crie um monólogo interior de alguém prestes a tomar uma decisão irreversível.',
    'Escreva uma história sob a perspectiva de um objeto inanimado testemunha de um crime.',
    'Desenvolva uma lenda urbana ambientada em uma estação de metrô abandonada.',
    'Escreva um conto curto onde a magia exige um sacrifício de memórias queridas.',
    'Narrem um primeiro encontro desastroso que acaba virando uma aliança inesperada.',
    'Crie uma narrativa epistolar composta apenas por três cartas não enviadas.',
    'Escreva uma cena de perseguição sem utilizar verbos de movimento ríspidos.',
    'Descreva uma celebração familiar onde todos guardam o mesmo segredo sombrio.',
    'Desenvolva uma história inspirada no sentimento de encontrar um livro antigo com anotações nas margens.',
    'Crie um personagem que possui o dom imprevisível de ver a última frase que cada pessoa dirá na vida.',
    'Escreva um duelo verbal em que o perdedor precisa entregar seu objeto mais precioso.',
    'Descreva o despertar de um ser milenar em meio a uma metrópole futurista e gélida.',
    'Escreva um conto de terror em que o perigo verdadeiro é completamente invisível.',
    'Crie uma fábula curta sobre um dragão que tinha pavor absoluto de fogo.',
  ]

  const sampleObjects = [
    'espelho de prata',
    'diário rasgado',
    'amuleto de âmbar',
    'reformatório interestelar',
    'lanterna foscamente acesa',
    'máscara de porcelana',
    'chave enferrujada',
  ]
  const sampleThemes = [
    'o perdão impossível',
    'a busca pela juventude eterna',
    'a ambição desmedida',
    'a nostalgia dos dias de verão',
    'o valor da verdade',
    'o peso da herança familiar',
  ]

  // Fill up to 210 challenges total
  while (challenges.length < 210) {
    const genre = genres[idCount % genres.length]
    const diff = difficulties[(idCount * 3) % difficulties.length]
    const type = types[(idCount * 2) % types.length]
    const tpl = promptTemplates[idCount % promptTemplates.length]
    const obj = sampleObjects[idCount % sampleObjects.length]
    const theme = sampleThemes[idCount % sampleThemes.length]

    const promptText = tpl
      .replace('[PERSONAGEM]', 'um jovem aprendiz')
      .replace('[OBJETO]', obj)
      .replace('[CENÁRIO]', 'um castelo esquecido')
      .replace('[TEMA]', theme)
      .replace('[EMOÇÃO]', 'nostalgia')
      .replace('[PALAVRA]', 'esperança')

    const xp = diff === 'Fácil' ? 50 : diff === 'Médio' ? 100 : diff === 'Difícil' ? 200 : 350
    const coins = diff === 'Fácil' ? 10 : diff === 'Médio' ? 20 : diff === 'Difícil' ? 40 : 70
    const goal = diff === 'Fácil' ? 300 : diff === 'Médio' ? 500 : diff === 'Difícil' ? 800 : 1200

    challenges.push({
      id: `c-gen-${idCount}`,
      title: `${genre}: ${promptText.substring(0, 32)}...`,
      prompt: `${promptText} (Gênero: ${genre}, Foco: ${type})`,
      genre,
      difficulty: diff,
      type,
      wordGoal: goal,
      xpReward: xp,
      coinsReward: coins,
    })
    idCount++
  }

  return challenges
}

export const WRITING_GUIDES: WritingGuide[] = [
  {
    id: 'g-1',
    title: 'Estrutura Narrativa: A Jornada da História',
    summary:
      'Aprenda a estruturar seus contos e romances usando o modelo de 3 atos e arcos dramáticos potentes.',
    category: 'Estrutura',
    readTimeMinutes: 8,
    content: 'Uma boa estrutura é o esqueleto invisível que sustenta a imaginação do leitor...',
    sections: [
      {
        title: 'O Primeiro Ato: O Mundo Comum e o Gancho',
        body: 'Apresente o protagonista em seu status quo antes do incidente incitante quebrar sua rotina.',
        tips: [
          'Evite longos blocos de exposição nas primeiras páginas.',
          'Mostre o desejo ou a falha central do personagem de imediato.',
        ],
      },
      {
        title: 'O Segundo Ato: Confronto e Ponto de Virada',
        body: 'O protagonista tenta resolver o problema com métodos antigos e falha, aumentando as apostas.',
        tips: [
          'Insira complicações orgânicas.',
          'Mantenha o ritmo alto através de conflitos internos e externos.',
        ],
      },
      {
        title: 'O Terceiro Ato: Clímax e Resolução',
        body: 'O momento da verdade onde o personagem enfrenta o maior desafio utilizando a lição aprendida.',
        tips: ['Garanta que a vitória ou derrota venha da escolha ativa do protagonista.'],
      },
    ],
  },
  {
    id: 'g-2',
    title: 'Desenvolvimento de Personagens Tridimensionais',
    summary:
      'Como criar personagens memoráveis com motivações claras, falhas humanas e voz própria.',
    category: 'Personagens',
    readTimeMinutes: 10,
    content:
      'Personagens inesquecíveis não são perfeitos; são apaixonados, imperfeitos e em constante atrito...',
    sections: [
      {
        title: 'Desejo vs. Necessidade',
        body: 'O Desejo é a meta consciente do personagem; a Necessidade é o que ele precisa aprender internamente.',
        tips: ['O conflito entre o que ele quer e o que precisa cria grande tensão dramática.'],
      },
      {
        title: 'A Voz e os Cacoetes',
        body: 'Dê a cada personagem um vocabulário único, ritmo de fala e postura corporal característicos.',
        tips: [
          'Teste ler os diálogos em voz alta sem as tags de fala para ver se são reconhecíveis.',
        ],
      },
    ],
  },
  {
    id: 'g-3',
    title: 'Worldbuilding: Construção de Mundos Imersivos',
    summary:
      'Técnicas para tecer universos ricos em fantasia, sci-fi ou ficção histórica sem sufocar a leitura.',
    category: 'Mundos',
    readTimeMinutes: 12,
    content: 'O mundo deve parecer vivo e maior do que a própria trama que está sendo contada...',
    sections: [
      {
        title: 'A Regra do Iceberg',
        body: 'Mostre apenas 10% do seu worldbuilding no texto principal; os outros 90% sustentam a coerência nos bastidores.',
        tips: ['Evite "infodumps" longos; espalhe detalhes do mundo nas ações cotidianas.'],
      },
    ],
  },
  {
    id: 'g-4',
    title: 'Diálogos Vivos e Naturais',
    summary: 'Como escrever conversas com subtexto, ritmo dinâmico e sem soarem robóticas.',
    category: 'Diálogos',
    readTimeMinutes: 6,
    content:
      'Pessoas raramente dizem exatamente o que pensam num diálogo. O subtexto é a alma da conversa...',
    sections: [
      {
        title: 'O Uso de Subtexto',
        body: 'O que não é dito costuma ser mais importante do que as palavras faladas.',
        tips: ['Crie tensão entre a intenção oculta do falante e sua fala superficial.'],
      },
    ],
  },
  {
    id: 'g-5',
    title: 'Domínio do Ritmo e Tensão Narrativa',
    summary:
      'Como alternar momentos de ação frenética e reflexão para prender o leitor do início ao fim.',
    category: 'Ritmo',
    readTimeMinutes: 7,
    content:
      'O ritmo da prosa é controlado pelo tamanho das frases, pontuação e escolha vocabular...',
    sections: [
      {
        title: 'Frases Curtas para Ação',
        body: 'Em momentos de perigo ou choque, use frases breves e diretas para acelerar os batimentos cardíacos do leitor.',
        tips: ['Frases longas e poéticas desaceleram o tempo e transmitem calma ou contemplação.'],
      },
    ],
  },
  {
    id: 'g-6',
    title: 'O Aumento do Suspense e Mistério',
    summary:
      'Estratégias de pistas, pistas falsas (red herrings) e revelar informações na hora certa.',
    category: 'Suspense',
    readTimeMinutes: 9,
    content:
      'Suspense é a arte de fazer o leitor antecipar o perigo ou desejar desesperadamente a resposta...',
    sections: [
      {
        title: 'A Bomba Debaixo da Mesa',
        body: 'Como ensinava Hitchcock, dê ao leitor uma informação que os personagens desconhecem para criar ansiedade.',
        tips: [
          'Insira prazos limítrofes (prazos de relógio corrido) para intensificar a urgência.',
        ],
      },
    ],
  },
  {
    id: 'g-7',
    title: 'Guia de Edição e Autorevisão',
    summary: 'Transforme seu rascunho em uma obra-prima polida em três passagens de revisão.',
    category: 'Revisão',
    readTimeMinutes: 8,
    content:
      'Escrever é humano; reescrever é divino. A mágica da literatura acontece na revisão...',
    sections: [
      {
        title: 'A Primeira Passagem: Estrutura Global',
        body: 'Esqueça vírgulas por enquanto. Verifique se a trama faz sentido e os arcos se fecham.',
        tips: ['Deixe o rascunho descansar por pelo menos 24 horas antes de começar a revisar.'],
      },
    ],
  },
  {
    id: 'g-8',
    title: 'Publicação e Apresentação do seu Texto',
    summary: 'Dicas sobre como preparar originais, criar sinopses impactantes e publicar online.',
    category: 'Publicação',
    readTimeMinutes: 10,
    content: 'Preparar sua história para o mundo exige cuidado estético e uma sinopse magnética...',
    sections: [
      {
        title: 'A Arte da Sinopse de 3 Frases',
        body: 'Apresente o protagonista, o dilema incitante e o risco supremo em três frases curtas.',
        tips: ['Finalize com uma pergunta provocativa implícita.'],
      },
    ],
  },
]
