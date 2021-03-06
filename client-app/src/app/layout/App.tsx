import React, {Fragment, useContext, useEffect, useState } from 'react';
import './styles.css';
import { Container, Header, Icon, Image, List } from 'semantic-ui-react';
import NavBar  from '../../features/nav/navbar';
import ActivityDashboared  from '../../features/activities/dashboard/ActivityDashboared';
import ActivityStore from '../../app/stores/activityStore'
import {observer} from 'mobx-react-lite';
import {LoadingComponent} from './LoadingComponent';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound'
import {ToastContainer} from 'react-toastify'

const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.getActivities();
  }, [activityStore]) ;
 
  if(activityStore.loading) {
    return <LoadingComponent></LoadingComponent>;
  }
  return (  
    <Fragment>    
      <ToastContainer position='bottom-right'/>
      <Route exact path='/' component={HomePage}></Route>
      <Route path={'/(.+)'} render= {()=>(
        <Fragment> 
           <NavBar/>
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboared}></Route>      
                <Route exact={true} path='/activities/:id' component={ActivityDetails}></Route>      
                <Route key={location.key}
                  path={['/creatActivity', '/manage/:id']} component={ActivityForm}></Route>  
                <Route  component={NotFound}/>
              </Switch>
            </Container>  
        </Fragment>
      )} />
     
    </Fragment>
  );
};

export default withRouter(observer(App));
