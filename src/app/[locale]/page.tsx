// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getSortedPostsData } from '@/lib/posts'

import { FeaturedPromptList, PromptList, PromptListByCategory } from '@/components/prompt/PromptList';
import { ArticleList } from '@/components/article/ArticleList'

import { Search } from '@/components/home/Search';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLatestPrompts, getAllCategories, getFeaturedPrompts, getPromptsByCategory } from '@/lib/data';
import { 
  FEATURED_PROMPTS_COUNT, 
  LATEST_PROMPTS_COUNT, 
  ARTICLE_COUNT,
  PROMPT_LIST_BY_CATEGORY_COUNT
} from '@/lib/const';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

async function getHomeData() {
  try {
    const [categories, promptsData, featuredPromptsData] = await Promise.all([
      getAllCategories(),
      getLatestPrompts(LATEST_PROMPTS_COUNT),
      getFeaturedPrompts(FEATURED_PROMPTS_COUNT)
    ]);

    // 获取每个分类的提示词
    const categoryPrompts = categories ? await Promise.all(
      categories.map(category => 
        getPromptsByCategory(category.category, PROMPT_LIST_BY_CATEGORY_COUNT)
          .then(prompts => ({ category, prompts: prompts || [] }))
          .catch(() => ({ category, prompts: [] }))
      )
    ) : [];

    return {
      promptsData: promptsData || [],
      featuredPromptsData: featuredPromptsData || [],
      categoryPrompts,
      allPostsData: getSortedPostsData().slice(0, ARTICLE_COUNT)
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      promptsData: [],
      featuredPromptsData: [],
      categoryPrompts: [],
      allPostsData: []
    };
  }
}

export default async function Home() {
  const locale = await getLocale();
  console.log('locale: ', locale)

  const t = await getTranslations('home');
  const { promptsData, featuredPromptsData, categoryPrompts, allPostsData } = await getHomeData();

  return (
    <div className="container mx-auto py-12 space-y-16 md:pb-24 max-w-7xl">
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold lg:text-6xl tracking-tighter">
          <span className="inline-block">{t("h1")}</span>
        </h1>
        <h2 className="text-2xl tracking-tight sm:text-3xl md:text-3xl lg:text-3xl max-w-3xl mx-auto">{t("h2")}</h2>
        <div className='w-full px-2 pt-10 lg:w-1/2'>
          <Search />
        </div>
      </section>

      {featuredPromptsData && featuredPromptsData.length > 0 && (
        <Suspense fallback={<div>{t("loading")}</div>}>
          <FeaturedPromptList 
            title={t("featured_prompts")} 
            prompts={featuredPromptsData} 
          />
        </Suspense>
      )}

      {promptsData && promptsData.length > 0 && (
        <Suspense fallback={<div>{t("loading")}</div>}>
          <PromptList 
            title={t("latest_prompts")} 
            prompts={promptsData} 
          />
        </Suspense>
      )}

      {categoryPrompts.map(({ category, prompts }) => (
        <Suspense key={category.category_id} fallback={<div>{t("loading")}</div>}>
          <PromptListByCategory 
            title={category.category} 
            category={category.category}
            prompts={prompts}
          />
        </Suspense>
      ))}

      <div className='border-t'></div>

      {allPostsData && allPostsData.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <ArticleList articles={allPostsData} />
        </Suspense>
      )}
    </div>
  )
}