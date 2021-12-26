import React from 'react';
import {
	Box,
	List,
	SwipeableDrawer,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@mui/material';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

const Menu = ({ isOpen, setIsOpen }) => {
	const list = () => (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				<ListItem button>
					<ListItemIcon>
						<MenuBookRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Recipes" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<AddBoxRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Create Recipe" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon>
						<ReportRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Delete Account" />
				</ListItem>
			</List>
		</Box>
	);

	console.log(isOpen);

	return (
		<SwipeableDrawer
			anchor="left"
			open={isOpen}
			onClose={() => setIsOpen(false)}
			onOpen={() => setIsOpen(true)}
		>
			{list()}
		</SwipeableDrawer>
	);
};

export default Menu;
