import React, {useContext} from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ActivityStore from '../../../app/stores/activityStore';
import { IActivity } from '../../../app/models/activity';

export const AcitivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
  const store = useContext(ActivityStore);
  const {
    deleteActivityhandler,
  } = store;
  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as="a"> {activity.title} </Item.Header>
        <Item.Meta> {activity.date} </Item.Meta>
        <Item.Description>
          <div>{activity.description} </div>
          <div>{activity.city} </div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="view"
            color="blue"
          />
          <Button
            floated="right"
            content="delete"
            color="red"
            onClick={() => deleteActivityhandler(activity.id)}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
