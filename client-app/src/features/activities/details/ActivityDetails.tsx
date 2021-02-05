import React, { useContext, useEffect } from 'react';
import {Grid} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';
import ActivityDetailedHeader  from './ActivityDetailedHeader';
import  ActivityDetailedInfo  from './ActivityDetailedInfo';
import { ActivityDetailedChat } from './ActivityDetailedChat';
import { ActivityDetailedSidebar } from './ActivityDetailedSidebar';

interface IProps {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IProps>> = ({
  match,
  history,
}) => {
  const {
    selectedActivity,
    setEditMode,
    getActivity,
  } = useContext(ActivityStore);
  useEffect(() => {
    getActivity(match.params.id);
  },[]);

  if (!selectedActivity) return < div> </ div>;
  return (
    <Grid>
      <Grid.Column width={10}>
          <ActivityDetailedHeader activity={selectedActivity}/>
          <ActivityDetailedInfo activity={selectedActivity}/>
          <ActivityDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
           <ActivityDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
