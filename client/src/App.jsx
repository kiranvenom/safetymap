import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
};

export default App;
