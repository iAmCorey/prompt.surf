import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "@/components/ui/card"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export const CategoryList = ({ categories }: CategoryListProps) => {
    return (
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* @ts-ignore */}
          {categories.map((category: categoryProps, index) => (
            <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
              <CardHeader>
                <a 
                  href={`/category/${category.link}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  <CardTitle className='capitalize'>{category.name}</CardTitle>
                  <ArrowRightIcon size={16} className='ml-2'/>
                </a>
                <CardDescription className='flex flex-col justify-between'>
                  <div className='h-[40px] line-clamp-2 mt-4 tracking-tight text-start'>
                  {category.description}
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    )
  }