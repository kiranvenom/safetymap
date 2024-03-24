import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';

const Nav = () => {
	return (
		<div className='flex justify-between items-center h-[4rem] pl-4 pr-4 lg:pl-0 lg:pr-0 lg:max-w-[1200px] m-auto'>
			<Link to={'/'}>
				<img className='w-[100px] rounded-full' src={logo} alt='logo' />
			</Link>
			<div className='flex gap-6'>
				<Link className='btn' to={'/login'}>
					Login
				</Link>
				<Link className='btn' to={'/register'}>
					Register
				</Link>
			</div>
		</div>
	);
};

export default Nav;
