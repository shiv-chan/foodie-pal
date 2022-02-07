import React from 'react';
import { Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flex: '1 0 auto',
				my: 5,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h1
				style={{
					margin: '3rem auto',
					fontSize: '3.5rem',
					textAlign: 'center',
				}}
			>
				Foodie Pal
			</h1>
			<img
				src="/assets/kitchenware.png"
				alt="kitchenware"
				style={{ width: '100%', maxWidth: '800px' }}
			/>
			<h2 style={{ margin: '3rem auto 1rem', textAlign: 'center' }}>
				Create Your Own Recipes
			</h2>
			<Link to="/login" style={{ textDecoration: 'none' }}>
				<Button variant="contained">Create Recipe Now</Button>
			</Link>
		</Container>
	);
};

export default Home;
