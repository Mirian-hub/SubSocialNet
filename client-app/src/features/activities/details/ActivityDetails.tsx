import React, { useContext, useEffect } from 'react';
import {Grid} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { Link, RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
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
    loading,
    editMode,
  } = useContext(ActivityStore);
  useEffect(() => {
    getActivity(match.params.id);
  }, [getActivity]);

  if (!selectedActivity) return <LoadingComponent />;
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
    // <Card fluid>
    //     <Image src= {`/assets/categoryImages/${selectedActivity?.category}.jpg`} wrapped ui={false} />
    //     <Card.Content>
    //         <Card.Header>{selectedActivity?.title}</Card.Header>
    //     <Card.Meta>
    //          <span className='date'> {selectedActivity?.date} </span>
    //     </Card.Meta>
    //     <Card.Description>
    //         {selectedActivity?.description}
    //     </Card.Description>
    //     </Card.Content>
    //     <Card.Content extra>
    //       <ButtonGroup widths={2}>
    //           <Button as ={Link} to={`/manage/${selectedActivity.id}`} content="Edit" color='blue' basic />
    //           <Button content="Cancel" color='brown' basic onClick={()=> history.push('/activities')}/>
    //       </ButtonGroup>
    //     </Card.Content>
    // </Card>
  );
};

export default observer(ActivityDetails);
