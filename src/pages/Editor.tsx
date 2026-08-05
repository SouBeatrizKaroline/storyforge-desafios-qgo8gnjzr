import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStoryForge } from '@/stores/storyforge-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  PenTool,
  Save,
  Maximize2,
  Minimize2,
  CheckCircle,
  History,
  Sparkles,
  Eye,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Editor() {
  const [searchParams] = useSearchParams()
  const challengeId = searchParams.get('challengeId')
  const customPrompt = searchParams.get('customPrompt')

  const { challenges, saveDraft, completeChallenge, logWritingActivity } = useStoryForge()
  const { toast } = useToast()

  const challenge = challengeId ? challenges.find((c) => c.id === challengeId) : null

  const [title, setTitle] = useState('Minha Nova História')
  const [content, setContent] = useState('')
  const [draftId, setDraftId] = useState<string>(`draft-${Date.now()}`)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [lastSavedText, setLastSavedText] = useState('Não salvo')
  const [timerSeconds, setTimerSeconds] = useState(0)

  const activePromptText = challenge
    ? challenge.prompt
    : customPrompt
      ? decodeURIComponent(customPrompt)
      : null

  // Live word counter
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length

  // Auto-save timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (content.trim().length > 0) {
        saveDraft({
          id: draftId,
          title,
          content,
          wordCount,
          challengeId: challenge?.id,
          challengePrompt: activePromptText || undefined,
        })
        setLastSavedText(
          `Salvo às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
        )
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [content, title, draftId, wordCount, challenge, activePromptText, saveDraft])

  // Writing Timer
  useEffect(() => {
    const timer = setInterval(() => setTimerSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleManualSave = () => {
    saveDraft({
      id: draftId,
      title,
      content,
      wordCount,
      challengeId: challenge?.id,
      challengePrompt: activePromptText || undefined,
    })
    logWritingActivity(wordCount, Math.max(1, Math.floor(timerSeconds / 60)))
    setLastSavedText(`Versão gravada às ${new Date().toLocaleTimeString('pt-BR')}`)
    toast({ title: 'Rascunho salvo com sucesso!' })
  }

  const handleFinish = () => {
    if (wordCount < 10) {
      toast({ title: 'Escreva um pouco mais antes de concluir!', variant: 'destructive' })
      return
    }
    if (challenge) {
      completeChallenge(challenge.id, wordCount, 5, content)
    } else {
      logWritingActivity(wordCount, Math.max(1, Math.floor(timerSeconds / 60)))
      toast({ title: 'História finalizada e registrada no seu diário!' })
    }
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className={`space-y-4 transition-all ${isFocusMode ? 'p-2 max-w-4xl mx-auto' : ''}`}>
      {/* Context Banner if challenge attached */}
      {activePromptText && !isFocusMode && (
        <div className="rounded-xl border border-[#d4a94e]/30 bg-[#141226] p-4 text-xs text-[#f5f0e6]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-[#d4a94e] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Contexto do Desafio
            </span>
            {challenge && (
              <Badge variant="outline" className="text-[10px] border-[#d4a94e]/30 text-[#d4a94e]">
                {challenge.genre}
              </Badge>
            )}
          </div>
          <p className="italic text-[#9a93b8]">{activePromptText}</p>
        </div>
      )}

      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1c1930] p-3 rounded-xl border border-[#d4a94e]/15">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da História..."
          className="bg-transparent font-serif text-lg font-bold text-[#f5f0e6] focus:outline-none focus:border-b border-[#d4a94e]/40 max-w-xs"
        />

        <div className="flex items-center gap-4 text-xs text-[#9a93b8]">
          <span>
            <strong>{wordCount}</strong> palavras
          </span>
          <span>
            <strong>{charCount}</strong> caract.
          </span>
          <span>
            Tempo: <strong>{formatTimer(timerSeconds)}</strong>
          </span>
          <span className="text-[10px] text-emerald-400 hidden sm:inline">{lastSavedText}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`text-xs ${isFocusMode ? 'text-[#d4a94e]' : 'text-[#9a93b8]'}`}
          >
            <Eye className="mr-1 h-3.5 w-3.5" /> {isFocusMode ? 'Sair Foco' : 'Modo Foco'}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleManualSave}
            className="border-[#d4a94e]/20 text-[#f5f0e6] hover:bg-[#d4a94e]/10 text-xs"
          >
            <Save className="mr-1 h-3.5 w-3.5" /> Salvar
          </Button>

          <Button
            size="sm"
            onClick={handleFinish}
            className="bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-semibold text-xs"
          >
            <CheckCircle className="mr-1 h-3.5 w-3.5" /> Concluir
          </Button>
        </div>
      </div>

      {/* Parchment Writing Area */}
      <div className="relative rounded-2xl border border-[#d4a94e]/25 bg-[#141226] p-6 shadow-2xl">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comece a escrever a sua obra-prima aqui..."
          className="min-h-[500px] w-full resize-y bg-transparent font-serif text-base leading-relaxed text-[#f5f0e6] placeholder:text-[#9a93b8]/50 focus-visible:ring-0 border-none p-2"
        />
      </div>
    </div>
  )
}
