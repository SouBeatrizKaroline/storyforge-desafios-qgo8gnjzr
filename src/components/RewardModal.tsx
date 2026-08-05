import { useStoryForge } from '@/stores/storyforge-store'
import { Button } from '@/components/ui/button'
import { Sparkles, Coins, Trophy, Award, CheckCircle2 } from 'lucide-react'

export function RewardModal() {
  const { rewardModalData, closeRewardModal } = useStoryForge()

  if (!rewardModalData) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#d4a94e]/40 bg-[#1c1930] p-6 shadow-2xl text-center">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d4a94e]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#d4a94e] to-[#facc15] text-[#0e0d1a] shadow-lg animate-bounce">
          <Sparkles className="h-8 w-8" />
        </div>

        <h2 className="font-serif text-2xl font-bold text-[#f5f0e6]">Desafio Concluído!</h2>
        <p className="mt-1 text-sm text-[#9a93b8]">
          Você forjou mais uma página da sua jornada literária.
        </p>

        {/* Rewards grid */}
        <div className="my-6 grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#d4a94e]/20 bg-[#141226] p-3 shadow-inner">
            <span className="text-xs uppercase tracking-wider text-[#9a93b8]">XP Ganho</span>
            <div className="mt-1 flex items-center gap-1.5 font-serif text-2xl font-bold text-[#d4a94e]">
              <span>+{rewardModalData.xp}</span>
              <Sparkles className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-[#d4a94e]/20 bg-[#141226] p-3 shadow-inner">
            <span className="text-xs uppercase tracking-wider text-[#9a93b8]">Moedas</span>
            <div className="mt-1 flex items-center gap-1.5 font-serif text-2xl font-bold text-amber-400">
              <span>+{rewardModalData.coins}</span>
              <Coins className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Unlocked items */}
        {rewardModalData.unlockedAchievements.length > 0 && (
          <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Trophy className="h-4 w-4" />
              <span>Nova Conquista Desbloqueada!</span>
            </div>
            {rewardModalData.unlockedAchievements.map((ach) => (
              <p key={ach.id} className="mt-1 font-serif text-sm font-medium text-[#f5f0e6]">
                {ach.title}
              </p>
            ))}
          </div>
        )}

        {rewardModalData.unlockedTitles.length > 0 && (
          <div className="mb-4 rounded-xl border border-purple-500/30 bg-purple-950/30 p-3 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <Award className="h-4 w-4" />
              <span>Novo Título Alcançado!</span>
            </div>
            {rewardModalData.unlockedTitles.map((title) => (
              <p key={title} className="mt-1 font-serif text-sm font-medium text-[#f5f0e6]">
                {title}
              </p>
            ))}
          </div>
        )}

        <Button
          onClick={closeRewardModal}
          className="w-full bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-semibold hover:brightness-110 shadow-md"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Continuar Jornada
        </Button>
      </div>
    </div>
  )
}
