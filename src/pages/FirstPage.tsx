import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import "./FirstPage.css";
import logo from "../Images/logoSplash.png"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom';

function Alert(props:any) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}
const FirstPage = (props: any) => 
{
    const history = useHistory();
    const [name, setName] = useState('')
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        props.setName({ name })
        history.push("/quiz");
    }
    const handleName = (e:any) => {
		setName(e.target.value)
    }
    const handleClose = (event: any, reason: any) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}
    return (
        <React.Fragment>
            <Snackbar
				open={open}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='error'>
					type your name
				</Alert>
			</Snackbar>
            <Box
                display="flex"
                flexDirection="column"
  justifyContent="center"
  alignItems="center"
  minHeight="80vh"
            >
                <img src={logo} alt="" style={{ width: "80%" }} />
                <div className="input-field">
                    <input type="text" onChange={handleName} placeholder="Name" />
                    
                </div>
                <input type="submit" onClick={() => {
						if (name.trim().length === 0) {
							setOpen(true)
						} else handleClick()
					}} value="Login" className="btn solid" />
            </Box>
            </React.Fragment>
    )
}

export default FirstPage;