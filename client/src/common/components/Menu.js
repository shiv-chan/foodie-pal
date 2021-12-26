import React, { useState } from 'react';
import {
	Box,
	List,
	SwipeableDrawer,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import { useHistory } from 'react-router-dom';

const Menu = ({ isOpen, setIsOpen }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const history = useHistory();

	const handleListItemButtonClick = (path) => {
		history.push(path);
		setIsOpen(false);
	};

	const handleClickDeleteAccount = () => {
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const list = () => (
		<Box sx={{ width: 250 }} role="presentation">
			<List sx={{ marginBottom: 'auto' }}>
				<ListItemButton onClick={() => handleListItemButtonClick('/recipes')}>
					<ListItemIcon>
						<MenuBookRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Recipes" />
				</ListItemButton>
				<ListItemButton onClick={() => handleListItemButtonClick('/add')}>
					<ListItemIcon>
						<AddBoxRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Create Recipe" />
				</ListItemButton>
			</List>
			<Divider />
			<List>
				<ListItemButton onClick={handleClickDeleteAccount}>
					<ListItemIcon>
						<ReportRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Delete Account" />
				</ListItemButton>
			</List>
			<Dialog
				open={isDialogOpen}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					color="error"
					display="flex"
					alignItems="center"
				>
					<ReportRoundedIcon />
					{'Delete Account'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete your account? If you delete your
						account, you will permanently lose your recipes.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} sx={{ color: 'gray' }}>
						Cancel
					</Button>
					<Button color="error">Delete Acccount</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);

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
