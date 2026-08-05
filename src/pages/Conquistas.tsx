import { useStoryForge } from '@/stores/storyforge-store'
import { Trophy, CheckCircle, Lock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function Conquistas() {
  const { achievements } = useStoryForge()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#d4a94e]/15 pb-4">
        <h1 className="font-serif text-2xl font-bold text-[#f5f0e6] flex items-center gap-2">
          <Trophy className="h-6 w-6 text-[#d4a94e]" />
          Quadro de Conquistas
        </h1>
        <p className="mt-1 text-sm text-[#9a93b8]">
          Desbloqueie marcas importantes na sua carreira literária e ganhe recompensas em XP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => {
          const progressPercent = Math.min(
            100,
            Math.floor((ach.currentProgress / ach.targetCount) * 100),
          )

          return (
            <div
              key={ach.id}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-all ${
                ach.unlocked
                  ? 'border-amber-500/40 bg-amber-950/20 text-[#f5f0e6]'
                  : 'border-white/10 bg-[#1c1930] text-[#9a93b8]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-base font-bold text-[#f5f0e6] flex items-center gap-2">
                    {ach.unlocked ? (
                      <CheckCircle className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Lock className="h-4 w-4 text-gray-500" />
                    )}
                    {ach.title}
                  </span>
                  <span className="text-xs font-semibold text-[#d4a94e]">+{ach.xpReward} XP</span>
                </div>

                <p className="text-xs text-[#9a93b8] leading-relaxed">{ach.description}</p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-[#9a93b8] mb-1">
                  <span>Progresso</span>
                  <span>
                    {ach.currentProgress} / {ach.targetCount}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-1.5 bg-[#141226]" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
