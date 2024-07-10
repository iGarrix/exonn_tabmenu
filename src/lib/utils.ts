import { TTabItem } from '@/components/TabMenu/tabmenu.store'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const removeItem = (source: TTabItem[], id: string) =>
	source.filter(tab => tab.id !== id)

export const findItem = (source: TTabItem[], id: string) =>
	source.find(tab => tab.id === id)
