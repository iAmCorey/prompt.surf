'use client'
import React from 'react'; // 确保导入 React
import { useState, useEffect } from 'react'
import { Link, usePathname }from "@/lib/i18n";
import { Github, MenuIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import IconImage from "../../../public/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ThemeModeButton } from "@/components/shared/ThemeModeButton";
import { LocaleButton } from "@/components/shared/LocaleButton";
import {useTranslations} from 'next-intl';
import { CategoryType, ModelType, TagType } from '@/lib/types';
import { NAVIGATION_MODEL_COUNT } from '@/lib/const';
import { CustomIcon } from '../shared/CustomIcon';
import { appConfig } from '@/lib/appConfig';
import { RainbowButton } from "@/components/magicui/rainbow-button";

type NavigationProps = {
  categories: CategoryType[] | null,
  tags: TagType[] | null,
  models: ModelType[] | null,
}


export const Navigation = ({ categories, models }: NavigationProps ) => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');

  const menuItems: {
    label: string;
    href: string;
  }[] = [
    {
      label: t('homeBtn'),
      href: "/",
    },
    {
      label: t('categoryBtn'),
      href: "/category",
    },
    {
      label: t('tagBtn'),
      href: "/tag",
    },
    {
      label: t('modelBtn'),
      href: "/model",
    },
    {
      label: t('articleBtn'),
      href: "/article",
    },
    {
      label: t('changelogBtn'),
      href: "/changelog",
    },
  ];
  const isMenuItemActive = (href: string) => {
    // console.log(pathname, href);
    return pathname === href;
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  
  const size = 28;
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-semibold leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"

const ModelItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex flex-row items-center gap-2">
            <CustomIcon name={title || ''} />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ModelItem.displayName = "ModelItem"


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1">
            <Image
              src={IconImage}
              className="block"
              width={size}
              height={size}
              alt="Prompt.surf"
            />
            <span className="inline-block font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Prompt</span>
            <span className="inline-block font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-[0.5px] px-2">.surf</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/' === pathname && "font-extrabold")}>
                      {t('homeBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {categories && categories.length > 0 && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn('font-medium', '/category' === pathname && "font-extrabold")}>{t('categoryBtn')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid grid-cols-1 w-[250px] md:w-[400px] gap-2 p-4 md:grid-cols-2">
                        {categories.map((category) => (
                          <ListItem
                            key={category.category_id}
                            title={category.category}
                            href={`/category/${category.slug}`}
                            className='capitalize'
                          >
                            {category.slug}
                          </ListItem>
                        ))}
                        <ListItem
                          title={t('moreCategoryBtn')}
                          href={'/category'}
                          className='capitalize border border-muted  bg-gradient-to-b  from-muted/50 to-muted/20'
                        >
                          {t('moreCategoryDescription')}
                        </ListItem>
                      </ul>
                      </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
                {models && models.length > 0 && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn('font-medium', '/model' === pathname && "font-extrabold")}>{t('modelBtn')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid grid-cols-1 w-[250px] md:w-[400px] gap-2 p-4 md:grid-cols-2">
                        {models.slice(0, NAVIGATION_MODEL_COUNT).map((model) => (
                          <ModelItem
                            key={model.model_id}
                            title={model.model}
                            href={`/model/${model.slug}`}
                            className='capitalize'
                          />
                        ))}
                        <ModelItem
                          title={t('moreModelBtn')}
                          href={'/model'}
                          className='capitalize border border-muted  bg-gradient-to-b  from-muted/50 to-muted/20'
                        >
                          {t('moreModelDescription')}
                        </ModelItem>
                      </ul>
                      </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
                <NavigationMenuItem>
                  <Link href="/tag" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/changelog' === pathname && "font-extrabold")}>
                      {t('tagBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/article" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/article' === pathname && "font-extrabold")}>
                      {t('articleBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/article/add-new-developer-tools" className='hidden md:block'>
            <RainbowButton className='h-10 text-sm'>{t('submitToolBtn')}</RainbowButton>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeModeButton />
            <LocaleButton />
            
          </div>
          <Link
            href={appConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground ml-1"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Sheet
              open={mobileMenuOpen}
              onOpenChange={(open) => setMobileMenuOpen(open)}
            >
              <SheetTrigger asChild>
                <Button
                  className="md:hidden"
                  size="icon"
                  variant="outline"
                  aria-label="Menu"
                >
                  <MenuIcon className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px]" side="right">
                <div className="flex flex-col items-start justify-center">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.href}
                      href={menuItem.href}
                      className={cn(
                        "block px-3 py-2 text-lg",
                        isMenuItemActive(menuItem.href) ? "font-bold" : "",
                      )}
                    >
                      {menuItem.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  )
}