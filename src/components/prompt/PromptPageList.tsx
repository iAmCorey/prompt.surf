// components/ResourceList.tsx
import React from 'react'; // 确保导入 React
import { Link } from "@/lib/i18n";
import { useTranslations } from 'next-intl';
import { type PromptType } from '@/lib/types';
import { PromptCard } from '@/components/prompt/PromptCard';

type PromptPageListProps = {
  title: string,
  showMoreLink?: boolean,
  prompts?: PromptType[],
  to?: string,
  category?: string,
}

export const PromptPageList = ({ title, prompts = [], showMoreLink = true, to }: PromptPageListProps) => {
  const t = useTranslations('promptList');

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prompts.map((prompt: PromptType) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
      {/* pagnitaion */}
    </section>
  )
}
