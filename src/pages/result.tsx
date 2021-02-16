import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import logo from "../Images/logoSplash.png"
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import { useHistory } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props: any) {
    const [open, setOpen] = React.useState(props.showResult);
    const history = useHistory();

    React.useEffect(() => {
        setOpen(props.showResult);
    }, [props.showResult])

  const handleClose = () => {
      setOpen(false);
      history.push("/page/landing");
  };

  return (
    <div>
      <Dialog  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          You Completed the Assignment
        </DialogTitle>
              <DialogContent dividers>
              <Box
                display="flex"
                flexDirection="column"
  justifyContent="center"
  alignItems="center"
  minHeight="20vh"
            >
                          <img src={logo} alt="" style={{ width: "50%" }} />
                          <Typography variant="h5">Hello {props.name}, </Typography>
                          <Typography> Your score is {props.score}</Typography>
                          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Take Quiz Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
