'use client';

import React, { useState } from 'react';
import {
  LightningBoltIcon,
  DotsHorizontalIcon,
  GlobeIcon
} from "@radix-ui/react-icons"
import { SearchIcon } from 'lucide-react';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { ImagePlus, FlameIcon } from "lucide-react"

export function Search({ className }: { className?: string }) {
  const [search, setSearch] = useState('');
  const t = useTranslations('search');

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Command className={cn("rounded-lg border shadow-md", className)}>
        <CommandInput placeholder={t('input_placeholder')} value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandGroup>
            <CommandItem onSelect={() => window.location.href = '/search/海报'}>
              <ImagePlus className="mr-2 h-4 w-4" />
              <span>海报</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = '/search/宣传'}>
              <FlameIcon className="mr-2 h-4 w-4" />
              <span>宣传</span>
            </CommandItem>
            <CommandItem disabled>
              <DotsHorizontalIcon className="mr-2 h-4 w-4" />
              <span>{t('more')}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      {search &&
        <Button variant="outline" className='mt-6' onClick={() => window.location.href = `/search/${encodeURIComponent(search)}`}>
          <SearchIcon size={16} className='mr-2 opacity-80' />{t('button')}
        </Button>}
    </div>
  )
}
