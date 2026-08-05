/* Main App Component - Handles routing and global storyforge provider */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoryForgeProvider } from '@/stores/storyforge-store'

import Layout from './components/Layout'
import Index from './pages/Index'
import Biblioteca from './pages/Biblioteca'
import Gerador from './pages/Gerador'
import Calendario from './pages/Calendario'
import Editor from './pages/Editor'
import Recursos from './pages/Recursos'
import Perfil from './pages/Perfil'
import Conquistas from './pages/Conquistas'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <StoryForgeProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/gerador" element={<Gerador />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/conquistas" element={<Conquistas />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StoryForgeProvider>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
