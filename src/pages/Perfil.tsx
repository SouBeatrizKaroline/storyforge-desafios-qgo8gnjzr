import { useState } from 'react'
import { useStoryForge } from '@/stores/storyforge-store'
import { LEVEL_TITLES, MEDALS } from '@/lib/storage-seed'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { User, Trophy, Award, Sparkles, Coins, Flame, CheckCircle2, Lock } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function Perfil() {
  const { profile, updateProfile, equipTitle, completedChallenges } = useStoryForge()
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(profile.name)

  const totalWords = completedChallenges.reduce((acc, curr) => acc + curr.wordCount, 0)

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateProfile({ name: nameInput.trim() })
    }
    setIsEditingName(false)
  }

  return (
    <div className="space-y-8">
      {/* Header Profile Card */}
      <div className="rounded-2xl border border-[#d4a94e]/30 bg-gradient-to-r from-[#1c1930] via-[#141226] to-[#1c1930] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#d4a94e]/20 text-[#d4a94e] font-serif text-2xl font-bold border-2 border-[#d4a94e]/40 shadow-lg">
            {profile.avatar}
          </div>

          <div className="flex-1 text-center sm:text-left">
            {isEditingName ? (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-[#141226] border-[#d4a94e]/40 text-[#f5f0e6] h-9 max-w-xs text-sm"
                />
                <Button size="sm" onClick={handleSaveName} className="bg-[#d4a94e] text-[#0e0d1a]">
                  Salvar
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#f5f0e6]">{profile.name}</h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-[#9a93b8] hover:text-[#d4a94e] underline ml-2"
                >
                  Editar
                </button>
              </div>
            )}

            <p className="mt-1 font-serif text-sm text-[#d4a94e] font-semibold">
              {profile.equippedTitle}
            </p>

            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-400 bg-[#141226] px-3 py-1.5 rounded-lg border border-white/5">
                <Coins className="h-4 w-4" /> <span>{profile.coins} Moedas</span>
              </div>
              <div className="flex items-center gap-1 text-orange-400 bg-[#141226] px-3 py-1.5 rounded-lg border border-white/5">
                <Flame className="h-4 w-4" /> <span>{profile.streak} dias de Sequência</span>
              </div>
              <div className="flex items-center gap-1 text-purple-400 bg-[#141226] px-3 py-1.5 rounded-lg border border-white/5">
                <Sparkles className="h-4 w-4" /> <span>{profile.xp} XP acumulado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="titulos" className="w-full">
        <TabsList className="bg-[#1c1930] border border-[#d4a94e]/20 p-1 text-[#9a93b8]">
          <TabsTrigger
            value="titulos"
            className="data-[state=active]:bg-[#d4a94e] data-[state=active]:text-[#0e0d1a] font-semibold text-xs"
          >
            Títulos Honoríficos
          </TabsTrigger>
          <TabsTrigger
            value="medalhas"
            className="data-[state=active]:bg-[#d4a94e] data-[state=active]:text-[#0e0d1a] font-semibold text-xs"
          >
            Medalhas de Especialista
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="data-[state=active]:bg-[#d4a94e] data-[state=active]:text-[#0e0d1a] font-semibold text-xs"
          >
            Estatísticas Globais
          </TabsTrigger>
        </TabsList>

        {/* Titles Tab */}
        <TabsContent value="titulos" className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEVEL_TITLES.map((lt) => {
              const isUnlocked = profile.unlockedTitles.includes(lt.title)
              const isEquipped = profile.equippedTitle === lt.title

              return (
                <div
                  key={lt.title}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                    isEquipped
                      ? 'border-[#d4a94e] bg-[#d4a94e]/10 text-[#f5f0e6]'
                      : isUnlocked
                        ? 'border-white/10 bg-[#1c1930] text-[#f5f0e6]'
                        : 'border-white/5 bg-[#141226]/50 text-[#9a93b8] opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-[#f5f0e6]">{lt.title}</h3>
                      {isEquipped && (
                        <Badge className="bg-[#d4a94e] text-[#0e0d1a] text-[9px]">Equipado</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#9a93b8]">{lt.description}</p>
                    <p className="mt-1 text-[10px] text-[#d4a94e]">Exige: {lt.requiredXp} XP</p>
                  </div>

                  {isUnlocked ? (
                    !isEquipped && (
                      <Button
                        size="sm"
                        onClick={() => equipTitle(lt.title)}
                        variant="outline"
                        className="border-[#d4a94e]/40 text-[#d4a94e] text-xs"
                      >
                        Equipar
                      </Button>
                    )
                  ) : (
                    <Lock className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Medals Tab */}
        <TabsContent value="medalhas" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEDALS.map((medal) => {
              const isUnlocked = profile.unlockedMedals.includes(medal.id)

              return (
                <div
                  key={medal.id}
                  className={`flex items-center gap-3 rounded-xl border p-4 ${
                    isUnlocked
                      ? 'border-amber-500/40 bg-amber-950/20 text-[#f5f0e6]'
                      : 'border-white/5 bg-[#141226]/50 text-[#9a93b8] opacity-50'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${isUnlocked ? 'bg-amber-400/20 text-amber-400' : 'bg-gray-800 text-gray-500'}`}
                  >
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#f5f0e6]">{medal.title}</h4>
                    <p className="text-xs text-[#9a93b8]">{medal.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#1c1930] p-4 text-center">
              <p className="text-xs text-[#9a93b8]">Desafios Concluídos</p>
              <p className="font-serif text-2xl font-bold text-[#d4a94e] mt-1">
                {completedChallenges.length}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1c1930] p-4 text-center">
              <p className="text-xs text-[#9a93b8]">Total de Palavras</p>
              <p className="font-serif text-2xl font-bold text-[#d4a94e] mt-1">{totalWords}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1c1930] p-4 text-center">
              <p className="text-xs text-[#9a93b8]">Maior Sequência</p>
              <p className="font-serif text-2xl font-bold text-[#d4a94e] mt-1">
                {profile.bestStreak}d
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1c1930] p-4 text-center">
              <p className="text-xs text-[#9a93b8]">XP Total</p>
              <p className="font-serif text-2xl font-bold text-[#d4a94e] mt-1">{profile.xp}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
