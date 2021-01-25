import React, { EventHandler, useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';
import { storeDecorator } from 'mobx/dist/internal';

interface IProps {
  id: string;
}

const ActivityForm = (props: any) => {
  const store = useContext(ActivityStore);

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    debugger;
    if (
      props.match.params.id &&
      props.match.params.id.length > 15 &&
      activity.id.length === 0
    ) {
      store.getActivity(props.match.params.id).then(() => {
        store.selectedActivity && setActivity(store.selectedActivity);
      });
    }
    if (store.selectedActivity) {
      debugger;
      return () => {
        store.clearSelectedActivity();
      };
    }
  }, [
    store.selectedActivity,
    store.clearSelectedActivity,
    store.getActivity,
    activity.id.length,
  ]);

  const formSubmitHandler = () => {
    debugger;
    if (activity.id.length > 15) {
      store.editActivityHandler(activity).then(() => {
        props.history.goBack();
        props.history.push(`activities/${activity.id}`);
      });
    } else {
      debugger;
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      store
        .addActivityHandler(newActivity)
        .then(() => props.history.push(`activities/${newActivity.id}`));
    }
  };

  const formInputChangedHandelr = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
    console.log(activity);
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form>
            <Form.Input
              placeholder="Title"
              onChange={formInputChangedHandelr}
              name="title"
              value={activity.title}
            />
            <Form.TextArea
              rows={2}
              placeholder="Description"
              onChange={formInputChangedHandelr}
              name="description"
              value={activity.description}
            />
            <Form.Input
              placeholder="Category"
              onChange={formInputChangedHandelr}
              name="category"
              value={activity.category}
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              onChange={formInputChangedHandelr}
              name="date"
              value={activity.date}
            />
            <Form.Input
              placeholder="City"
              onChange={formInputChangedHandelr}
              name="city"
              value={activity.city}
            />
            <Form.Input
              placeholder="Venue"
              onChange={formInputChangedHandelr}
              name="venue"
              value={activity.venue}
            />
            <Button
              loading={store.subbmiting}
              floated="right"
              positive
              type="submit"
              content="submit"
              onClick={() => {
                formSubmitHandler();
              }}
            />
            <Button
              floated="right"
              type="button"
              content="cancel"
              onClick={() => {
                store.setCreatMode(false);
                store.setEditMode(false);
                props.history.push(`/activities`);
              }}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
