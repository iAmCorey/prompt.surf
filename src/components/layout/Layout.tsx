// components/Layout.tsx
import React from 'react'; // 确保导入 React
import { Navigation } from './Navigation'
import { Footer } from '@/components/layout/Footer'
import { getAllModels, getAllCategories } from '@/lib/data';

export async function Layout({ children }: { children: React.ReactNode }) {
  // categories data
  const categories = await getAllCategories();
  const models = await getAllModels();

  console.log('categories: ', categories?.length)
  console.log('models: ', models?.length)

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navigation categories={categories} models={models}/>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}