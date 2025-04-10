// components/Layout.tsx
import React from 'react'; // 确保导入 React
import { Navigation } from './Navigation'
import { Footer } from '@/components/Footer'
import { getCategories } from '@/lib/data';

export async function Layout({ children }: { children: React.ReactNode }) {
  // categories data
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navigation categories={categories}/>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}