"use client";

import React from "react";
import {
  Card,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { type PromptType } from '@/lib/types';
import { CustomIcon } from "@/components/shared/CustomIcon";

export const PromptCard = ({ prompt }: { prompt: PromptType }) => {
  return (
    <Card className='max-w-sm overflow-hidden border border-gray-100 rounded-xl flex flex-col'>
      <div className='px-4 pt-4 pb-2 relative flex-none'>
        <div className="flex flex-row justify-between items-center">
          {prompt.model && (
            <div className="flex flex-row items-center gap-1">
              
              <Badge variant="secondary" className='rounded-sm text-sm px-1 bg-transparent hover:bg-gray-100 text-gray-600 transition-colors gap-1'>
              <CustomIcon name={prompt.model[0] || ''} />
                {prompt.model[0]}
              </Badge>
            </div>
          )}
          {prompt.category && (
            <Badge className='bg-blue-50 text-blue-600 rounded-md border-blue-200 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300'>{prompt.category}</Badge>
          )}
        </div>
        <h3 className='text-lg font-semibold text-gray-800 mt-2 truncate px-2'>{prompt.title}</h3>
      </div>

      <div className='px-4 flex-grow overflow-hidden'>
        <div className='bg-gray-50 p-3 hover:bg-gray-100  text-gray-700 hover:text-black transition-all duration-300 rounded-lg h-[100px] mb-3'>
          <p className='text-xs line-clamp-4 leading-normal'>{prompt.prompt}</p>
        </div>
      </div>

      <div className='px-4 pb-4 mt-auto flex flex-row justify-between items-center'>
        <div>
          {prompt.tag && prompt.tag.length > 0 && (
            <div className='flex flex-wrap'>
              {prompt.tag.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className='rounded-sm text-xs px-1 bg-transparent hover:bg-gray-100 text-gray-600 transition-colors'>
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div>
          {prompt.author && (
            <Badge variant="secondary" className='rounded-sm text-xs px-1 hover:bg-gray-100 text-gray-600 transition-colors'>
              {prompt.author}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}