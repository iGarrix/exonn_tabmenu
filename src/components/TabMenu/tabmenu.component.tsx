'use client'

import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import Stack from '@mui/material/Stack'
import { tabStore } from './tabmenu.store'
import { UnpinnedTabs } from './components/unpinnedTabs/unpinnedTabs.component'
import { PinDropdown } from './components/pinMenu/pinMenu.component'
import { PinnedTabs } from './components/pinnedTabs/pinnedTabs.component'

export const TabMenu = () => {
	const onDragEnd = (result: DropResult) => {
		const { source, destination, type } = result
		if (!destination) return

		const newOrder =
			type === 'pinnedTabs'
				? [...tabStore.pinnedTabs]
				: [...tabStore.unpinnedTabs]
		const [moved] = newOrder.splice(source.index, 1)
		newOrder.splice(destination.index, 0, moved)
		type === 'pinnedTabs'
			? tabStore.setPinnedTabs(newOrder)
			: tabStore.setUnpinnedTabs(newOrder)
	}

	return (
		<Stack
			className='bg-light'
			component='nav'
			position='relative'
			direction='row'
			flexWrap='nowrap'
			height='48px'
			border={1}
			borderColor='#f1f5f8'>
			<DragDropContext onDragEnd={onDragEnd}>
				<PinnedTabs />
				<UnpinnedTabs />
			</DragDropContext>

			<PinDropdown />
		</Stack>
	)
}
