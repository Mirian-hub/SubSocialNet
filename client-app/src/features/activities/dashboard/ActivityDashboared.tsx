import { setServers } from 'dns';
import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';

interface IProps {
  activities: IActivity[];
  selectActivityHandler: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: Boolean;
  setEditMode: (state: Boolean) => void;
  creatMode: Boolean;
  setCreatMode: (state: Boolean) => void;
  addActivityHandler: (activity: IActivity) => void;
  editActivityHandler: (activity: IActivity) => void;
  deleteActivityhandler: (id: string) => void;
}

export const ActivityDashboared: React.FC<IProps> = (props: IProps) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        {
          <ActivityList
            activities={props.activities}
            selectActivityHandler={props.selectActivityHandler}
            deleteActivityhandler={props.deleteActivityhandler}
          />
        }
      </Grid.Column>
      <Grid.Column width={6}>
        {props.selectedActivity && !props.creatMode && (
          <ActivityDetails
            selectedActivity={!props.creatMode ? props.selectedActivity : null}
            setEditMode={props.setEditMode}
          />
        )}
        {(props.creatMode || props.editMode) && (
          <ActivityForm
            selectedActivity={!props.creatMode ? props.selectedActivity : null}
            setEditMode={props.setEditMode}
            setCreatMode={props.setCreatMode}
            addActivityHandler={props.addActivityHandler}
            editActivityHandler={props.editActivityHandler}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
