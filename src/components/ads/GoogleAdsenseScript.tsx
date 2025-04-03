"use client";
import React from 'react';
import Script from 'next/script'

const googleAdsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID!;

export default function GoogleAdsenseScript() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
      crossOrigin="anonymous"
    />
  )
}