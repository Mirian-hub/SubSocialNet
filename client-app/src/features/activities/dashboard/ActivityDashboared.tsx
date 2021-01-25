import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityDetails  from '../details/ActivityDetails';
import  ActivityForm  from '../form/ActivityForm';
import ActivityList  from './ActivityList';
import ActivityStore from '../../../app/stores/activityStore';

 const ActivityDashboared: React.FC = () => {
   const store = useContext(ActivityStore);
   const {editMode, createMode, selectedActivity} = store

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>  
      </Grid.Column>      
      <Grid.Column width={6}>
        Activity Filtes
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboared) 
