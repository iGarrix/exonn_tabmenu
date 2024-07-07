/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import sass from './tabmenu_item.module.scss'
import { IoIosClose } from 'react-icons/io'
import React from 'react'
import { StaticGetIcon } from '@/lib/icon_convertor'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Tooltip from '@mui/material/Tooltip'

export interface ITabMenuItemProps extends ComponentPropsWithoutRef<'li'> {
	tabIcon: string
	isSelected?: boolean
	isPinned?: boolean
	isDrag?: boolean
	pathId: string
	onCloseTab: () => void
	onRedirect: () => void
}

const TabMenuItem: React.FC<ITabMenuItemProps> = ({
	className,
	children,
	isSelected,
	isPinned,
	isDrag,
	tabIcon,
	style,
	pathId,
	onCloseTab,
	onRedirect,
	...props
}) => {
	const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		onCloseTab()
	}

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: pathId })

	const styleDND = {
		transform: CSS.Translate.toString(transform),
		transition,
	}
	return (
		<li
			ref={setNodeRef}
			onClick={onRedirect}
			className={cn(
				sass.tabmenu_item,
				isSelected && sass.selected,
				isPinned && sass.pinned,
				isDrag && sass.draggable,
				isDragging && sass.hide,
				className
			)}
			draggable
			style={!isPinned ? styleDND : style}
			{...props}>
			<Tooltip title={isPinned ? children : ''}>
				<div className='w-[16px] h-[16px]' {...attributes} {...listeners}>
					{StaticGetIcon(tabIcon)}
				</div>
			</Tooltip>

			<div
				className={cn(
					'line-clamp-1 whitespace-nowrap items-center gap-2',
					isPinned ? 'hidden' : 'flex'
				)}>
				<div>{children}</div>
				<button className={sass.close_button} onClick={onClose}>
					<IoIosClose />
				</button>
			</div>
		</li>
	)
}

export { TabMenuItem }
