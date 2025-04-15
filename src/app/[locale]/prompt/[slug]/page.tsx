import { getPromptBySlug } from '@/lib/data';
import { Link } from "@/lib/i18n";
import { ArrowLeft, Copy } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { CustomIcon } from "@/components/shared/CustomIcon";
import { getTranslations } from 'next-intl/server';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CopyButton from '@/components/prompt/CopyButton';

type PromptParams = {
  params: { slug: string, locale: string }
}

export async function generateMetadata({ params }: PromptParams) {
  const promptData = await getPromptBySlug(params.slug);
  return {
    title: promptData ? `${promptData.title}` : 'Prompt 详情',
    description: promptData ? `${promptData.prompt.substring(0, 160)}...` : 'Prompt 详情页面',
  };
}

export default async function PromptDetail({ params }: PromptParams) {
  const promptData = await getPromptBySlug(params.slug);
  const t = await getTranslations('prompt');

  if (!promptData) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold">{t('promptNotFound')}</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors mt-4 inline-block">
          {t('backToHome')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl md:pb-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('homeBtn')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">{t('promptsBtn')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{promptData.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-8">
        <div className="flex flex-row items-center justify-start gap-2 mb-4">
          {promptData.category && promptData.category.map((category, i) => (
            <Link key={i} href={`/category/${category}`}>
              <Badge className='text-md bg-blue-50 text-blue-600 rounded-md border-blue-200 hover:bg-blue-100 hover:text-blue-700 transition-all duration-100'>
                {category}
              </Badge>
            </Link>
          ))}

          {promptData.model && promptData.model.map((model, i) => (
            <Link key={i} href={`/model/${model}`}>
              <Badge variant="secondary" className='rounded-sm text-md px-2 py-1 flex items-center gap-1 bg-transparent hover:bg-muted transition-colors'>
                <CustomIcon name={model || ''} />
                {model}
              </Badge>
            </Link>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">{promptData.title}</h1>

        <div className="mb-8 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {promptData.tag && promptData.tag.map((tag, i) => (
              <Link key={i} href={`/search?q=${tag}`}>
                <Badge key={i} variant="secondary" className='rounded-sm text-sm px-1 bg-transparent hover:bg-transparent text-foreground/80 transition-colors link-underline'>
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>

          {promptData.author && (
            <Badge variant="secondary" className='bg-cyan-50 border-cyan-200 text-cyan-600 hover:bg-cyan-100 rounded-sm text-sm px-2 transition-colors'>
              {promptData.author}
            </Badge>
          )}
        </div>



        <Card className="p-6 mb-8 relative group">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton text={promptData.prompt} />
          </div>
          <h2 className="text-xl font-semibold mb-4">{t('promptContent')}</h2>
          <div className="whitespace-pre-wrap text-foreground">
            {promptData.prompt}
          </div>
        </Card>

        {/* {promptData.test_result && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('exampleResult')}</h2>
            <div className="whitespace-pre-wrap text-foreground">
              {promptData.test_result}
            </div>
          </Card>
        )}

        {promptData.test_result_img && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('resultImage')}</h2>
            <img
              src={promptData.test_result_img}
              alt={`${promptData.title} 结果图片`}
              className="max-w-full rounded-md"
            />
          </Card>
        )} */}

      </div>

      <div className="mt-12">
        <Link href="/category" className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={20} />
          {t('backToPrompts')}
        </Link>
      </div>
    </div>
  );
} 