// components/ResourceList.tsx
import React from 'react'; // 确保导入 React
import { Link } from "@/lib/i18n";
import { useTranslations } from 'next-intl';
import { type PromptItem } from '@/lib/types';
import { PromptCard } from '@/components/prompt/PromptCard';


type PromptListPageProps = {
  showMoreLink?: boolean,
  prompts?: PromptItem[]
}







const PromptList = ({ prompts = [], showMoreLink = true }: PromptListPageProps) => {
  const t = useTranslations('toolsList');

  return (
    <section>
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-3xl font-bold tracking-tight capitalize">Latest Prompts</h2>
        {showMoreLink && (
          <Link href={`/category`} className="capitalize text-blue-600 hover:text-blue-800 transition-colors hover:underline">
            {t('more')} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prompts.map((prompt: PromptItem) => (
          <PromptCard key={prompt.prompt_id} prompt={prompt} />
        ))}
      </div>
    </section>
  )
}



export { PromptList };