import { useState } from 'react';
import Nav from '../nav/Nav';
import { useSnackbar } from 'notistack';
import config from '../../config/workspace';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [formData, setformData] = useState({
		email: '',
		password: '',
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setformData({ ...formData, [name]: value });
	};

	const validateData = (data) => {
		if (!data.email || !data.password) {
			enqueueSnackbar('Email and password are required', {
				variant: 'warning',
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'center',
				},
			});
			return false;
		}

		setformData({
			email: '',
			password: '',
		});

		return true;
	};

	const loginUser = async (formData) => {
		await axios
			.post(config.endPoint + '/api/login', formData)
			.then(() => {
				localStorage.setItem('userEmail', formData.email);
				enqueueSnackbar('Login successfuly', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
				});
				navigate('/');
			})
			.catch(() => {
				enqueueSnackbar('please register', {
					variant: 'error',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
				});
			});
	};

	return (
		<>
			<Nav />
			<div className='w-full h-[80vh]'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (validateData(formData)) {
							loginUser(formData);
						}
					}}
					className='m-auto flex flex-col justify-center items-center h-full'>
					<h1 className='mb-10 text-2xl uppercase'>Login</h1>
					<label className='input input-bordered flex items-center gap-2 mb-2'>
						<svg
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4 opacity-70'>
							<path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
							<path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
						</svg>
						<input
							type='text'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={(e) => handleInput(e)}
							value={formData.email}
						/>
					</label>
					<label className='input input-bordered flex items-center gap-2'>
						<svg
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4 opacity-70'>
							<path
								fillRule='evenodd'
								d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
								clipRule='evenodd'
							/>
						</svg>
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={(e) => handleInput(e)}
							value={formData.password}
						/>
					</label>

					<button
						type='submit'
						className='mt-10 bg-blue-400 px-6 py-2 text-white rounded-lg'>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
