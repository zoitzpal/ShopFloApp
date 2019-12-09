import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tab, Button } from '@material-ui/core';
import ProjectDetails from './ProjectDetails';
import ArrowBack from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(jobNumber: string) {
  return { jobNumber };
}

const rows = [
  createData('611167-B'),
  createData('611517-B'),
  createData('615667-B')
];

export default function Projects(props: any) {
  const {handleUserUIViewChange} = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [jobNumber, setJobNumber] = React.useState();

  const handleClickOpen = (open: boolean, jobNumber: string) => {
    setOpen(open);
    setJobNumber(jobNumber)
  };


  return (
    <div>
       <Button onClick={() => handleUserUIViewChange('Production')}>
        <ArrowBack /> Production
      </Button>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Number</TableCell>
              <TableCell> Details of job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.jobNumber}>
                <TableCell component="th" scope="row">
                  {row.jobNumber}
                </TableCell>
                <TableCell>
                    <Button onClick={() => handleClickOpen(true, row.jobNumber)}>
                        View more job details
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <ProjectDetails 
        handleClickOpen={handleClickOpen} 
        open={open}
        jobNumber={jobNumber} 
      />
    </div>
  );
}