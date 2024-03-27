import { useEffect, useState } from 'react';
import safeZone from '../../data/safetyZones';
import safetyConcern from '../../data/safetyConcern';
import axios from 'axios';
import config from '../../config/workspace';
import { useSnackbar } from 'notistack';

const PinForm = ({ longitude, latitude }) => {
	const { enqueueSnackbar } = useSnackbar();

	const [zone, setzone] = useState([]);
	const [concerns, setConcern] = useState([]);
	const [selectedZone, setSelectedZone] = useState(null);

	const [isother, setisother] = useState(false);

	const [formData, setFormData] = useState({
		userMail: localStorage.getItem('userEmail'),
		latitude: latitude,
		longitude: longitude,
		safetyConcern: '',
		safetyConcernExpirence: '',
		safetyZone: '',
		comments: '',
	});

	useEffect(() => {
		setzone(safeZone);
		setConcern(safetyConcern);
	}, []);

	const handleRadioChange = (e) => {
		setSelectedZone(e.target.value);
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleOther = (e) => {
		if (e.target.value === 'others') {
			setisother(true);
		} else {
			setisother(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post(config.endPoint + '/api/createpins', formData)
			.then(() => {
				enqueueSnackbar('Location added successfuly', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
				});
			})
			.catch((err) => {
				console.log(err);
				enqueueSnackbar('Location did not added (Please login or check the form)', {
					variant: 'error',
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
				});
			});
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			className='bg-white p-4 w-[fit-content] rounded-lg'>
			<h1 className='font-bold text-xl mb-2'>Safety concern</h1>
			<select
				required
				className='border border-black rounded-md p-1'
				name='safetyConcern'
				id='safetyConcern'
				defaultValue=''
				onChange={(e) => {
					handleInputChange(e);
					handleOther(e);
				}}>
				<option value='' disabled>
					Select your option
				</option>
				{concerns.map((concern) => (
					<option key={concern} value={concern}>
						{concern}
					</option>
				))}
			</select>

			<div>
				{isother && (
					<input
						required
						onChange={(e) => {
							handleInputChange(e);
						}}
						name='safetyConcernExpirence'
						className='border border-black px-4 py-1 rounded-md mt-2 w-full'
						type='text'
						placeholder='experience in a few words'
					/>
				)}
			</div>

			<div id='radio-group'>
				<h1 className='mt-6 font-bold text-xl'>Safety Zone Level</h1>
				{zone.map((z) => {
					return (
						<label
							className='flex items-center gap-2 p-1 m-1 rounded-md'
							key={z.name}
							htmlFor={z.name}>
							{z.name}
							<input
								required
								type='radio'
								name='safetyZone'
								value={z.name}
								id={z.name}
								onChange={handleRadioChange}
								checked={selectedZone == z.name}
							/>
						</label>
					);
				})}
			</div>

			<textarea
				onChange={(e) => {
					handleInputChange(e);
				}}
				required
				name='comments'
				placeholder='Comments'
				className='border border-black rounded-md p-2'
				cols='30'
				rows='2'></textarea>

			<button
				className='block bg-blue-600 px-6 py-2 rounded-md text-white mt-4'
				type='submit'>
				Submit
			</button>
		</form>
	);
};

export default PinForm;
