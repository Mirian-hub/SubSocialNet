import React, { EventHandler, useEffect, useState } from 'react';
import { Interface } from 'readline';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
interface IProps {
  selectedActivity: IActivity | null;
  setCreatMode: (state: Boolean) => void;
  setEditMode: (state: Boolean) => void;
  addActivityHandler: (activity: IActivity) => void;
  editActivityHandler: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  selectedActivity,
  setCreatMode,
  setEditMode,
  addActivityHandler,
  editActivityHandler,
}) => {
  // debugger

  const currentActivity = selectedActivity
    ? selectedActivity
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
  }, [selectedActivity]);

  const formSubmitHandler = () => {
    if (activity.id.length > 0) {
      editActivityHandler(activity);
    } else {
        let newActivity = {
            ...activity,
            id: uuid()
        }
      addActivityHandler(newActivity);
      debugger;

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
        <Button
          floated="right"
          positive
          type="submit"
          content="submit"
          onClick={() => {
            setCreatMode(false);
            setEditMode(false);
            formSubmitHandler();
          }}
        />
        <Button
          floated="right"
          type="button"
          content="cancel"
          onClick={() => {
            setCreatMode(false);
            setEditMode(false);
          }}
        />
      </Form>
    </Segment>
  );
};
