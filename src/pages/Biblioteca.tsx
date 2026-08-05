import { useState, useMemo } from 'react'
import { useStoryForge } from '@/stores/storyforge-store'
import { Challenge, Genre, Difficulty, ChallengeType } from '@/types/storyforge'
import { ChallengeDetailModal } from '@/components/ChallengeDetailModal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  CheckCircle2,
  PenTool,
  Filter,
  Sparkles,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react'

const ALL_GENRES: Genre[] = [
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

const ALL_DIFFS: Difficulty[] = ['Fácil', 'Médio', 'Difícil', 'Muito Difícil']

const GENRE_BADGE_CLASSES: Record<string, string> = {
  Fantasia: 'bg-purple-950/80 text-purple-300 border-purple-800/40',
  Romance: 'bg-pink-950/80 text-pink-300 border-pink-800/40',
  'Ficção Científica': 'bg-sky-950/80 text-sky-300 border-sky-800/40',
  Terror: 'bg-red-950/80 text-red-300 border-red-800/40',
  Drama: 'bg-amber-950/80 text-amber-300 border-amber-800/40',
  Mistério: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40',
  'Slice of Life': 'bg-yellow-950/80 text-yellow-300 border-yellow-800/40',
  Histórico: 'bg-amber-900/80 text-amber-200 border-amber-700/40',
  Infantil: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-800/40',
  Humor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/40',
}

export default function Biblioteca() {
  const { challenges, completedChallenges } = useStoryForge()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'Todos'>('Todos')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'Todas'>('Todas')
  const [sortBy, setSortBy] = useState<'recentes' | 'xp' | 'dificuldade'>('recentes')
  const [page, setPage] = useState(1)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const completedMap = useMemo(() => {
    const set = new Set<string>()
    completedChallenges.forEach((cc) => set.add(cc.challengeId))
    return set
  }, [completedChallenges])

  const filteredChallenges = useMemo(() => {
    return challenges
      .filter((c) => {
        const matchesSearch =
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.prompt.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGenre = selectedGenre === 'Todos' || c.genre === selectedGenre
        const matchesDiff = selectedDifficulty === 'Todas' || c.difficulty === selectedDifficulty
        return matchesSearch && matchesGenre && matchesDiff
      })
      .sort((a, b) => {
        if (sortBy === 'xp') return b.xpReward - a.xpReward
        return 0
      })
  }, [challenges, searchTerm, selectedGenre, selectedDifficulty, sortBy])

  const pageSize = 18
  const paginated = filteredChallenges.slice(0, page * pageSize)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#d4a94e]/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#f5f0e6] flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[#d4a94e]" />
            Biblioteca de Desafios
          </h1>
          <p className="mt-1 text-sm text-[#9a93b8]">
            Explore centenas de desafios criativos para desbloquear novas histórias.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9a93b8]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palavra-chave..."
            className="pl-9 bg-[#1c1930] border-[#d4a94e]/20 text-[#f5f0e6] placeholder:text-[#9a93b8]"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1c1930] p-4 rounded-xl border border-[#d4a94e]/15">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-[#d4a94e] mr-1" />
          {/* Genre selector */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value as any)}
            className="rounded-lg border border-[#d4a94e]/20 bg-[#141226] px-3 py-1.5 text-xs text-[#f5f0e6] focus:outline-none"
          >
            <option value="Todos">Todos os Gêneros</option>
            {ALL_GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Difficulty selector */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="rounded-lg border border-[#d4a94e]/20 bg-[#141226] px-3 py-1.5 text-xs text-[#f5f0e6] focus:outline-none"
          >
            <option value="Todas">Todas as Dificuldades</option>
            {ALL_DIFFS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-[#9a93b8]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-[#d4a94e]/20 bg-[#141226] px-3 py-1.5 text-xs text-[#f5f0e6] focus:outline-none"
          >
            <option value="recentes">Mais Populares</option>
            <option value="xp">Maior XP</option>
          </select>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((challenge) => {
          const isDone = completedMap.has(challenge.id)
          return (
            <div
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className={`group relative flex flex-col justify-between rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                isDone
                  ? 'border-emerald-500/30 bg-[#141226]/80'
                  : 'border-[#d4a94e]/20 bg-[#1c1930] hover:border-[#d4a94e]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${GENRE_BADGE_CLASSES[challenge.genre] || ''}`}
                  >
                    {challenge.genre}
                  </Badge>

                  <div className="flex items-center gap-1.5">
                    {isDone && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        <CheckCircle2 className="h-3 w-3" /> Concluído
                      </span>
                    )}
                    <Badge
                      variant="outline"
                      className="text-[10px] border-[#d4a94e]/30 text-[#d4a94e]"
                    >
                      +{challenge.xpReward} XP
                    </Badge>
                  </div>
                </div>

                <h3 className="mt-3 font-serif text-base font-bold text-[#f5f0e6] group-hover:text-[#d4a94e] transition-colors leading-snug">
                  {challenge.title}
                </h3>

                <p className="mt-2 text-xs text-[#9a93b8] line-clamp-3 leading-relaxed">
                  {challenge.prompt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#9a93b8]">
                <span>
                  Dificuldade:{' '}
                  <strong className="text-[#f5f0e6] font-medium">{challenge.difficulty}</strong>
                </span>
                <span className="flex items-center gap-1 text-[#d4a94e] group-hover:underline">
                  <PenTool className="h-3 w-3" /> Detalhes
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination button */}
      {paginated.length < filteredChallenges.length && (
        <div className="text-center pt-4">
          <Button
            onClick={() => setPage((p) => p + 1)}
            variant="outline"
            className="border-[#d4a94e]/40 text-[#d4a94e] hover:bg-[#d4a94e]/10 px-8"
          >
            Carregar Mais Desafios ({filteredChallenges.length - paginated.length} restantes)
          </Button>
        </div>
      )}

      <ChallengeDetailModal
        challenge={selectedChallenge}
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
    </div>
  )
}
