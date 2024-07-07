import { GrAppsRounded } from 'react-icons/gr'
import { CiBank, CiShop } from 'react-icons/ci'
import { FiPhoneCall, FiUserPlus } from 'react-icons/fi'
import { BsGraphUpArrow, BsCartCheck, BsBox2Fill } from 'react-icons/bs'
import { HiOutlineCog } from 'react-icons/hi'
import { IoBookOutline, IoCubeOutline } from 'react-icons/io5'

export function StaticGetIcon(react_icon: string) {
	switch (react_icon) {
		case 'CiBank':
			return <CiBank />
		case 'CiShop':
			return <CiShop />
		case 'FiPhoneCall':
			return <FiPhoneCall />
		case 'FiUserPlus':
			return <FiUserPlus />
		case 'BsGraphUpArrow':
			return <BsGraphUpArrow />
		case 'BsCartCheck':
			return <BsCartCheck />
		case 'BsBox2Fill':
			return <BsBox2Fill />
		case 'HiOutlineCog':
			return <HiOutlineCog />
		case 'IoBookOutline':
			return <IoBookOutline />
		case 'IoCubeOutline':
			return <IoCubeOutline />
		default:
			return <GrAppsRounded />
	}
}
