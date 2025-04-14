import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import { CategoryType } from "@/lib/types"

type CategoryListProps = {
  categories: CategoryType[] 
}


export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* @ts-ignore */}
        {categories.map((category: CategoryType, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a
                href={`/category/${category.slug}`}
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle className='capitalize'>{category.category}</CardTitle>
                <ArrowRightIcon size={16} className='ml-2' />
              </a>
              <CardDescription className='flex flex-col justify-between'>
                <div className='h-[40px] line-clamp-2 mt-4 tracking-tight text-start'>
                  {category.slug}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}