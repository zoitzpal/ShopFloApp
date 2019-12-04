import React from 'react';
import OrdersTable from './OrdersTable';
import { Typography, makeStyles, Theme, createStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    placeOrderButton: {
      fontWeight: 600,
      cursor: 'pointer',
      position: 'absolute',
      right: 0,
      marginRight: '20px'
    },
    spacer: {
      height: 50
    }
  }),
);

export default function Orders(props: any) {
  const { handleUserUIViewChange } = props
  const classes = useStyles()

  const onClickUpdateView = (text: String) => {
    const userCategoryView = text
    handleUserUIViewChange(userCategoryView)
  }

  return (
    <div>
      <h1> Orders </h1>
      <OrdersTable />
    
    </div>
  );
}