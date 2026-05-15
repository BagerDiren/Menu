'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { MENU, type Dish } from '@/data/menu';
import type { Locale } from '@/i18n';
import DishCard from './DishCard';

const DishModal = dynamic(() => import('./DishModal'), { ssr: false });
const StoryModal = dynamic(() => import('./StoryModal'), { ssr: false });

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
  dishes?: Dish[];
  pairing?: string;
}

interface AIResponse {
  dish_ids?: string[];
  reasoning?: string;
  pairing_tip?: string;
  error?: string;
}

export default function AIChat({ locale }: { locale: Locale }) {
  const tAi = useTranslations('ai');
  const tNav = useTranslations('nav');

  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [storyDish, setStoryDish] = useState<Dish | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;
    setError(null);
    const userTurn: ChatTurn = { role: 'user', content: question };
    const next = [...turns, userTurn];
    setTurns(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          locale,
          messages: next.map((t) => ({ role: t.role, content: t.content }))
        })
      });
      const data = (await res.json()) as AIResponse;

      if (!res.ok || data.error) {
        setError(tAi('errorGeneric'));
        setLoading(false);
        return;
      }

      const dishes = (data.dish_ids ?? [])
        .map((id) => MENU.find((d) => d.id === id))
        .filter(Boolean) as Dish[];

      setTurns([
        ...next,
        {
          role: 'assistant',
          content: data.reasoning ?? '',
          dishes,
          pairing: data.pairing_tip
        }
      ]);
      // Smooth scroll
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 80);
    } catch (e) {
      setError(tAi('errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const quickPrompt = (key: 'vegan' | 'light' | 'spicy' | 'traditional') => {
    ask(tAi(`quickPrompts.${key}`));
  };

  return (
    <div className="min-h-screen hg-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-nile-950/75 border-b border-gold-300/15">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href={`/${locale}/menu`}
            className="inline-flex items-center gap-1.5 text-papyrus/80 hover:text-gold-300 transition text-sm"
          >
            <ArrowLeft className="h-4 w-4 ltr:block rtl:hidden" />
            <ArrowLeft className="h-4 w-4 rtl:block ltr:hidden rtl:rotate-180" />
            {tNav('back')}
          </Link>
          <div className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold-300" />
            <span className="font-display tracking-[0.25em] text-xs uppercase text-gold-shine">
              {tAi('title')}
            </span>
          </div>
          <div className="w-12" />
        </div>
      </header>

      {/* Conversation */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full space-y-6"
      >
        {turns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-6 pb-2"
          >
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#cba84a] via-[#b8860b] to-[#7e5d07] shadow-goldGlow">
              <Sparkles className="h-7 w-7 text-black" />
            </div>
            <h2 className="font-display text-3xl text-white mb-2">{tAi('title')}</h2>
            <p className="text-white/65 max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
              {tAi('subtitle')}
            </p>

            <div className="mx-auto mt-6 h-px max-w-xs bg-gradient-to-r from-transparent via-[#b8860b]/50 to-transparent" />

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {(['vegan', 'light', 'spicy', 'traditional'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => quickPrompt(k)}
                  className="inline-flex h-9 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 text-[11px] font-medium uppercase text-white/75 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                  style={{ letterSpacing: '0.12em' }}
                >
                  {tAi(`quickPrompts.${k}`)}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {turns.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {t.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl border border-[#b8860b]/40 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#a07509] px-4 py-2.5 text-sm font-medium text-black shadow-gold">
                    {t.content}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-white/[0.06] border border-[#b8860b]/40 flex items-center justify-center text-[#b8860b]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold-300/70 mb-1">
                        {tAi('suggestion')}
                      </div>
                      <p className="text-papyrus/90 leading-relaxed">{t.content}</p>
                      {t.pairing && (
                        <p className="mt-2 text-xs italic text-papyrus/60">— {t.pairing}</p>
                      )}
                    </div>
                  </div>

                  {t.dishes && t.dishes.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.dishes.map((d, j) => (
                        <DishCard
                          key={d.id}
                          dish={d}
                          locale={locale}
                          index={j}
                          onOpen={setSelectedDish}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-9 h-9 rounded-full bg-white/[0.06] border border-[#b8860b]/40 flex items-center justify-center text-[#b8860b] animate-pulse">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-white/60 text-sm italic">{tAi('thinking')}</div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-carnelian/40 bg-carnelian/10 text-papyrus px-4 py-3 text-sm">
            {error}
          </div>
        )}
      </main>

      {/* Composer */}
      <div className="sticky bottom-0 bg-nile-950/85 backdrop-blur border-t border-gold-300/15">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tAi('placeholder')}
            disabled={loading}
            className="flex-1 h-11 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm text-white placeholder:text-white/40 transition-colors duration-200 focus:border-[#b8860b]/60 focus:bg-white/[0.06] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b8860b]/60 bg-gradient-to-br from-[#dcc475] via-[#b8860b] to-[#7e5d07] text-black shadow-gold transition-all duration-200 hover:shadow-goldGlow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            aria-label={tAi('send')}
          >
            <Send className="h-4 w-4 rtl:rotate-180" strokeWidth={2.4} />
          </button>
        </form>
      </div>

      <DishModal
        dish={selectedDish}
        locale={locale}
        onClose={() => setSelectedDish(null)}
        onOpenStory={(d) => setStoryDish(d)}
        onSelectPaired={(d) => setSelectedDish(d)}
      />
      <StoryModal dish={storyDish} locale={locale} onClose={() => setStoryDish(null)} />
    </div>
  );
}
