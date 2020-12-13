import React, { EventHandler, useContext, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'

 const ActivityForm: React.FC = () => {
  const store = useContext(ActivityStore)

  const currentActivity = store.selectedActivity
    ? store.selectedActivity
    : {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      };
  const [activity, setActivity] = useState<IActivity>(currentActivity);

  useEffect(() => {
    setActivity(currentActivity);
  }, [store.selectedActivity]);

  const formSubmitHandler = () => {
    if (activity.id.length > 0) {
      store.editActivityHandler(activity);
    } else {
        let newActivity = {
            ...activity,
            id: uuid()
        }
        store.addActivityHandler(newActivity);
    }
  };

  const formInputChangedHandelr = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
    console.log(activity);
  };
  return (
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
        <Button loading={store.subbmiting}
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
          }}
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);