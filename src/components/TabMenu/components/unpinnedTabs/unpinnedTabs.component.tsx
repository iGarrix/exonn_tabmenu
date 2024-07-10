/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, SxProps } from '@mui/material'
import { Droppable, Draggable } from '@hello-pangea/dnd'

import { tabStore } from '../../tabmenu.store'
import { useLocation } from 'react-router-dom'
import { useScrollContainer } from '@/hooks/useScrollContainer'
import { TabWrapper } from '../tabWrapper/tabWrapper.component'
import { observer } from 'mobx-react-lite'

const unpinnedTabsSx: SxProps = {
	flexDirection: 'row',
	flexWrap: 'nowrap',
	height: '100%',
	overflowX: 'auto',
	overflowY: 'hidden',
	scrollbarWidth: 'none',
}

export const UnpinnedTabs = observer(() => {
	const { unpinnedTabs } = tabStore
	const { pathname } = useLocation()
	const containerRef = useScrollContainer()
	return (
		<Droppable
			droppableId='unpinnedTabs'
			direction='horizontal'
			type='unpinnedTabs'>
			{(provided, snapshot) => (
				<>
					<Stack
						id='unpinnedTabsContainer'
						ref={el => {
							containerRef.current = el
							provided.innerRef(el)
						}}
						sx={unpinnedTabsSx}
						{...provided.droppableProps}>
						{unpinnedTabs.map((tab, i) => (
							<Draggable key={tab.id} draggableId={tab.id} index={i}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}>
										<TabWrapper
											tab={tab}
											showDivider={tabStore.unpinnedTabs.length !== i + 1}
											isActive={tab.url === pathname}
											isDragging={snapshot.isDragging}
											handlePinTab={() => {
												tabStore.handlePinTab(tab.id)
											}}
											closeTab={() =>
												tabStore.removeTab(tab.id, 'unpinnedTabs')
											}
										/>
									</div>
								)}
							</Draggable>
						))}

						{provided.placeholder}
					</Stack>
				</>
			)}
		</Droppable>
	)
})
