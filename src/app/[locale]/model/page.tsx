// category/page.tsx
import React from 'react'; // 确保导入 React
import { getAllModels } from '@/lib/data';

import { ModelList } from '@/components/model/ModelList';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {getTranslations, getLocale} from 'next-intl/server';


export async function generateMetadata() {
  const t = await getTranslations('model');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function ModelPage() {
  const locale = await getLocale();
  // categories data
  const models = await getAllModels();
  console.log('models: ', models)

  const t = await getTranslations('model');

  return (
    <div className="container mx-auto py-12 space-y-16 min-h-screen">
      <section className="text-center space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('homeBtn')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('modelBtn')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-5xl tracking-tight pt-10">
          <span className="">{t('h1')}</span>
        </h1>
        <h2 className="mx-auto max-w-[700px] opacity-60 md:text-xl">{t('h2')}</h2>
      </section>
      {models && models.length > 0 && (
        <ModelList models={models} />
      )}
    </div>
  )
}