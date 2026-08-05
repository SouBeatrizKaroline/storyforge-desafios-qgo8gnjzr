export type Genre =
  | 'Fantasia'
  | 'Romance'
  | 'Ficção Científica'
  | 'Terror'
  | 'Drama'
  | 'Mistério'
  | 'Slice of Life'
  | 'Histórico'
  | 'Infantil'
  | 'Humor'

export type Difficulty = 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil'

export type ChallengeType =
  | 'Limite de palavras'
  | 'Personagens'
  | 'Restrição linguística'
  | 'Diálogo'
  | 'Estrutura'
  | 'Objetos'
  | 'Perspectiva'
  | 'Conceito'

export interface Challenge {
  id: string
  title: string
  prompt: string
  genre: Genre
  difficulty: Difficulty
  type: ChallengeType
  wordGoal: number
  xpReward: number
  coinsReward: number
  isDaily?: boolean
  isWeekly?: boolean
  isMonthly?: boolean
}

export interface CompletedChallenge {
  id: string
  challengeId: string
  completedAt: string // ISO string YYYY-MM-DD
  wordCount: number
  effortRating: number // 1 to 5
  storyText?: string
  xpEarned: number
  coinsEarned: number
}

export interface ActivityLog {
  date: string // YYYY-MM-DD
  wordsWritten: number
  challengesCompleted: number
  minutesSpent: number
}

export interface UserProfile {
  name: string
  avatar: string
  xp: number
  coins: number
  streak: number
  bestStreak: number
  lastActiveDate: string // YYYY-MM-DD
  equippedTitle: string
  unlockedTitles: string[]
  unlockedMedals: string[]
  unlockedAchievements: string[]
  dailyGoal: number // e.g. 1000 words
}

export interface LevelTitle {
  title: string
  requiredXp: number
  description: string
}

export interface Medal {
  id: string
  title: string
  description: string
  genre?: Genre
  icon: string
  requiredCount: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'completion' | 'streak' | 'words' | 'genre' | 'special'
  currentProgress: number
  targetCount: number
  xpReward: number
  coinsReward: number
  unlocked: boolean
}

export interface RivalWriter {
  id: string
  name: string
  avatar: string
  title: string
  xp: number
  streak: number
  isUser?: boolean
}

export interface StoryDraft {
  id: string
  challengeId?: string
  challengePrompt?: string
  title: string
  content: string
  wordCount: number
  lastSavedAt: string
  versions: Array<{
    id: string
    timestamp: string
    wordCount: number
    content: string
  }>
}

export interface WritingGuide {
  id: string
  title: string
  summary: string
  category: string
  readTimeMinutes: number
  content: string // Markdown or formatted text
  sections: Array<{
    title: string
    body: string
    tips?: string[]
  }>
  readStatus?: boolean
}

export interface GeneratorOptions {
  theme: string
  genre: Genre
  emotion: string
  character: string
  setting: string
  mandatoryObject: string
  mandatoryWord: string
  forbiddenWord: string
  wordLimit: number
}
