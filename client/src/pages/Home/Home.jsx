import Nav from '../../components/nav/Nav';
import Map from '../../components/map/Map';

const Home = () => {
	return (
		<>
			<div className='pl-4 pr-4 lg:pl-0 lg:pr-0 lg:max-w-[1200px] m-auto'>
				<Nav />
				<Map />
			</div>
		</>
	);
};

export default Home;
