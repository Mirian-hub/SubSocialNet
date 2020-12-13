import React, {Fragment, useContext, useEffect, useState } from 'react';
import './styles.css';
import { Container, Header, Icon, Image, List } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar  from '../../features/nav/navbar';
import ActivityDashboared  from '../../features/activities/dashboard/ActivityDashboared';
import ActivityStore from '../../app/stores/activityStore'
import {observer} from 'mobx-react-lite';
import {LoadingComponent} from './LoadingComponent';

const App: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.getActivities();
  }, [activityStore]) ;
 
  if(activityStore.loading) {
    return <LoadingComponent></LoadingComponent>;
  }
  return (  
    <Fragment>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
          <ActivityDashboared
          ></ActivityDashboared>      
      </Container>
    </Fragment>
  );
};

export default observer(App);
