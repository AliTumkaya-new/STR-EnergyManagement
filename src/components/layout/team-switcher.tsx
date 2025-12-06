import * as React from 'react'
import { ChevronsUpDown, Plus, type LucideIcon } from 'lucide-react'
import strLogo from '@/assets/str-logo0.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

type TeamSwitcherProps = {
  teams: {
    name: string
    logo: LucideIcon
    plan: string
  }[]
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  // STR Enerji icin ozel logo kullan
  const isSTRTeam = activeTeam.name === 'STR Enerji'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden bg-white'>
                {isSTRTeam ? (
                  <img src={strLogo} alt="STR Enerji" className="size-7 object-contain" />
                ) : (
                  <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                    {activeTeam.logo && <activeTeam.logo className='size-4' />}
                  </div>
                )}
              </div>
              <div className='grid flex-1 text-start text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeTeam.name}
                </span>
                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Tesisler
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border overflow-hidden bg-white'>
                  {team.name === 'STR Enerji' ? (
                    <img src={strLogo} alt="STR Enerji" className="size-5 object-contain" />
                  ) : team.logo ? (
                    <team.logo className='size-4 shrink-0' />
                  ) : null}
                </div>
                {team.name}
                <DropdownMenuShortcut>{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>Tesis Ekle</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}