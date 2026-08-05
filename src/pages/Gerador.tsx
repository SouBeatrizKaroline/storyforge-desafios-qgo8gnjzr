import { useState } from 'react'
import { GENERATOR_POOLS } from '@/lib/storage-seed'
import { GeneratorOptions } from '@/types/storyforge'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sparkles, RefreshCw, PenTool, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Gerador() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [isForging, setIsForging] = useState(false)

  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

  const [options, setOptions] = useState<GeneratorOptions>(() => ({
    theme: getRandomItem(GENERATOR_POOLS.themes),
    genre: getRandomItem(GENERATOR_POOLS.genres),
    emotion: getRandomItem(GENERATOR_POOLS.emotions),
    character: getRandomItem(GENERATOR_POOLS.characters),
    setting: getRandomItem(GENERATOR_POOLS.settings),
    mandatoryObject: getRandomItem(GENERATOR_POOLS.objects),
    mandatoryWord: getRandomItem(GENERATOR_POOLS.mandatoryWords),
    forbiddenWord: getRandomItem(GENERATOR_POOLS.forbiddenWords),
    wordLimit: getRandomItem(GENERATOR_POOLS.wordLimits),
  }))

  const handleForgeAll = () => {
    setIsForging(true)
    setTimeout(() => {
      setOptions({
        theme: getRandomItem(GENERATOR_POOLS.themes),
        genre: getRandomItem(GENERATOR_POOLS.genres),
        emotion: getRandomItem(GENERATOR_POOLS.emotions),
        character: getRandomItem(GENERATOR_POOLS.characters),
        setting: getRandomItem(GENERATOR_POOLS.settings),
        mandatoryObject: getRandomItem(GENERATOR_POOLS.objects),
        mandatoryWord: getRandomItem(GENERATOR_POOLS.mandatoryWords),
        forbiddenWord: getRandomItem(GENERATOR_POOLS.forbiddenWords),
        wordLimit: getRandomItem(GENERATOR_POOLS.wordLimits),
      })
      setIsForging(false)
    }, 400)
  }

  const reRollField = (field: keyof GeneratorOptions) => {
    let pool: any[] = []
    if (field === 'theme') pool = GENERATOR_POOLS.themes
    if (field === 'genre') pool = GENERATOR_POOLS.genres
    if (field === 'emotion') pool = GENERATOR_POOLS.emotions
    if (field === 'character') pool = GENERATOR_POOLS.characters
    if (field === 'setting') pool = GENERATOR_POOLS.settings
    if (field === 'mandatoryObject') pool = GENERATOR_POOLS.objects
    if (field === 'mandatoryWord') pool = GENERATOR_POOLS.mandatoryWords
    if (field === 'forbiddenWord') pool = GENERATOR_POOLS.forbiddenWords
    if (field === 'wordLimit') pool = GENERATOR_POOLS.wordLimits

    setOptions((prev) => ({ ...prev, [field]: getRandomItem(pool) }))
  }

  const compiledPrompt = `Escreva um conto de ${options.genre} sobre ${options.theme.toLowerCase()}, ambientado em ${options.setting.toLowerCase()}, estrelando ${options.character.toLowerCase()}, evocando ${options.emotion.toLowerCase()}. Inclua o objeto '${options.mandatoryObject}' e a palavra obrigatoria '${options.mandatoryWord}', sem utilizar a palavra '${options.forbiddenWord}'. Limite maximo: ${options.wordLimit} palavras.`

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledPrompt)
    setCopied(true)
    toast({ title: 'Copiado para a área de transferência!' })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWrite = () => {
    navigate(`/editor?customPrompt=${encodeURIComponent(compiledPrompt)}`)
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#d4a94e] to-[#facc15] text-[#0e0d1a] shadow-lg shadow-[#d4a94e]/20">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#f5f0e6]">A Forja de Desafios</h1>
        <p className="mt-2 text-sm text-[#9a93b8]">
          Gere combinações únicas e imprevisíveis de elementos para treinar sua criatividade.
        </p>

        <Button
          onClick={handleForgeAll}
          disabled={isForging}
          className="mt-6 bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-bold px-8 py-6 text-base hover:brightness-110 shadow-lg shadow-[#d4a94e]/20"
        >
          <Sparkles className={`mr-2 h-5 w-5 ${isForging ? 'animate-spin' : ''}`} />
          {isForging ? 'Forjando...' : 'Forjar Novo Desafio'}
        </Button>
      </div>

      {/* Grid of elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Gênero Literário', key: 'genre', val: options.genre },
          { label: 'Tema Central', key: 'theme', val: options.theme },
          { label: 'Emoção / Tom', key: 'emotion', val: options.emotion },
          { label: 'Arquétipo de Personagem', key: 'character', val: options.character },
          { label: 'Cenário / Ambientação', key: 'setting', val: options.setting },
          { label: 'Objeto Obrigatório', key: 'mandatoryObject', val: options.mandatoryObject },
          { label: 'Palavra Obrigatória', key: 'mandatoryWord', val: options.mandatoryWord },
          { label: 'Palavra Proibida', key: 'forbiddenWord', val: options.forbiddenWord },
          { label: 'Limite de Palavras', key: 'wordLimit', val: `${options.wordLimit} palavras` },
        ].map((item) => (
          <div
            key={item.key}
            className="group relative rounded-xl border border-[#d4a94e]/20 bg-[#1c1930] p-4 transition-all hover:border-[#d4a94e]/50"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider text-[#d4a94e] font-semibold">
                {item.label}
              </span>
              <button
                onClick={() => reRollField(item.key as any)}
                title="Gerar novamente este elemento"
                className="text-[#9a93b8] hover:text-[#d4a94e] transition-colors p-1"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="font-serif text-sm font-semibold text-[#f5f0e6]">{item.val}</p>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="rounded-2xl border border-[#d4a94e]/30 bg-[#141226] p-6 shadow-xl space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#d4a94e] flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Resumo do Desafio Forjado
        </h3>
        <p className="text-sm text-[#f5f0e6] leading-relaxed italic bg-[#1c1930] p-4 rounded-xl border border-white/5">
          "{compiledPrompt}"
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            onClick={handleWrite}
            className="bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-semibold"
          >
            <PenTool className="mr-2 h-4 w-4" /> Começar a Escrever
          </Button>

          <Button
            variant="outline"
            onClick={handleCopy}
            className="border-[#d4a94e]/30 text-[#f5f0e6] hover:bg-[#d4a94e]/10"
          >
            {copied ? (
              <Check className="mr-2 h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? 'Copiado!' : 'Copiar Desafio'}
          </Button>
        </div>
      </div>
    </div>
  )
}
