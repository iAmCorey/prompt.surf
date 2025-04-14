import React from 'react'; // 确保导入 React
import {getModelBySlug, getPromptsByModel } from '@/lib/data';
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

type ModelPageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { slug } }: ModelPageProps) {
  const t = await getTranslations('model');

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const modelData = await getModelBySlug(slug);
  if (!modelData) {
    return notFound();
  }

  return {
    title: capitalize(modelData.model),
    description: t('meta_description'),
  }
}


export default async function Model({ params: { slug }, searchParams }: ModelPageProps) {
  const locale = await getLocale();
  const modelData = await getModelBySlug(slug);
  if (!modelData) {
    return notFound();
  }

  const t = await getTranslations('model');

  const prompts = await getPromptsByModel(modelData.model, CATEGORY_PAGE_PROMPT_COUNT)

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
            <BreadcrumbLink href="/model">{t('modelBtn')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{modelData.model}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight capitalize lg:text-5xl pt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{modelData.model}</h1>
        <h2 className="text-md mt-2 opacity-60 lg:text-xl">{modelData.slug}</h2>

      </div>

      {prompts && prompts.length > 0 && (
        <>
          <PromptPageList
            title={modelData.model}
            prompts={prompts}
            showMoreLink={false}
          />
        </>
      )}
    </div>
  )
}