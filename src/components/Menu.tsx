import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { handleNewMode } from '../redux/actions';

const options = [
    'New Mode',
    'Classic Mode'
];

export default function SimpleListMenu() {

    const isStarted = useSelector((state: any) => state.game.isStarted);
    const newMode = useSelector((state: any) => state.game.newMode)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        index: number,
    ) => {
        setAnchorEl(null);
        dispatch(handleNewMode(index))
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ border: '1px solid #fff', color: '#fff', padding: 0, borderRadius: 1, fontSize: '10px' }}
            >
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{ padding: '2.5px 20px' }}
                >
                    <ListItemText
                        primary={options[newMode ? 0 : 1]}
                    />
                </ListItemButton>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        disabled={isStarted}
                        selected={index === (newMode ? 0 : 1)}
                        onClick={() => handleMenuItemClick(index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
