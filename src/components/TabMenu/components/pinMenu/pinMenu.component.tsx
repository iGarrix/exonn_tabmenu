import { useEffect, useRef, useState } from 'react'
import { Menu, MenuItem, Typography } from '@mui/material'

import PinTabIcon from '../../../../assets/icons/pin-tab-icon.svg?react'
import { tabStore } from '../../tabmenu.store'
import { findItem } from '@/lib/utils'

const PinDropdown = () => {
	const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
	const [isPinned, setIsPinned] = useState<boolean>(false)
	const tabIdRef = useRef<string | null>(null)
	const action = isPinned ? 'unpin' : 'pin'

	const closeMenu = () => {
		setMenu(null)
		tabIdRef.current = null
	}

	const onClick = () => {
		tabIdRef.current && tabStore.handlePinTab(tabIdRef.current)(action)
		closeMenu()
	}

	useEffect(() => {
		const handleRightClick = (ev: MouseEvent) => {
			const target = ev.target as HTMLElement
			const tabId = target.closest('[data-tab-id]')?.getAttribute('data-tab-id')

			if (tabId) {
				ev.preventDefault()
				const mouseXY = { x: ev.clientX - 2, y: ev.clientY + 6 }
				tabIdRef.current = tabId

				if (findItem(tabStore.unpinnedTabs, tabId)) {
					setMenu(mouseXY)
					setIsPinned(false)
				} else if (findItem(tabStore.pinnedTabs, tabId)) {
					setMenu(mouseXY)
					setIsPinned(true)
				}
			}
		}

		document.addEventListener('contextmenu', handleRightClick)

		return () => document.removeEventListener('contextmenu', handleRightClick)
	}, [tabStore.unpinnedTabs, tabStore.pinnedTabs])

	return (
		<Menu
			sx={{ '& .MuiList-root': { py: '4px' } }}
			open={!!menu}
			onClose={closeMenu}
			anchorReference='anchorPosition'
			anchorPosition={menu ? { top: menu.y, left: menu.x } : undefined}>
			<MenuItem sx={{ color: '#7F858D', gap: '8px' }} onClick={onClick}>
				<PinTabIcon
					style={{ transform: isPinned ? 'rotate(45deg)' : 'none' }}
				/>

				<Typography
					sx={{
						fontSize: 14,
						'&::first-letter': { textTransform: 'uppercase' },
					}}>
					{action + ' tab'}
				</Typography>
			</MenuItem>
		</Menu>
	)
}

export { PinDropdown }
