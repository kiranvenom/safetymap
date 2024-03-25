import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import { useContext } from 'react';
import userLoginContext from '../../context/context';

const Nav = () => {
	const { userMail, handleLogout } = useContext(userLoginContext);

	return (
		<div className='flex justify-between items-center h-[4rem] pl-4 pr-4 lg:pl-0 lg:pr-0 lg:max-w-[1200px] m-auto border-b border-black'>
			<Link to={'/'}>
				<img className='w-[100px] rounded-full' src={logo} alt='logo' />
			</Link>
			<div className='flex gap-6'>
				{userMail !== null ? (
					<>
						<div className='flex items-center gap-4'>
							<span className='bg-white px-4 py-1 rounded-full cursor-none drop-shadow-md'>
								{userMail}
							</span>
							<button
								className='btn drop-shadow-md'
								onClick={handleLogout}>
								Logout
							</button>
						</div>
					</>
				) : (
					<>
						<Link className='btn drop-shadow-md' to={'/login'}>
							Login
						</Link>
						<Link className='btn drop-shadow-md' to={'/register'}>
							Register
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Nav;
