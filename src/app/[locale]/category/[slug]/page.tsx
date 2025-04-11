import React from 'react'; // 确保导入 React
import { getCategoryBySlug, getPromptsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTranslations, getLocale } from 'next-intl/server';
import { CATEGORY_PAGE_PROMPT_COUNT } from '@/lib/const';
import { PromptPageList } from '@/components/prompt/PromptPageList';
import CustomPagination from "@/components/shared/pagination";

type CategoryPageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { slug } }: CategoryPageProps) {
  const t = await getTranslations('category');

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return {
    title: capitalize(slug) + ' Developer Tools',
    description: t('meta_description'),
  }
}


export default async function Tool({ params: { slug }, searchParams }: CategoryPageProps) {
  const locale = await getLocale();
  const categoryData = await getCategoryBySlug(slug);
  if (!categoryData) {
    return notFound();
  }

  const t = await getTranslations('category');

  const prompts = await getPromptsByCategory(categoryData.category, CATEGORY_PAGE_PROMPT_COUNT)

  const totalPages = 1;

  return (
    <div className="container mx-auto py-12 md:pb-24 max-w-7xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('homeBtn')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">{t('categoryBtn')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{categoryData.category}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight capitalize lg:text-5xl pt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{categoryData.category}</h1>
        <h2 className="text-md mt-2 opacity-60 lg:text-xl">{categoryData.slug}</h2>

      </div>

      {prompts && prompts.length > 0 && (
        <>
          <PromptPageList
            title={categoryData.category}
            prompts={prompts}
            showMoreLink={false}
          />
        </>
      )}
    </div>
  )
}