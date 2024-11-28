import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'react-bootstrap'

import { FiPower, FiUser } from 'react-icons/fi'
import { useAuthContext } from '@/context'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const ProfileDropdown = () => {
	const { removeSession, user } = useAuthContext()
	const navigate = useNavigate()

	const logout = () => {
		removeSession()
		navigate('/auth/login')
	}

	return (
		<Dropdown as="li">
			<DropdownToggle
				as="a"
				className="nav-link waves-effect waves-light nav-user"
			>
				<span className="ms-1 nav-user-name hidden-sm">{user!.email}{" "}</span>
				<FaUserCircle
					className="rounded-circle thumb-xs"
				/>
			</DropdownToggle>
			<DropdownMenu className="dropdown-menu-end">
				<DropdownItem className='p-0 m-0' as="span">
					<Link to={"/sistema/perfil"} className='py-1 px-4 w-100 d-block'>
						<FiUser className="align-self-center icon-xs icon-dual me-1" />{' '}
						Perfil
					</Link>
				</DropdownItem>
				<div className="dropdown-divider mb-0"></div>
				<DropdownItem onClick={() => logout()}>
					<FiPower className="align-self-center icon-xs icon-dual me-1" />{' '}
					Cerrar sesión
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}

export default ProfileDropdown
