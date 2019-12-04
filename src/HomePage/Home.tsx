import React from 'react';
import Assignment from '@material-ui/icons/Assignment';
import SideDrawer from './SideDrawer';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';


export default function Home(props: any) {
  const [userUIView, setUserUIView] = React.useState('')
  const handleUserUIViewChange = (viewOnApp: string) => {
    setUserUIView(viewOnApp)
  }
  
  return (
    <div>

    <Router>
        <Switch>

        <SideDrawer handleUserUIViewChange={handleUserUIViewChange} userUIView={userUIView} />

            <Route path="/inventory"  />

        </Switch>
    </Router>

    </div>
  );
}
