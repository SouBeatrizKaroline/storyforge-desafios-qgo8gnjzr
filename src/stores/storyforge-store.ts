import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  UserProfile,
  Challenge,
  CompletedChallenge,
  ActivityLog,
  Achievement,
  RivalWriter,
  StoryDraft,
  WritingGuide,
} from '@/types/storyforge'
import {
  INITIAL_PROFILE,
  INITIAL_RIVALS,
  MEDALS,
  INITIAL_ACHIEVEMENTS,
  LEVEL_TITLES,
  generateSeedChallenges,
  WRITING_GUIDES,
} from '@/lib/storage-seed'

interface RewardPayload {
  xp: number
  coins: number
  unlockedAchievements: Achievement[]
  unlockedTitles: string[]
  unlockedMedals: string[]
}

interface StoryForgeContextType {
  profile: UserProfile
  challenges: Challenge[]
  completedChallenges: CompletedChallenge[]
  activityLogs: ActivityLog[]
  achievements: Achievement[]
  rivals: RivalWriter[]
  drafts: StoryDraft[]
  guides: WritingGuide[]
  rewardModalData: RewardPayload | null
  closeRewardModal: () => void
  completeChallenge: (
    challengeId: string,
    wordCount: number,
    effortRating: number,
    storyText?: string,
  ) => RewardPayload
  updateProfile: (updated: Partial<UserProfile>) => void
  equipTitle: (title: string) => void
  saveDraft: (draft: Partial<StoryDraft> & { id?: string }) => StoryDraft
  markGuideAsRead: (guideId: string) => void
  getDailyChallenge: () => Challenge | undefined
  getWeeklyChallenge: () => Challenge | undefined
  getMonthlyChallenge: () => Challenge | undefined
  logWritingActivity: (wordsCount: number, minutes: number) => void
}

const STORAGE_KEYS = {
  PROFILE: 'storyforge.profile',
  CHALLENGES: 'storyforge.challenges',
  COMPLETED: 'storyforge.completed',
  ACTIVITY: 'storyforge.activity',
  ACHIEVEMENTS: 'storyforge.achievements',
  RIVALS: 'storyforge.rivals',
  DRAFTS: 'storyforge.drafts',
  GUIDES: 'storyforge.guides',
}

const StoryForgeContext = createContext<StoryForgeContextType | undefined>(undefined)

export const StoryForgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE)
    return saved ? JSON.parse(saved) : INITIAL_PROFILE
  })

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHALLENGES)
    return saved ? JSON.parse(saved) : generateSeedChallenges()
  })

  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED)
    if (saved) return JSON.parse(saved)
    // Seed some initial completion so charts look alive
    const today = new Date().toISOString().split('T')[0]
    return [
      {
        id: 'cc-1',
        challengeId: 'c-verbatim-3',
        completedAt: today,
        wordCount: 120,
        effortRating: 5,
        xpEarned: 50,
        coinsEarned: 10,
      },
    ]
  })

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY)
    if (saved) return JSON.parse(saved)
    const today = new Date()
    const logs: ActivityLog[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const words = i === 0 ? 1250 : Math.floor(Math.random() * 800) + 200
      logs.push({
        date: dateStr,
        wordsWritten: words,
        challengesCompleted: i % 3 === 0 ? 1 : 0,
        minutesSpent: Math.floor(words / 25),
      })
    }
    return logs
  })

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS
  })

  const [rivals, setRivals] = useState<RivalWriter[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RIVALS)
    return saved ? JSON.parse(saved) : INITIAL_RIVALS
  })

  const [drafts, setDrafts] = useState<StoryDraft[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRAFTS)
    return saved ? JSON.parse(saved) : []
  })

  const [guides, setGuides] = useState<WritingGuide[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GUIDES)
    return saved ? JSON.parse(saved) : WRITING_GUIDES
  })

  const [rewardModalData, setRewardModalData] = useState<RewardPayload | null>(null)

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
  }, [profile])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges))
  }, [challenges])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completedChallenges))
  }, [completedChallenges])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLogs))
  }, [activityLogs])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
  }, [achievements])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RIVALS, JSON.stringify(rivals))
  }, [rivals])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts))
  }, [drafts])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides))
  }, [guides])

  const closeRewardModal = () => setRewardModalData(null)

  const getDailyChallenge = () => challenges.find((c) => c.isDaily) || challenges[0]
  const getWeeklyChallenge = () => challenges.find((c) => c.isWeekly) || challenges[1]
  const getMonthlyChallenge = () => challenges.find((c) => c.isMonthly) || challenges[2]

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }))
  }

  const equipTitle = (title: string) => {
    if (profile.unlockedTitles.includes(title)) {
      setProfile((prev) => ({ ...prev, equippedTitle: title }))
    }
  }

  const markGuideAsRead = (guideId: string) => {
    setGuides((prev) => prev.map((g) => (g.id === guideId ? { ...g, readStatus: true } : g)))
  }

  const logWritingActivity = (wordsCount: number, minutes: number) => {
    const today = new Date().toISOString().split('T')[0]
    setActivityLogs((prev) => {
      const existing = prev.find((l) => l.date === today)
      if (existing) {
        return prev.map((l) =>
          l.date === today
            ? {
                ...l,
                wordsWritten: l.wordsWritten + wordsCount,
                minutesSpent: l.minutesSpent + minutes,
              }
            : l,
        )
      }
      return [
        ...prev,
        { date: today, wordsWritten: wordsCount, challengesCompleted: 0, minutesSpent: minutes },
      ]
    })
  }

  const saveDraft = (draft: Partial<StoryDraft> & { id?: string }): StoryDraft => {
    const now = new Date().toISOString()
    let saved: StoryDraft
    setDrafts((prev) => {
      const existingIndex = prev.findIndex((d) => d.id === draft.id)
      if (existingIndex >= 0) {
        const existing = prev[existingIndex]
        const newVersion = {
          id: `v-${Date.now()}`,
          timestamp: now,
          wordCount: draft.wordCount || existing.wordCount,
          content: draft.content || existing.content,
        }
        saved = {
          ...existing,
          ...draft,
          lastSavedAt: now,
          versions: [newVersion, ...(existing.versions || [])].slice(0, 50),
        }
        const updated = [...prev]
        updated[existingIndex] = saved
        return updated
      } else {
        saved = {
          id: draft.id || `draft-${Date.now()}`,
          title: draft.title || 'História Sem Título',
          content: draft.content || '',
          wordCount: draft.wordCount || 0,
          challengeId: draft.challengeId,
          challengePrompt: draft.challengePrompt,
          lastSavedAt: now,
          versions: [
            {
              id: `v-${Date.now()}`,
              timestamp: now,
              wordCount: draft.wordCount || 0,
              content: draft.content || '',
            },
          ],
        }
        return [saved, ...prev]
      }
    })
    return saved!
  }

  const completeChallenge = (
    challengeId: string,
    wordCount: number,
    effortRating: number,
    storyText?: string,
  ): RewardPayload => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge) {
      return { xp: 0, coins: 0, unlockedAchievements: [], unlockedTitles: [], unlockedMedals: [] }
    }

    const today = new Date().toISOString().split('T')[0]
    const isFirstTime = !completedChallenges.some((cc) => cc.challengeId === challengeId)

    // Calculate XP & Coins with effort multiplier and word bonus
    let xpEarned = challenge.xpReward + Math.floor(wordCount / 10)
    let coinsEarned = challenge.coinsReward
    if (effortRating >= 4) {
      xpEarned += 25
      coinsEarned += 5
    }

    const newCompleted: CompletedChallenge = {
      id: `cc-${Date.now()}`,
      challengeId,
      completedAt: today,
      wordCount,
      effortRating,
      storyText,
      xpEarned,
      coinsEarned,
    }

    setCompletedChallenges((prev) => [...prev, newCompleted])

    // Update Activity
    setActivityLogs((prev) => {
      const existing = prev.find((l) => l.date === today)
      if (existing) {
        return prev.map((l) =>
          l.date === today
            ? {
                ...l,
                wordsWritten: l.wordsWritten + wordCount,
                challengesCompleted: l.challengesCompleted + 1,
              }
            : l,
        )
      }
      return [
        ...prev,
        {
          date: today,
          wordsWritten: wordCount,
          challengesCompleted: 1,
          minutesSpent: Math.floor(wordCount / 20),
        },
      ]
    })

    // Check Level & XP
    const newXp = profile.xp + xpEarned
    const newCoins = profile.coins + coinsEarned

    // Check titles unlocked
    const unlockedTitles: string[] = []
    LEVEL_TITLES.forEach((lt) => {
      if (newXp >= lt.requiredXp && !profile.unlockedTitles.includes(lt.title)) {
        unlockedTitles.push(lt.title)
      }
    })

    const newUnlockedTitlesList = [...profile.unlockedTitles, ...unlockedTitles]

    // Check medals
    const allCompletedList = [...completedChallenges, newCompleted]
    const totalCount = allCompletedList.length
    const genreCount = allCompletedList.filter((cc) => {
      const c = challenges.find((item) => item.id === cc.challengeId)
      return c?.genre === challenge.genre
    }).length

    const newlyUnlockedMedals: string[] = []
    MEDALS.forEach((m) => {
      if (!profile.unlockedMedals.includes(m.id)) {
        if (m.id === 'm-conquistador' && totalCount >= m.requiredCount) {
          newlyUnlockedMedals.push(m.id)
        } else if (m.genre === challenge.genre && genreCount >= m.requiredCount) {
          newlyUnlockedMedals.push(m.id)
        }
      }
    })

    // Check achievements
    const newlyUnlockedAchievements: Achievement[] = []
    const updatedAchievements = achievements.map((ach) => {
      let prog = ach.currentProgress
      if (ach.id === 'ach-1') prog = totalCount
      if (ach.id === 'ach-50-challenges') prog = totalCount
      if (ach.id === 'ach-100k-words')
        prog = allCompletedList.reduce((acc, curr) => acc + curr.wordCount, 0)
      if (ach.id === 'ach-spec-' + challenge.genre.toLowerCase().replace(/ /g, '-'))
        prog = genreCount
      if (
        ach.id === 'ach-first-medal' &&
        (profile.unlockedMedals.length > 0 || newlyUnlockedMedals.length > 0)
      )
        prog = 1

      const isNowUnlocked = prog >= ach.targetCount && !ach.unlocked
      if (isNowUnlocked) {
        newlyUnlockedAchievements.push({ ...ach, currentProgress: prog, unlocked: true })
      }

      return { ...ach, currentProgress: prog, unlocked: ach.unlocked || isNowUnlocked }
    })

    setAchievements(updatedAchievements)

    // Update profile streak
    let newStreak = profile.streak
    let newBestStreak = profile.bestStreak
    if (profile.lastActiveDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      if (profile.lastActiveDate === yesterdayStr) {
        newStreak += 1
      } else {
        newStreak = 1
      }
      if (newStreak > newBestStreak) newBestStreak = newStreak
    }

    setProfile((prev) => ({
      ...prev,
      xp: newXp,
      coins: newCoins,
      streak: newStreak,
      bestStreak: newBestStreak,
      lastActiveDate: today,
      unlockedTitles: newUnlockedTitlesList,
      unlockedMedals: [...prev.unlockedMedals, ...newlyUnlockedMedals],
    }))

    const reward: RewardPayload = {
      xp: xpEarned,
      coins: coinsEarned,
      unlockedAchievements: newlyUnlockedAchievements,
      unlockedTitles,
      unlockedMedals: newlyUnlockedMedals,
    }

    setRewardModalData(reward)
    return reward
  }

  return React.createElement(
    StoryForgeContext.Provider,
    {
      value: {
        profile,
        challenges,
        completedChallenges,
        activityLogs,
        achievements,
        rivals,
        drafts,
        guides,
        rewardModalData,
        closeRewardModal,
        completeChallenge,
        updateProfile,
        equipTitle,
        saveDraft,
        markGuideAsRead,
        getDailyChallenge,
        getWeeklyChallenge,
        getMonthlyChallenge,
        logWritingActivity,
      },
    },
    children,
  )
}

export const useStoryForge = () => {
  const ctx = useContext(StoryForgeContext)
  if (!ctx) throw new Error('useStoryForge must be used inside StoryForgeProvider')
  return ctx
}
