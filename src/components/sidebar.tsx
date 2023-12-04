import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
import { DrawerList } from '../utilities/drawerList';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './accountMenu';
import TopBar from './topBar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MyContext } from '../hooks/useContext';


const drawerWidth = 250;
const drawerList = DrawerList()

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SideBar(props: any) {
  // get react context
  const context = useContext(MyContext);

  // get active menu item for styling
  React.useEffect(()=>{
    const path = window.location.pathname.split('/')[1]
    const activeMenu = document.getElementById(path)
    activeMenu && activeMenu.classList.add('activeMenuItem')
  })
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // handle side bar for mobile scrren
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container = window !== undefined ? () => window.document.body : undefined;

  //handle snackbar
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    if(context.err !== "" || context.info !== "" ){
      setOpen(true);
    }
  }, [context]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    context.setErr("")
    context.setInfo("")
  };


  return (
    <Box  sx={{ 
      display: 'flex', 
      '& .MuiAppBar-root':{
        boxShadow: 0
      }
    }}>      
      <Drawer className = 'drawer'
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor:'secondary.main',
            borderRight: 0
          },
          '& .MuiTypography-root': {
            fontSize : '18px'
          }

        }}
        // variant="permanent"
        anchor="left"
      >
        <AccountMenu/>
      <List>
        {drawerList.map((obj, index) => (
          <ListItem key={index} disablePadding sx = {{}} >
            <ListItemButton id = {obj.href} component = "a" href = {obj.href}
             sx ={{
              textTransform: 'capitalize'
            }}>
              <ListItemIcon>
                {obj.icon}
              </ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Drawer>
      <Drawer className = 'drawer'
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor:'secondary.main',
            borderRight: 0
          },
          '& .MuiTypography-root': {
            fontSize : '15px'
          }

        }}
        variant="permanent"
        anchor="left"
      >
        <AccountMenu/>
      <List>
        {drawerList.map((obj, index) => (
          <ListItem key={index} disablePadding sx = {{}} >
            <ListItemButton id = {obj.href} component = "a" href = {`/${obj.href}`}
             sx ={{
              textTransform: 'capitalize'
            }}>
              <ListItemIcon>
                {obj.icon}
              </ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Drawer>
      <Box
      component="main"
      sx={{ flexGrow: 1, p: 5 , pt:0}}
      >
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        <TopBar/>
        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open} 
          autoHideDuration={18000} 
          onClose={handleClose}  
          key={'top' + 'center'}
          sx={{ zIndex:'99999999999999999999999999999999' }}
          >
          {(context.err !=="") ?
            <Alert onClose={handleClose} severity= "error" sx={{ width: '100%'}}>
              {context.err}
            </Alert>
            :
            <Alert onClose={handleClose} severity= "info" sx={{ width: '100%'}}>
              {context.info}
            </Alert>
          }    
        </Snackbar>
        {props.children}
      </Box>
      
    </Box>
  );
}
