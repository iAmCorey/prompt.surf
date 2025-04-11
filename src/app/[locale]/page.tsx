// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getSortedPostsData } from '@/lib/posts'

import { FeaturedPromptList, PromptList } from '@/components/prompt/PromptList';
import { ArticleList } from '@/components/ArticleList'

import { Search } from '@/components/home/Search';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLatestPrompts, getCategories, getFeaturedPrompts } from '@/lib/data';


export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}


export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('home');

  // categories data
  const categories = await getCategories();
  console.log('categories: ', categories?.length)

  const allPostsData = getSortedPostsData().slice(0, 6)


  const promptsData = await getLatestPrompts();
  if (promptsData) {
    console.log('promptsData: ', promptsData.length)
  }

  const featuredPromptsData = await getFeaturedPrompts();
  if (featuredPromptsData) {
    console.log('featuredPromptsData: ', featuredPromptsData.length)
  }


  return (
    <div className="container mx-auto py-12 space-y-16 max-w-7xl ">
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold lg:text-6xl tracking-tighter">
          <span className="inline-block">{t("h1")}</span>
        </h1>
        <h2 className="text-2xl tracking-tight sm:text-3xl md:text-3xl lg:text-3xl max-w-3xl mx-auto">{t("h2")}</h2>
        {/* <div className='w-full px-2 pt-10 lg:w-1/2'>
          <Search />
        </div> */}
      </section>

      {featuredPromptsData && featuredPromptsData.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedPromptList title={t("featured_prompts")} prompts={featuredPromptsData} />
        </Suspense>
      )}

      {promptsData && promptsData.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <PromptList title={t("latest_prompts")} prompts={promptsData} />
        </Suspense>
      )}
      <div className='border-t'></div>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleList articles={allPostsData} />
      </Suspense>
    </div>
  )
}