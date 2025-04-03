export const appConfig = {
  name: "Prompt.Surf",
  title: "Prompt.Surf: Open-Source AI Prompt Library",
  description: "Explore Awesome AI Prompts for ChatGPT, Claude, Gemini, and every AI model",
  domain: "https://prompt.surf/",
  author: "Corey Chiu",
  keywords: "prompt, ai, chat",
  i18n: {
    // locales: ["en", "de", "es"] as const,
    locales: ["en", "zh"] as const,
    defaultLocale: "en" as const,
    localeLabels: {
      en: "English",
      zh: "简体中文",
      // es: "Español",
      // de: "Deutsch",
      // fr: "asdf",
    },
    localeDetection: false,
    localeCurrencies: {
      /* This only works with Stripe for now. For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard and there can only be one. */
      en: "USD",
      de: "USD",
      es: "USD",
    },
  },
  auth: {
    oAuthProviders: ["google", "github"],
  },
};

