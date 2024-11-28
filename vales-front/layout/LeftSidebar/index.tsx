import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import AppMenu from './Menu'
import { getMenuItems } from '@/common'
import { useAuthContext } from '@/context'

const LeftSidebar = () => {
	const { user } = useAuthContext();

	return (
		<div className="left-sidenav">
			<div className="brand">
				<Link to="/" className="logo">
					<span className='h4'>Menú Principal</span>
					{/* <div className="d-flex gap-1 justify-content-center">
						<span>
							<img src={logoSM} alt="logo-small" className="logo-sm" />
						</span>
						<span>
							<img
								src={logoImg}
								alt="logo-large"
								className="logo-lg logo-light"
							/>
							<img
								src={logoDark}
								alt="logo-large"
								className="logo-lg logo-dark"
							/>
						</span>
					</div> */}
				</Link>
			</div>

			<SimpleBar className="menu-content h-100">
				<AppMenu menuItems={getMenuItems(user!)} />
			</SimpleBar>
		</div>
	)
}

export default LeftSidebar
