// components/ResourceList.tsx
import React from 'react'; // 确保导入 React
import { Link } from "@/lib/i18n";
import { useTranslations } from 'next-intl';
import { type PromptType } from '@/lib/types';
import { FeaturedPromptCard, PromptCard } from '@/components/prompt/PromptCard';

type PromptListPageProps = {
  title: string,
  showMoreLink?: boolean,
  prompts?: PromptType[],
  to?: string,
  category?: string,
}

export const PromptList = ({ title, prompts = [], showMoreLink = true, to }: PromptListPageProps) => {
  const t = useTranslations('promptList');

  return (
    <section>
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-3xl font-bold tracking-tight capitalize bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{title}</h2>
        {showMoreLink && (
          <Link href={to ? to : `/category`} className="capitalize text-blue-600 hover:text-blue-800 transition-colors hover:underline">
            {t('more')} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prompts.map((prompt: PromptType) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </section>
  )
}

export const FeaturedPromptList = ({ title, prompts = [], showMoreLink = true }: PromptListPageProps) => {
  const t = useTranslations('promptList');

  return (
    <section>
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-3xl font-bold tracking-tight capitalize bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{title}</h2>
        {showMoreLink && (
          <Link href={`/category`} className="capitalize text-blue-600 hover:text-blue-800 transition-colors hover:underline">
            {t('more')} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prompts.map((prompt: PromptType) => (
          <FeaturedPromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </section>
  )
}

export const PromptListByCategory = ({ title, category, showMoreLink = true, to, prompts }: PromptListPageProps) => {
  const t = useTranslations('promptList');

  if (!category || !prompts || prompts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-3xl font-bold tracking-tight capitalize bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{title}</h2>
        {showMoreLink && (
          <Link href={to ? to : `/category`} className="capitalize text-blue-600 hover:text-blue-800 transition-colors hover:underline">
            {t('more')} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prompts.map((prompt: PromptType) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </section>
  )
}