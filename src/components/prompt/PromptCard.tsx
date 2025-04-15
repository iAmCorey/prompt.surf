"use client";

import React, { useState } from "react";
import {
  Card,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { type PromptType } from '@/lib/types';
import { CustomIcon } from "@/components/shared/CustomIcon";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/lib/i18n";

export const PromptCard = ({ prompt }: { prompt: PromptType }) => {
  const [showCopyButton, setShowCopyButton] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    toast.success("已复制到剪贴板");
  };

  return (
    <Card className={cn('max-w-sm overflow-hidden border rounded-xl flex flex-col')}>
      <div className='px-4 pt-4 pb-2 relative flex-none'>
        <div className="flex flex-row justify-between items-center">
          {prompt.model && (
            <div className="flex flex-row items-center gap-1">
              <Badge variant="secondary" className='rounded-sm text-sm px-1 bg-transparent hover:bg-muted text-muted-foreground transition-colors gap-1'>
                <CustomIcon name={prompt.model[0] || ''} />
                {prompt.model[0]}
              </Badge>
            </div>
          )}
          {prompt.category && (
            <Badge className='bg-blue-50 text-blue-600 rounded-md border-blue-200 hover:bg-blue-100 hover:text-blue-700 transition-all duration-100'>{prompt.category}</Badge>
          )}
        </div>
        <h3 className='text-lg font-semibold text-foreground mt-2 truncate px-2'>{prompt.title}</h3>
      </div>

      <div className='px-4 flex-grow overflow-hidden'>
        <Link href={`/prompt/${prompt.slug}`}>
          <div 
            className={cn('p-3 bg-muted/50 dark:bg-background text-muted-foreground hover:text-foreground transition-all duration-100 rounded-lg h-[100px] mb-3 relative cursor-pointer hover:bg-muted/80 dark:hover:bg-background/80',
            )}
            onMouseEnter={() => setShowCopyButton(true)}
            onMouseLeave={() => setShowCopyButton(false)}
          >
            <p className='text-xs line-clamp-4 leading-normal'>{prompt.prompt}</p>
            {showCopyButton && (
              <button 
                onClick={handleCopy}
                className="absolute bottom-2 right-2 p-2 text-foreground bg-background/80 dark:bg-foreground/20 rounded-md hover:bg-background/100 dark:hover:bg-foreground/30 transition-all"
              >
                <Copy size={18} />
              </button>
            )}
          </div>
        </Link>
      </div>

      <div className='px-4 pb-4 mt-auto flex flex-row justify-between items-center'>
        <div>
          {prompt.tag && prompt.tag.length > 0 && (
            <div className='flex flex-wrap'>
              {prompt.tag.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className='rounded-sm text-xs px-1 bg-transparent hover:bg-transparent text-muted-foreground transition-colors link-underline'>
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div>
          {prompt.author && (
            <Badge variant="secondary" className='rounded-sm text-xs px-1 text-muted-foreground transition-colors'>
              {prompt.author}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

export const FeaturedPromptCard = ({ prompt }: { prompt: PromptType }) => {
  const [showCopyButton, setShowCopyButton] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    toast.success("已复制到剪贴板");
  };

  return (
    <Card className={
      cn('max-w-sm overflow-hidden border rounded-xl flex flex-col',
      prompt.feature === '是' ? 'border-orange-400 dark:bg-foreground/10' : 'border-gray-100'
      )}>
      <div className='px-4 pt-4 pb-2 relative flex-none'>
        <div className="flex flex-row justify-between items-center">
          {prompt.model && (
            <div className="flex flex-row items-center gap-1">
              <Badge variant="secondary" className='rounded-sm text-sm px-1 bg-transparent hover:bg-muted text-muted-foreground transition-colors gap-1'>
                <CustomIcon name={prompt.model[0] || ''} />
                {prompt.model[0]}
              </Badge>
            </div>
          )}
          {prompt.category && (
            <Badge className='bg-blue-50 text-blue-600 rounded-md border-blue-200 hover:bg-blue-100 hover:text-blue-700 transition-all duration-100'>{prompt.category}</Badge>
          )}
        </div>
        <h3 className='text-lg font-semibold mt-2 truncate px-2 text-foreground'>{prompt.title}</h3>
      </div>

      <div className='px-4 flex-grow overflow-hidden'>
        <Link href={`/prompt/${prompt.slug}`}>
          <div 
            className={cn('p-3 bg-muted/50 dark:bg-background text-muted-foreground hover:text-foreground transition-all duration-100 rounded-lg h-[100px] mb-3 relative cursor-pointer hover:bg-muted/80 dark:hover:bg-background/80',
            )}
            onMouseEnter={() => setShowCopyButton(true)}
            onMouseLeave={() => setShowCopyButton(false)}
          >
            <p className='text-xs line-clamp-4 leading-normal'>{prompt.prompt}</p>
            {showCopyButton && (
              <button 
                onClick={handleCopy}
                className="absolute bottom-2 right-2 p-2 text-foreground bg-background/80 dark:bg-foreground/20 rounded-md hover:bg-background/100 dark:hover:bg-foreground/30 transition-all"
              >
                <Copy size={18} />
              </button>
            )}
          </div>
        </Link>
      </div>

      <div className='px-4 pb-4 mt-auto flex flex-row justify-between items-center'>
        <div>
          {prompt.tag && prompt.tag.length > 0 && (
            <div className='flex flex-wrap'>
              {prompt.tag.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className='rounded-sm text-xs px-1 bg-transparent hover:bg-transparent text-muted-foreground transition-colors link-underline'>
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div>
          {prompt.author && (
            <Badge variant="secondary" className='bg-cyan-50 border-cyan-200 text-cyan-600 hover:bg-cyan-100 rounded-sm text-xs px-1 transition-colors'>
              {prompt.author}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}