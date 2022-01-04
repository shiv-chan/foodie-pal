import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';

const Footer = () => {
	return (
		<footer>
			<Box
				bgcolor="primary.main"
				color="primary.contrastText"
				paddingY="1.5rem"
				width="100%"
			>
				<Container>
					<Box display="flex" justifyContent="center" alignItems="center">
						<Typography variant="body1" component="p">
							Made by{' '}
							<Link
								href="https://github.com/shiv-chan/foodie-pal"
								color="inherit"
								target="_blank"
								rel="noopener noreferrer"
							>
								Kaho Shibuya
							</Link>
						</Typography>
					</Box>
				</Container>
			</Box>
		</footer>
	);
};

export default Footer;
