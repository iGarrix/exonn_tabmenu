/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import sass from './tabmenu.module.scss'
import { TabMenuItem } from './TabMenuItem/tabmenu_item.component'

interface ITabMenuProps extends ComponentPropsWithoutRef<'ul'> {}

function TabMenu({ className, children, ...props }: ITabMenuProps) {
	return (
		<ul className={cn(sass.tabmenu, className)} {...props}>
			{children}
		</ul>
	)
}

TabMenu.Item = TabMenuItem
export { TabMenu }
