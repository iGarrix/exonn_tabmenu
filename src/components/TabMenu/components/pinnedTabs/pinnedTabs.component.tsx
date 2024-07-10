import { Stack, SxProps } from '@mui/material'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { tabStore } from '../../tabmenu.store'
import { useLocation } from 'react-router-dom'
import { TabWrapper } from '../tabWrapper/tabWrapper.component'
import { observer } from 'mobx-react-lite'

const pinnedTabsSx: SxProps = {
	flexDirection: 'row',
	flexWrap: 'nowrap',
	height: '100%',
	flexShrink: 0,
	borderColor: '#aeb6ce33',
}

export const PinnedTabs = observer(() => {
	const { pathname } = useLocation()
	const { pinnedTabs } = tabStore
	return (
		<Droppable
			droppableId='pinnedTabs'
			direction='horizontal'
			type='pinnedTabs'>
			{provided => (
				<Stack
					{...provided.droppableProps}
					ref={provided.innerRef}
					sx={{
						borderRight: tabStore.pinnedTabs.length > 0 ? 1 : 0,
						...pinnedTabsSx,
					}}>
					{pinnedTabs.length > 0 &&
						pinnedTabs.map((tab, i) => (
							<Draggable key={tab.id} draggableId={tab.id} index={i}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}>
										<TabWrapper
											tab={tab}
											isPinned
											showDivider={tabStore.pinnedTabs.length !== i + 1}
											isActive={tab.url === pathname}
											isDragging={snapshot.isDragging}
											handlePinTab={tabStore.handlePinTab(tab.id)}
											closeTab={() => tabStore.removeTab(tab.id, 'pinnedTabs')}
										/>
									</div>
								)}
							</Draggable>
						))}

					{provided.placeholder}
				</Stack>
			)}
		</Droppable>
	)
})
