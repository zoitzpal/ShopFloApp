import React, { useEffect } from 'react';
import MaterialTable, { Icons } from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions, withStyles, IconButton, DialogContentText, TextField } from '@material-ui/core';
import Beenhere from '@material-ui/icons/Beenhere';
import ArrowBack from '@material-ui/icons/ArrowBack'
import CheckoutPopup from './CheckoutPopup';


export default function ToolList(props: any) {
  const tableIcons: Icons = {
    Add: forwardRef((props, ref: any) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref: any) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref: any) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref: any) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref: any) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref: any) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref: any) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref: any) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref: any) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref: any) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref: any) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref: any) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref: any) => <ViewColumn {...props} ref={ref} />)
  };

  const {handleUserUIViewChange} = props;
  const [state, setState] = React.useState({
    columns: [
      { title: 'Tool Name', field: 'toolName' },
      { title: 'Quanity of Tool', field: 'qty' },
      { title: 'Availability', field: 'availability', type: 'boolean' },
    ],
    data: [
      { toolName: 'Hammer', qty: 5, availabilty: true }

    ],
  });

  const [open, setOpen] = React.useState(false);
  const [toolName, setToolName] = React.useState('')
  const [qty, setQty] = React.useState(0)

  const handleClickOpen = (open: boolean) => {
    setOpen(open);
  };

  const updateQty = (qty: number) => {
    setQty(qty)
  }

  const updateDataInput = (newData: {
    toolName: string;
    qty: number;
    availabilty: boolean;
    }, oldData: any) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        setQty(oldData.qty)
        console.log(qty)
        const data = [...state.data];
        console.log(data[data.indexOf(oldData)])
        // setState({ ...state, data });
      }, 600);
    })
  


  return (
    <div>
      <Button onClick={() => handleUserUIViewChange('Inventory')}>
        <ArrowBack /> Inventory Lists
      </Button>
      <MaterialTable
        icons={tableIcons}
        title="Tools List"
        columns={[
          { title: 'Tool Name', field: 'toolName' },
          { title: 'Quantity of Tool', field: 'qty' },
          { title: 'Availability', field: 'availabilty', type: 'boolean' }
        ]}
        data={state.data}
        actions={[
          {
            icon: () => <Beenhere />,
            tooltip: 'Check out tool',
            onClick: (newData: any, oldData: any) => {
              setQty(oldData.qty)
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleClickOpen(true);
                  updateDataInput(newData, oldData);
                 
                }, 600);
              })
  
            }
          }
        ]}
        editable={{
          onRowAdd: (newData: {
            toolName: string;
            qty: number;
            availabilty: boolean;
          }) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
              }, 600);
            }),
          onRowUpdate: (newData: {
            toolName: string;
            qty: number;
            availabilty: boolean;
          }, oldData: any) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              }, 600);
            }),
          onRowDelete: (oldData: any) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            }),
        }}
      />

    <CheckoutPopup 
      handleClickOpen={handleClickOpen} 
      open={open} 
      toolName={toolName}
      updateQty={updateQty} 
      qty={qty}
    />

    </div>
  );
}