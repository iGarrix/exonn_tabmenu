/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import style from './scss.style.module.scss';

import { observer } from 'mobx-react-lite'
import { TabMenu } from './tabmenu.component'
import { ITabItemType, tabStore } from './tabmenu.store'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	rectSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

interface ICustomDragOverlay {
	id: string | number
	data: ITabItemType
}

export const TabMenuWrapper = observer(() => {
	const [activeId, setActiveId] = useState<ICustomDragOverlay | null>(null)
	const location = useLocation()
	const navigate = useNavigate()

	function onCloseTab(item: ITabItemType) {
		const index = tabStore.close(item)
		if (index) {
			navigate(index)
		}
	}

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragStart = (event: DragStartEvent) => {
		const item = tabStore.tabs.find(f => f.path === event.active.id)
		if (item) {
			setActiveId({ id: event.active.id, data: item })
		}
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (over && active.id !== over.id) {
			const items = tabStore.tabs
			const oldIndex = items.findIndex(item => item.path === active.id)
			const newIndex = items.findIndex(item => item.path === over.id)
			tabStore.reinit(arrayMove(items, oldIndex, newIndex))
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={e => {
				handleDragEnd(e)
			}}
			modifiers={[restrictToHorizontalAxis]}>
			<SortableContext
				items={tabStore.tabs.map(f => {
					return { id: f.path, ...f }
				})}
				strategy={rectSortingStrategy}>
				<TabMenu className='bg-light border-t relative' draggable>
					<div className='flex sticky left-0 top-0 z-20 shadow-xl bg-light'>
						{tabStore.tabs
							.filter(f => f.isPinned)
							.map(item => (
								<TabMenu.Item
									key={item.path}
									pathId={item.path}
									isPinned={item.isPinned}
									tabIcon={item.icon}
									isSelected={
										location.pathname === item.path && item.isSelected
									}
									onCloseTab={() => {
										onCloseTab(item)
									}}
									onRedirect={() => {
										tabStore.select(item)
										navigate(item.path)
									}}>
									{item.title}
								</TabMenu.Item>
							))}
					</div>
					{tabStore.tabs
						.filter(f => !f.isPinned)
						.map(item => (
							<TabMenu.Item
								key={item.path}
								pathId={item.path}
								isPinned={item.isPinned}
								tabIcon={item.icon}
								isSelected={location.pathname === item.path && item.isSelected}
								onCloseTab={() => {
									onCloseTab(item)
								}}
								onRedirect={() => {
									tabStore.select(item)
									navigate(item.path)
								}}>
								{item.title}
							</TabMenu.Item>
						))}
				</TabMenu>
				<DragOverlay>
					{activeId ? (
						<TabMenu.Item
							key={activeId.data.path}
							pathId={activeId.data.path}
							isPinned={activeId.data.isPinned}
							tabIcon={activeId.data.icon}
							isDrag
							isSelected={
								location.pathname === activeId.data.path &&
								activeId.data.isSelected
							}
							onCloseTab={() => {
								onCloseTab(activeId.data)
							}}
							onRedirect={() => {
								tabStore.select(activeId.data)
								navigate(activeId.data.path)
							}}>
							{activeId.data.title}
						</TabMenu.Item>
					) : null}
				</DragOverlay>
			</SortableContext>
		</DndContext>
	)
})
