/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export const initialTabState = [
	{
		icon: 'GrAppsRounded',
		title: 'Dashboard',
		isPinned: false,
		path: '/',
		isSelected: true,
	},
	{
		icon: 'CiBank',
		title: 'Banking',
		isPinned: true,
		path: '/banking',
	},
	{
		icon: 'FiPhoneCall',
		title: 'Telefonie',
		isPinned: false,
		path: '/telephonie',
	},
	{
		icon: 'FiUserPlus',
		title: 'Accounting',
		isPinned: true,
		path: '/accounting',
	},
	{
		icon: 'CiShop',
		title: 'Verkauf',
		isPinned: false,
		path: '/verkauf',
	},
	{
		icon: 'BsGraphUpArrow',
		title: 'Statistik',
		isPinned: false,
		path: '/statistik',
	},
	{
		icon: 'MdMailOutline',
		title: 'Post Office',
		isPinned: true,
		path: '/post_office',
	},
	{
		icon: 'HiOutlineCog',
		title: 'Administration',
		isPinned: false,
		path: '/administration',
	},
	{
		icon: 'IoBookOutline',
		title: 'Help',
		isPinned: false,
		path: '/help',
	},
	{
		icon: 'IoCubeOutline',
		title: 'Warenbestand',
		isPinned: false,
		path: '/warenbestand',
	},
	{
		icon: 'FaListUl',
		title: 'Auswahllisten',
		isPinned: false,
		path: '/auswahllisten',
	},
	{
		icon: 'BsCartCheck',
		title: 'Einkauf',
		isPinned: false,
		path: '/einkauf',
	},
	{
		icon: 'CgBrowser',
		title: 'Rechn',
		isPinned: false,
		path: '/rechn',
	},
	{
		icon: 'BsBox2Fill',
		title: 'Lagerverwaltung',
		isPinned: false,
		path: '/lagerverwaltung',
	},
]

export type ITabItemType = {
	icon: string
	title: string
	isPinned: boolean
	path: string
	isSelected?: boolean
}

export interface ITabMenuStore {
	tabs: ITabItemType[]
	pin: (_item: ITabItemType) => void
	unpin: (_item: ITabItemType) => void
	close: (_item: ITabItemType) => string | null
	select: (_item: ITabItemType) => void
	reinit: (_items: ITabItemType[]) => void
}

class TabMenuStore implements ITabMenuStore {
	tabs: Array<ITabItemType> = initialTabState

	constructor() {
		makeAutoObservable(this)
		makePersistable(this, {
			name: 'tabStore',
			properties: ['tabs'],
			storage: window.localStorage,
		})
	}

	pin = (_item: ITabItemType): void => {}
	unpin = (_item: ITabItemType): void => {}
	close = (_item: ITabItemType): string | null => {
		const tab = this.tabs.findIndex(f => f === _item)
		const selectedTab = this.tabs[tab]
		let returnValue = null
		if (selectedTab.isSelected) {
			this.tabs[0].isSelected
			returnValue = this.tabs[0].path
		}
		this.tabs = this.tabs.filter(tab => tab !== _item)
		return returnValue
	}
	select = (_item: ITabItemType): void => {
		const tab = this.tabs.findIndex(f => f === _item)
		if (tab !== -1) {
			this.tabs[tab].isSelected = true
		}
	}
	reinit = (_items: ITabItemType[]): void => {
		this.tabs = _items
	}
}

const tabStore = new TabMenuStore()
export { tabStore }
