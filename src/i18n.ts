import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { appConfig } from "./lib/appConfig";
 
// Can be imported from a shared config
const locales = appConfig.i18n.locales;
 
export default getRequestConfig(async ({requestLocale}) => {
  // Get the locale from requestLocale
  const locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as typeof locales[number])) notFound();
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});