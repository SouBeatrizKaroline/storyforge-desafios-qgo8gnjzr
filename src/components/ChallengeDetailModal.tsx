import { useState } from 'react'
import { Challenge } from '@/types/storyforge'
import { useStoryForge } from '@/stores/storyforge-store'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Coins, PenTool, CheckCircle, Star } from 'lucide-react'

interface ChallengeDetailModalProps {
  challenge: Challenge | null
  isOpen: boolean
  onClose: () => void
}

const GENRE_COLORS: Record<string, string> = {
  Fantasia: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  Romance: 'bg-pink-900/60 text-pink-300 border-pink-700/50',
  'Ficção Científica': 'bg-sky-900/60 text-sky-300 border-sky-700/50',
  Terror: 'bg-red-900/60 text-red-300 border-red-700/50',
  Drama: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
  Mistério: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  'Slice of Life': 'bg-yellow-900/60 text-yellow-300 border-yellow-700/50',
  Histórico: 'bg-amber-950/80 text-amber-400 border-amber-800/50',
  Infantil: 'bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700/50',
  Humor: 'bg-cyan-900/60 text-cyan-300 border-cyan-700/50',
}

const DIFF_COLORS: Record<string, string> = {
  Fácil: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40',
  Médio: 'bg-yellow-950/60 text-yellow-400 border-yellow-800/40',
  Difícil: 'bg-orange-950/60 text-orange-400 border-orange-800/40',
  'Muito Difícil': 'bg-red-950/60 text-red-400 border-red-800/40',
}

export function ChallengeDetailModal({ challenge, isOpen, onClose }: ChallengeDetailModalProps) {
  const navigate = useNavigate()
  const { completedChallenges, completeChallenge } = useStoryForge()
  const [showCompleteFlow, setShowCompleteFlow] = useState(false)
  const [wordCountInput, setWordCountInput] = useState<number>(challenge?.wordGoal || 500)
  const [effortRating, setEffortRating] = useState<number>(5)

  if (!challenge) return null

  const isCompleted = completedChallenges.some((cc) => cc.challengeId === challenge.id)

  const handleStartWriting = () => {
    onClose()
    navigate(`/editor?challengeId=${challenge.id}`)
  }

  const handleConfirmComplete = () => {
    completeChallenge(challenge.id, Number(wordCountInput) || 300, effortRating)
    setShowCompleteFlow(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-[#d4a94e]/30 bg-[#1c1930] text-[#f5f0e6] max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className={GENRE_COLORS[challenge.genre] || ''}>
              {challenge.genre}
            </Badge>
            <Badge variant="outline" className={DIFF_COLORS[challenge.difficulty] || ''}>
              {challenge.difficulty}
            </Badge>
            <Badge variant="outline" className="border-[#d4a94e]/30 text-[#d4a94e] bg-[#141226]">
              {challenge.type}
            </Badge>
            {isCompleted && (
              <Badge className="bg-emerald-600 text-white ml-auto">
                <CheckCircle className="mr-1 h-3 w-3" /> Concluído
              </Badge>
            )}
          </div>
          <DialogTitle className="font-serif text-xl font-bold text-[#f5f0e6]">
            {challenge.title}
          </DialogTitle>
          <DialogDescription className="text-[#9a93b8]">
            Meta recomendada: ~{challenge.wordGoal} palavras
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 rounded-xl border border-[#d4a94e]/15 bg-[#141226] p-4 text-sm leading-relaxed text-[#f5f0e6]">
          {challenge.prompt}
        </div>

        {/* Rewards summary */}
        <div className="flex items-center justify-between rounded-lg bg-[#141226]/60 p-3 text-xs border border-white/5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-[#d4a94e]">
              <Sparkles className="h-4 w-4" /> +{challenge.xpReward} XP
            </span>
            <span className="flex items-center gap-1 font-semibold text-amber-400">
              <Coins className="h-4 w-4" /> +{challenge.coinsReward} Moedas
            </span>
          </div>
        </div>

        {showCompleteFlow ? (
          <div className="mt-4 space-y-4 rounded-xl border border-[#d4a94e]/30 bg-[#141226] p-4">
            <h4 className="font-serif text-sm font-bold text-[#d4a94e]">Registrar Conclusão</h4>
            <div>
              <label className="text-xs text-[#9a93b8]">Palavras escritas:</label>
              <input
                type="number"
                value={wordCountInput}
                onChange={(e) => setWordCountInput(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-[#d4a94e]/20 bg-[#1c1930] px-3 py-1.5 text-sm text-[#f5f0e6] focus:outline-none focus:ring-1 focus:ring-[#d4a94e]"
              />
            </div>
            <div>
              <label className="text-xs text-[#9a93b8]">Auto-avaliação do Esforço:</label>
              <div className="mt-1 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEffortRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= effortRating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowCompleteFlow(false)}>
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmComplete}
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Confirmar & Ganhar XP
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleStartWriting}
              className="flex-1 bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-semibold hover:brightness-110"
            >
              <PenTool className="mr-2 h-4 w-4" />
              Escrever no Editor
            </Button>

            {!isCompleted && (
              <Button
                variant="outline"
                onClick={() => setShowCompleteFlow(true)}
                className="border-[#d4a94e]/30 text-[#f5f0e6] hover:bg-[#d4a94e]/10"
              >
                Concluir Direto
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
