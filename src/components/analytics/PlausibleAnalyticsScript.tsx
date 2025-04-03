"use client";

import Script from "next/script";
import React from "react";
const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_URL!;
const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC!;


export function PlausibleAnalyticsScript() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      defer
      type="text/javascript"
      data-domain={plausibleUrl}
      src={plausibleSrc}
    />
  );
}

