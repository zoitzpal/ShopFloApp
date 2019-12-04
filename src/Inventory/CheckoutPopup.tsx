import React, { useEffect } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogContentText, TextField, List, ListItem } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';

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

export default function CheckoutPopup(props: {
  handleClickOpen: any,
  open: boolean,
  toolName: string,
  updateQty: any,
  qty: number
}) {
  const { handleClickOpen, open, qty, updateQty } = props;
  const [updatedQty, setUpdatedQty] = React.useState(qty)


  const handleClose = () => {
    handleClickOpen(false);
    updateQty(updatedQty)
  };

  const handleCheckingOut = (e: any) => {
    console.log(e.target.value)
    // For now, just make sure to update the qty
    if(e.target.value != null){
      var newQty = (qty - e.target.value)
      setUpdatedQty(newQty)
      console.log(updatedQty)
    } 

  }

  useEffect(() => {
    updateQty(qty)
  }, [qty])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> {`Check out`} </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To check out a item please fill out the following fields.
            <br></br>
            {<Typography variant="caption">
              {`Note: Amount refers to the number of items you are checking out.`}
            </Typography>}
          </DialogContentText>
          <List>
            <ListItem key="date">
              <TextField 
                id="date"
                label="Date:"
                 />
            </ListItem>

            <ListItem key="employeeID">
              <TextField
                label="Employee ID:" />
            </ListItem>

            <ListItem key="amount">
              <TextField 
                label="Amount checking out:"
                onChange={(e) => handleCheckingOut(e)}
                />
            </ListItem>

          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Check out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}