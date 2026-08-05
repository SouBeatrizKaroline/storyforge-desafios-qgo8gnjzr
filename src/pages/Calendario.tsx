import { useState } from 'react'
import { useStoryForge } from '@/stores/storyforge-store'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Calendario() {
  const { activityLogs, completedChallenges, profile } = useStoryForge()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedChallengeDay] = useState<string | null>(
    new Date().toISOString().split('T')[0],
  )

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  // Map activities by date string
  const logsMap = new Map<string, (typeof activityLogs)[0]>()
  activityLogs.forEach((l) => logsMap.set(l.date, l))

  const dayDetails = selectedDay ? logsMap.get(selectedDay) : null
  const completedOnSelectedDay = completedChallenges.filter((cc) => cc.completedAt === selectedDay)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#d4a94e]/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#f5f0e6] flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-[#d4a94e]" />
            Calendário de Atividades
          </h1>
          <p className="mt-1 text-sm text-[#9a93b8]">
            Acompanhe sua disciplina diária e histórico de contos concluídos.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-3 bg-[#1c1930] px-4 py-2 rounded-xl border border-[#d4a94e]/20 text-xs">
          <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
            <Flame className="h-4 w-4" />
            <span>{profile.streak} dias de sequência</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 rounded-2xl border border-[#d4a94e]/20 bg-[#1c1930] p-6 shadow-xl">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-bold text-[#f5f0e6] capitalize">{monthName}</h2>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={handlePrevMonth}
                className="text-[#9a93b8] hover:text-[#f5f0e6]"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleNextMonth}
                className="text-[#9a93b8] hover:text-[#f5f0e6]"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#9a93b8] mb-2">
            <span>Dom</span>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-12 rounded-lg bg-[#141226]/30 opacity-20" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
              const activity = logsMap.get(dateStr)
              const isSelected = selectedDay === dateStr
              const isToday = dateStr === new Date().toISOString().split('T')[0]

              const hasWords = activity && activity.wordsWritten > 0
              const hasCompleted = activity && activity.challengesCompleted > 0

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedChallengeDay(dateStr)}
                  className={`relative flex flex-col items-center justify-between h-12 p-1.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'border-[#d4a94e] bg-[#d4a94e]/20 text-[#f5f0e6] shadow-md'
                      : isToday
                        ? 'border-amber-500/50 bg-[#141226] text-[#d4a94e]'
                        : hasWords
                          ? 'border-emerald-500/30 bg-emerald-950/20 text-[#f5f0e6]'
                          : 'border-white/5 bg-[#141226]/60 text-[#9a93b8] hover:border-white/20'
                  }`}
                >
                  <span className={`font-semibold ${isToday ? 'text-[#d4a94e]' : ''}`}>
                    {dayNum}
                  </span>

                  <div className="flex items-center gap-1">
                    {hasCompleted && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-sm" />
                    )}
                    {hasWords && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Day Details */}
        <div className="rounded-2xl border border-[#d4a94e]/20 bg-[#1c1930] p-6 shadow-xl space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#d4a94e] border-b border-white/5 pb-2">
            Detalhes do Dia {selectedDay ? selectedDay.split('-').reverse().join('/') : ''}
          </h3>

          {dayDetails ? (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/5 bg-[#141226] p-3">
                  <p className="text-[#9a93b8]">Palavras Escritas</p>
                  <p className="font-serif text-lg font-bold text-[#f5f0e6]">
                    {dayDetails.wordsWritten}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#141226] p-3">
                  <p className="text-[#9a93b8]">Minutos de Escrita</p>
                  <p className="font-serif text-lg font-bold text-[#f5f0e6]">
                    {dayDetails.minutesSpent} min
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#f5f0e6] mb-2">Desafios Concluídos:</h4>
                {completedOnSelectedDay.length > 0 ? (
                  <div className="space-y-2">
                    {completedOnSelectedDay.map((cc) => (
                      <div
                        key={cc.id}
                        className="flex items-center justify-between rounded-lg bg-[#141226] p-2.5 border border-emerald-500/20"
                      >
                        <span className="flex items-center gap-2 text-emerald-400 font-medium">
                          <CheckCircle2 className="h-4 w-4" /> Desafio Concluído
                        </span>
                        <span className="text-[#9a93b8]">{cc.wordCount} palavras</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#9a93b8] italic">Nenhum desafio registrado neste dia.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#9a93b8] italic">
              Nenhuma atividade registrada nesta data.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
