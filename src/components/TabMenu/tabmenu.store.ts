import { findItem, removeItem } from '@/lib/utils'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { MOCK_TABLIST } from './tabmenu.mock'
// import localforage from 'localforage';

type TMockTabItem = (typeof MOCK_TABLIST)[number]

export type TTabItem = {
	id: string
	label: TMockTabItem['label']
	icon: TMockTabItem['icon']
	url: TMockTabItem['url']
}

export interface ITabStoreAbstraction {
	unpinnedTabs: TTabItem[]
	pinnedTabs: TTabItem[]
	setPinnedTabs: (array: TTabItem[]) => void
	setUnpinnedTabs: (array: TTabItem[]) => void
	removeTab: (id: string, type: 'pinnedTabs' | 'unpinnedTabs') => void
	handlePinTab: (id: string) => (action: 'pin' | 'unpin') => void
}

class TabStore implements ITabStoreAbstraction {
	unpinnedTabs: TTabItem[] = []
	pinnedTabs: TTabItem[] = []

	constructor() {
		makeAutoObservable(this)
		if (this.unpinnedTabs.length === 0) {
			this.unpinnedTabs = MOCK_TABLIST.map(f => f)
		}
		makePersistable(this, {
			name: 'tabStore',
			properties: ['pinnedTabs', 'unpinnedTabs'],
			storage: window.localStorage, // localforate set
		})
	}

	setPinnedTabs = (array: TTabItem[]) => {
		this.pinnedTabs = array
	}
	setUnpinnedTabs = (array: TTabItem[]) => {
		this.unpinnedTabs = array
	}
	removeTab(id: string, type: 'pinnedTabs' | 'unpinnedTabs') {
		type === 'pinnedTabs'
			? this.setPinnedTabs(removeItem(this.pinnedTabs, id))
			: this.setUnpinnedTabs(removeItem(this.unpinnedTabs, id))
	}
	handlePinTab = (id: string) => (action: 'pin' | 'unpin') => {
		if (action === 'pin') {
			const tabToPin = findItem(this.unpinnedTabs, id)
			tabToPin && this.setPinnedTabs([...this.pinnedTabs, tabToPin])
			tabToPin && this.removeTab(id, 'unpinnedTabs')
		} else if (action === 'unpin') {
			const tabToUnpin = findItem(this.pinnedTabs, id)
			tabToUnpin && this.setUnpinnedTabs([...this.unpinnedTabs, tabToUnpin])
			tabToUnpin && this.removeTab(id, 'pinnedTabs')
		}
	}
}

const tabStore = new TabStore()
export { tabStore }
