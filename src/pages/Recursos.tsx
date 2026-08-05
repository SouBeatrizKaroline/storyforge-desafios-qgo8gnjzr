import { useState } from 'react'
import { useStoryForge } from '@/stores/storyforge-store'
import { WritingGuide } from '@/types/storyforge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Library, Search, Clock, BookOpen, CheckCircle } from 'lucide-react'

export default function Recursos() {
  const { guides, markGuideAsRead } = useStoryForge()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGuide, setSelectedGuide] = useState<WritingGuide | null>(null)

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#d4a94e]/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#f5f0e6] flex items-center gap-2">
            <Library className="h-6 w-6 text-[#d4a94e]" />
            Biblioteca de Recursos
          </h1>
          <p className="mt-1 text-sm text-[#9a93b8]">
            Guias práticos sobre técnicas narrativas, construção de mundos e desenvolvimento de
            prosa.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9a93b8]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar tutoriais e guias..."
            className="pl-9 bg-[#1c1930] border-[#d4a94e]/20 text-[#f5f0e6] placeholder:text-[#9a93b8]"
          />
        </div>
      </div>

      {/* Grid of guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="group relative flex flex-col justify-between rounded-xl border border-[#d4a94e]/20 bg-[#1c1930] p-5 cursor-pointer transition-all hover:-translate-y-1 hover:border-[#d4a94e]/50 hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-[#d4a94e]/30 text-[#d4a94e] text-[10px]">
                  {guide.category}
                </Badge>
                <span className="flex items-center gap-1 text-[11px] text-[#9a93b8]">
                  <Clock className="h-3 w-3" /> {guide.readTimeMinutes} min
                </span>
              </div>

              <h3 className="mt-3 font-serif text-base font-bold text-[#f5f0e6] group-hover:text-[#d4a94e] transition-colors">
                {guide.title}
              </h3>

              <p className="mt-2 text-xs text-[#9a93b8] leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#d4a94e]">
              <span className="flex items-center gap-1 font-semibold">
                <BookOpen className="h-3.5 w-3.5" /> Ler Guia
              </span>
              {guide.readStatus && (
                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                  <CheckCircle className="h-3 w-3" /> Lido
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reading Modal */}
      <Dialog open={!!selectedGuide} onOpenChange={(open) => !open && setSelectedGuide(null)}>
        {selectedGuide && (
          <DialogContent className="border-[#d4a94e]/30 bg-[#1c1930] text-[#f5f0e6] max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-[#d4a94e]/30 text-[#d4a94e]">
                  {selectedGuide.category}
                </Badge>
                <span className="text-xs text-[#9a93b8]">
                  {selectedGuide.readTimeMinutes} min de leitura
                </span>
              </div>
              <DialogTitle className="font-serif text-2xl font-bold text-[#f5f0e6]">
                {selectedGuide.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 my-4 text-sm text-[#f5f0e6] leading-relaxed">
              <p className="text-[#9a93b8] italic border-l-2 border-[#d4a94e] pl-3 py-1">
                {selectedGuide.summary}
              </p>

              {selectedGuide.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-serif text-base font-bold text-[#d4a94e]">{sec.title}</h3>
                  <p className="text-xs text-[#f5f0e6]/90 leading-relaxed">{sec.body}</p>

                  {sec.tips && sec.tips.length > 0 && (
                    <div className="rounded-lg bg-[#141226] p-3 border border-white/5 text-xs text-amber-300/90 space-y-1">
                      <p className="font-semibold text-amber-400">💡 Dica Prática:</p>
                      {sec.tips.map((tip, tIdx) => (
                        <p key={tIdx}>• {tip}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => {
                  markGuideAsRead(selectedGuide.id)
                  setSelectedGuide(null)
                }}
                className="bg-gradient-to-r from-[#d4a94e] to-[#b58a2e] text-[#0e0d1a] font-semibold"
              >
                Concluir Leitura
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
