import React from 'react'; // 确保导入 React
import { searchPrompts } from '@/lib/data';
// import { Button } from '@/components/ui/button';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTranslations } from 'next-intl/server';
import { PromptPageList } from '@/components/prompt/PromptPageList';

export async function generateMetadata({ params: { keyword } }: CategoryPageProps) {
  const t = await getTranslations('search');

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const decodeKeyword = decodeURIComponent(keyword)

  return {
    title: capitalize(decodeKeyword),
    description: t('meta_description')
  }
}

type CategoryPageProps = {
  params: {
    keyword: string;
  };
}

export default async function Tool({ params: { keyword } }: CategoryPageProps) {
  const decodeKeyword = decodeURIComponent(keyword)

  const searchData = await searchPrompts(decodeKeyword)
  const t = await getTranslations('search');

  return (
    <div className="container mx-auto py-12 max-w-7xl md:pb-24">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('homeBtn')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>{decodeKeyword}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight uppercase lg:text-5xl  pt-10">{decodeKeyword}</h1>
        <h2 className='text-sm mt-2 opacity-60 lg:text-lg'><span className='uppercase'>{decodeKeyword}</span></h2>
      </div>
      {searchData && (
        <>
          <PromptPageList
            title={decodeKeyword}
            prompts={searchData}
            showMoreLink={false}
          />
        </>)}
    </div>
  )
}