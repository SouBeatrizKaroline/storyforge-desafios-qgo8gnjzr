import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useStoryForge } from '@/stores/storyforge-store'
import { ParticleBackground } from '@/components/ParticleBackground'
import { RewardModal } from '@/components/RewardModal'
import {
  Home,
  BookOpen,
  Sparkles,
  Calendar as CalendarIcon,
  PenTool,
  Library,
  User,
  Trophy,
  Menu,
  Flame,
  Coins,
  ChevronRight,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'
import { LEVEL_TITLES } from '@/lib/storage-seed'

const NAV_ITEMS = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
  { path: '/gerador', label: 'Gerador', icon: Sparkles },
  { path: '/calendario', label: 'Calendário', icon: CalendarIcon },
  { path: '/editor', label: 'Editor', icon: PenTool },
  { path: '/recursos', label: 'Recursos', icon: Library },
  { path: '/conquistas', label: 'Conquistas', icon: Trophy },
  { path: '/perfil', label: 'Perfil', icon: User },
]

export function Layout() {
  const { profile } = useStoryForge()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Level calculations
  const currentTitleObj =
    LEVEL_TITLES.find((t) => t.title === profile.equippedTitle) || LEVEL_TITLES[0]
  const nextTitleIndex = LEVEL_TITLES.findIndex((t) => t.title === currentTitleObj.title) + 1
  const nextTitleObj = LEVEL_TITLES[nextTitleIndex] || LEVEL_TITLES[LEVEL_TITLES.length - 1]

  const currentLevelXpFloor = currentTitleObj.requiredXp
  const nextLevelXpCap = nextTitleObj.requiredXp || currentLevelXpFloor + 1000
  const xpInCurrentLevel = Math.max(0, profile.xp - currentLevelXpFloor)
  const xpNeededInCurrentLevel = Math.max(1, nextLevelXpCap - currentLevelXpFloor)
  const xpProgressPercent = Math.min(
    100,
    Math.floor((xpInCurrentLevel / xpNeededInCurrentLevel) * 100),
  )

  return (
    <div className="relative min-h-screen bg-[#0e0d1a] text-[#f5f0e6] font-sans antialiased selection:bg-[#d4a94e] selection:text-[#0e0d1a]">
      <ParticleBackground />
      <RewardModal />

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#d4a94e]/15 lg:bg-[#141226]/95 lg:backdrop-blur-md">
        {/* Brand */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#d4a94e] to-[#facc15] text-[#0e0d1a] shadow-md shadow-[#d4a94e]/20">
            <PenTool className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight text-[#f5f0e6]">
              StoryForge
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#d4a94e]">
              Desafios de Escrita
            </p>
          </div>
        </div>

        <div className="mx-6 my-2 h-[1px] bg-gradient-to-r from-transparent via-[#d4a94e]/20 to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-l-4 border-[#d4a94e] bg-[#1c1930] text-[#f5f0e6] shadow-sm shadow-[#d4a94e]/10'
                      : 'text-[#9a93b8] hover:bg-[#1c1930]/50 hover:text-[#f5f0e6]'
                  }`
                }
              >
                <Icon
                  className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#d4a94e]' : 'text-[#9a93b8]'}`}
                />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* User Card at Sidebar Bottom */}
        <div
          className="p-4 m-3 rounded-2xl border border-[#d4a94e]/20 bg-[#1c1930] shadow-inner cursor-pointer hover:border-[#d4a94e]/40 transition-colors"
          onClick={() => navigate('/perfil')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4a94e]/20 font-serif font-bold text-[#d4a94e] text-xs border border-[#d4a94e]/40">
                {profile.avatar}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-semibold text-[#f5f0e6]">{profile.name}</p>
                <p className="text-[10px] text-[#d4a94e] font-serif">{profile.equippedTitle}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#9a93b8]" />
          </div>

          {/* XP Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-[#9a93b8] mb-1">
              <span>{profile.xp} XP</span>
              <span>{nextTitleObj.requiredXp} XP</span>
            </div>
            <Progress value={xpProgressPercent} className="h-1.5 bg-[#141226]" />
          </div>

          {/* Stats pills */}
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px]">
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <Coins className="h-3.5 w-3.5" />
              <span>{profile.coins}</span>
            </div>
            <div className="flex items-center gap-1 text-orange-400 font-medium">
              <Flame className="h-3.5 w-3.5 fill-orange-400/20 animate-pulse" />
              <span>{profile.streak}d</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#d4a94e]/15 bg-[#141226]/90 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="rounded-lg p-2 text-[#9a93b8] hover:bg-[#1c1930] hover:text-[#f5f0e6]">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-[#d4a94e]/20 bg-[#141226] p-0 text-[#f5f0e6]"
            >
              <div className="flex items-center gap-3 p-6 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#d4a94e] to-[#facc15] text-[#0e0d1a]">
                  <PenTool className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="font-serif text-lg font-bold text-[#f5f0e6]">StoryForge</h1>
                  <p className="text-[9px] uppercase tracking-widest text-[#d4a94e]">
                    Desafios de Escrita
                  </p>
                </div>
              </div>

              <nav className="space-y-1 px-4 py-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                          isActive ? 'bg-[#1c1930] text-[#d4a94e]' : 'text-[#9a93b8]'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <span className="font-serif text-lg font-bold text-[#f5f0e6]">StoryForge</span>
        </div>

        {/* Mobile Header Right Badges */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1 text-amber-400 bg-[#1c1930] px-2.5 py-1 rounded-full border border-amber-400/20">
            <Coins className="h-3.5 w-3.5" />
            <span>{profile.coins}</span>
          </div>
          <div className="flex items-center gap-1 text-orange-400 bg-[#1c1930] px-2.5 py-1 rounded-full border border-orange-400/20">
            <Flame className="h-3.5 w-3.5" />
            <span>{profile.streak}d</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:ml-64 lg:p-8 animate-fade-in-up">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#d4a94e]/10 py-6 text-center text-xs text-[#9a93b8] lg:ml-64">
        <p className="font-serif tracking-widest text-[#d4a94e]/80">ESCREVA. EVOLUA. CONQUISTE.</p>
        <p className="mt-1">StoryForge © Desafios de Escrita Criativa</p>
      </footer>
    </div>
  )
}

export default Layout
