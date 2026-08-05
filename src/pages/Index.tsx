import { useState } from 'react'
import { useStoryForge } from '@/stores/storyforge-store'
import { ChallengeDetailModal } from '@/components/ChallengeDetailModal'
import { Challenge } from '@/types/storyforge'
import { LEVEL_TITLES } from '@/lib/storage-seed'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Sun,
  Calendar as CalendarIcon,
  Moon,
  Flame,
  Coins,
  Trophy,
  PenTool,
  Clock,
  BookCheck,
  ChevronRight,
  Medal,
} from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Index() {
  const navigate = useNavigate()
  const {
    profile,
    completedChallenges,
    activityLogs,
    rivals,
    getDailyChallenge,
    getWeeklyChallenge,
    getMonthlyChallenge,
  } = useStoryForge()
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const dailyChallenge = getDailyChallenge()
  const weeklyChallenge = getWeeklyChallenge()
  const monthlyChallenge = getMonthlyChallenge()

  const totalWords = completedChallenges.reduce((acc, curr) => acc + curr.wordCount, 0)
  const totalHours = Math.round((totalWords / 250 / 60) * 10) / 10 || 1.5

  // Recharts Data - Last 14 days
  const chartDataWords = activityLogs.slice(-14).map((l) => ({
    dia: l.date.split('-').slice(1).join('/'),
    palavras: l.wordsWritten,
  }))

  // Recharts Data - Genre breakdown
  const genreCounts: Record<string, number> = {}
  completedChallenges.forEach((cc) => {
    genreCounts['Fantasia'] = (genreCounts['Fantasia'] || 0) + 1
  })
  const genrePieData = [
    { name: 'Fantasia', value: 4, color: '#a78bfa' },
    { name: 'Romance', value: 3, color: '#fb7185' },
    { name: 'Sci-Fi', value: 2, color: '#38bdf8' },
    { name: 'Terror', value: 2, color: '#ef4444' },
    { name: 'Outros', value: 2, color: '#facc15' },
  ]

  // User ranking calculation
  const allWriters = [
    ...rivals,
    {
      id: 'user-current',
      name: profile.name,
      avatar: profile.avatar,
      title: profile.equippedTitle,
      xp: profile.xp,
      streak: profile.streak,
      isUser: true,
    },
  ].sort((a, b) => b.xp - a.xp)

  const currentTitleObj =
    LEVEL_TITLES.find((t) => t.title === profile.equippedTitle) || LEVEL_TITLES[0]
  const nextTitleIndex = LEVEL_TITLES.findIndex((t) => t.title === currentTitleObj.title) + 1
  const nextTitleObj = LEVEL_TITLES[nextTitleIndex] || LEVEL_TITLES[LEVEL_TITLES.length - 1]
  const xpProgressPercent = Math.min(
    100,
    Math.floor((profile.xp / (nextTitleObj.requiredXp || 12000)) * 100),
  )

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#d4a94e]/30 bg-gradient-to-r from-[#1c1930] via-[#141226] to-[#1c1930] p-6 shadow-xl sm:p-8">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d4a94e]/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4a94e]">
              <span>Grão-Mestre da Forja</span>
              <span>•</span>
              <span>
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#f5f0e6] sm:text-3xl">
              Bem-vindo(a), {profile.name}!
            </h2>
            <p className="mt-2 text-sm text-[#9a93b8] max-w-xl">
              "Cada palavra escrita é um martelo forjando a lâmina do seu legado."
            </p>
          </div>
          <Button
            onClick={() => navigate('/editor')}
            className="self-start md:self-auto bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-semibold hover:brightness-110 shadow-lg shadow-[#d4a94e]/20"
          >
            <PenTool className="mr-2 h-4 w-4" /> Escrever Agora
          </Button>
        </div>
      </div>

      {/* Streak & Goals Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-xl border border-[#d4a94e]/15 bg-[#1c1930] p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-orange-950/60 text-orange-400 border border-orange-800/40">
            <Flame className="h-5 w-5 fill-orange-400/20" />
          </div>
          <div>
            <p className="text-xs text-[#9a93b8]">Sequência</p>
            <p className="font-serif text-lg font-bold text-[#f5f0e6]">{profile.streak} dias</p>
            <p className="text-[10px] text-[#9a93b8]">Melhor: {profile.bestStreak}d</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#d4a94e]/15 bg-[#1c1930] p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/40">
            <Coins className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[#9a93b8]">Moedas</p>
            <p className="font-serif text-lg font-bold text-[#f5f0e6]">{profile.coins}</p>
            <p className="text-[10px] text-[#9a93b8]">Forja Literária</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#d4a94e]/15 bg-[#1c1930] p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[#9a93b8]">Nível Atual</p>
            <p className="font-serif text-lg font-bold text-[#f5f0e6]">{profile.equippedTitle}</p>
            <p className="text-[10px] text-[#9a93b8]">{profile.xp} XP total</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#d4a94e]/15 bg-[#1c1930] p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <BookCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[#9a93b8]">Meta Diária</p>
            <p className="font-serif text-lg font-bold text-[#f5f0e6]">1.250/1.000</p>
            <p className="text-[10px] text-emerald-400 font-semibold">125% Concluído</p>
          </div>
        </div>
      </div>

      {/* Active Challenges Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#f5f0e6]">Desafios Ativos</h3>
          <Button
            variant="link"
            onClick={() => navigate('/biblioteca')}
            className="text-[#d4a94e] text-xs"
          >
            Ver todos na biblioteca <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Daily Challenge */}
          {dailyChallenge && (
            <div className="group relative flex flex-col justify-between rounded-xl border border-amber-500/30 bg-[#1c1930] p-5 shadow-lg hover:border-amber-500/60 transition-all hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                    <Sun className="h-4 w-4" /> Desafio Diário
                  </span>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                    +{dailyChallenge.xpReward} XP
                  </Badge>
                </div>
                <h4 className="mt-3 font-serif text-base font-bold text-[#f5f0e6] group-hover:text-[#d4a94e] transition-colors">
                  {dailyChallenge.title}
                </h4>
                <p className="mt-2 text-xs text-[#9a93b8] line-clamp-3 leading-relaxed">
                  {dailyChallenge.prompt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#9a93b8]">Gênero: {dailyChallenge.genre}</span>
                <Button
                  size="sm"
                  onClick={() => setSelectedChallenge(dailyChallenge)}
                  className="bg-[#d4a94e] text-[#0e0d1a] hover:bg-[#e8c15a] font-semibold text-xs"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          )}

          {/* Weekly Challenge */}
          {weeklyChallenge && (
            <div className="group relative flex flex-col justify-between rounded-xl border border-purple-500/30 bg-[#1c1930] p-5 shadow-lg hover:border-purple-500/60 transition-all hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-400">
                    <CalendarIcon className="h-4 w-4" /> Desafio Semanal
                  </span>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    +{weeklyChallenge.xpReward} XP
                  </Badge>
                </div>
                <h4 className="mt-3 font-serif text-base font-bold text-[#f5f0e6] group-hover:text-purple-300 transition-colors">
                  {weeklyChallenge.title}
                </h4>
                <p className="mt-2 text-xs text-[#9a93b8] line-clamp-3 leading-relaxed">
                  {weeklyChallenge.prompt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#9a93b8]">Gênero: {weeklyChallenge.genre}</span>
                <Button
                  size="sm"
                  onClick={() => setSelectedChallenge(weeklyChallenge)}
                  className="bg-purple-600 text-white hover:bg-purple-500 font-semibold text-xs"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          )}

          {/* Monthly Challenge */}
          {monthlyChallenge && (
            <div className="group relative flex flex-col justify-between rounded-xl border border-sky-500/30 bg-[#1c1930] p-5 shadow-lg hover:border-sky-500/60 transition-all hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                    <Moon className="h-4 w-4" /> Desafio Mensal
                  </span>
                  <Badge variant="outline" className="border-sky-500/30 text-sky-400">
                    +{monthlyChallenge.xpReward} XP
                  </Badge>
                </div>
                <h4 className="mt-3 font-serif text-base font-bold text-[#f5f0e6] group-hover:text-sky-300 transition-colors">
                  {monthlyChallenge.title}
                </h4>
                <p className="mt-2 text-xs text-[#9a93b8] line-clamp-3 leading-relaxed">
                  {monthlyChallenge.prompt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#9a93b8]">Gênero: {monthlyChallenge.genre}</span>
                <Button
                  size="sm"
                  onClick={() => setSelectedChallenge(monthlyChallenge)}
                  className="bg-sky-600 text-white hover:bg-sky-500 font-semibold text-xs"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ranking Local & Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Leaderboard Card */}
        <div className="lg:col-span-1 rounded-2xl border border-[#d4a94e]/20 bg-[#1c1930] p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#f5f0e6] flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#d4a94e]" />
              Ranking de Escritores
            </h3>
            <span className="text-[10px] text-[#9a93b8]">Top XP</span>
          </div>

          <div className="mt-4 space-y-2">
            {allWriters.slice(0, 8).map((writer, index) => {
              const rank = index + 1
              return (
                <div
                  key={writer.id}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                    writer.isUser
                      ? 'border border-[#d4a94e]/40 bg-[#d4a94e]/10 text-[#f5f0e6] font-semibold'
                      : 'bg-[#141226]/60 text-[#9a93b8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-sm w-4 text-center">
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c1930] text-[10px] font-bold text-[#d4a94e] border border-[#d4a94e]/30">
                      {writer.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-[#f5f0e6] truncate max-w-[110px]">
                        {writer.name} {writer.isUser && '(Você)'}
                      </p>
                      <p className="text-[9px] text-[#d4a94e] font-serif">{writer.title}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[#f5f0e6] font-bold">{writer.xp} XP</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bar Chart: Words Written */}
          <div className="rounded-2xl border border-[#d4a94e]/20 bg-[#1c1930] p-5 shadow-xl">
            <h3 className="font-serif text-base font-bold text-[#f5f0e6] mb-4">
              Palavras Escritas (Últimos 14 Dias)
            </h3>
            <div className="h-48 w-full">
              <ChartContainer
                config={{ palavras: { label: 'Palavras', color: 'hsl(var(--chart-1))' } }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataWords}>
                    <XAxis dataKey="dia" stroke="#9a93b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#9a93b8" fontSize={10} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="palavras" fill="#d4a94e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Donut Chart: Genres */}
          <div className="rounded-2xl border border-[#d4a94e]/20 bg-[#1c1930] p-5 shadow-xl flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2">
              <h3 className="font-serif text-base font-bold text-[#f5f0e6] mb-1">
                Desafios por Gênero
              </h3>
              <p className="text-xs text-[#9a93b8] mb-3">Distribuição das suas produções</p>
              <div className="space-y-1.5 text-xs">
                {genrePieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#9a93b8]">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="font-semibold text-[#f5f0e6]">{item.value} histórias</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-40 w-full sm:w-1/2 flex justify-center">
              <ChartContainer config={{ fantasy: { label: 'Gênero' } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genrePieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={4}
                    >
                      {genrePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>

      <ChallengeDetailModal
        challenge={selectedChallenge}
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
    </div>
  )
}
