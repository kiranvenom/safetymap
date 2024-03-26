import { useEffect, useState } from 'react';
import safeZone from '../../data/safetyZones';
import safetyConcern from '../../data/safetyConcern';

const PinForm = () => {
	// console.log(safeZone);
	const [zone, setzone] = useState([]);
	const [concerns, setConcern] = useState([]);
	const [selectedZone, setSelectedZone] = useState(null);

	const [isother, setisother] = useState(false);

	useEffect(() => {
		setzone(safeZone);
		setConcern(safetyConcern);
	}, []);

	const handleRadioChange = (e) => {
		setSelectedZone(e.target.value);
	};

	const handleOther = (e) => {
		if (e.target.value === 'others') {
			setisother(true);
		} else {
			setisother(false);
		}
	};

	return (
		<form className='bg-white p-4 w-[fit-content] rounded-lg'>
			<select name='pin' id='pin' defaultValue='' onChange={handleOther}>
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
								type='radio'
								name='safety'
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
				required
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
