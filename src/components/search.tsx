import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from './ui/button'
import strLogo from '@/assets/str-logo0.png'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({
  className = '',
  placeholder = 'Search',
}: SearchProps) {
  const { setOpen } = useSearch()
  return (
    <Button
      variant='outline'
      className={cn(
        'bg-muted/25 group text-muted-foreground hover:bg-accent relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <span className='ms-2'>{placeholder}</span>
      <img 
        src={strLogo}
        alt="STR"
        className='absolute end-2 top-1/2 -translate-y-1/2 size-6 object-contain grayscale'
      />
    </Button>
  )
}
