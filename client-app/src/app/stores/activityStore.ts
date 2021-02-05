import { observable, action, makeObservable, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { REPL_MODE_STRICT } from 'repl';
import Activities from '../api/agent';
import { IActivity } from '../models/activity';


configure({enforceActions: 'always'});


class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable test = '';
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable editMode: Boolean = false;
  @observable createMode: Boolean = false;
  @observable subbmiting = false;
  @observable deleting = false;

  @computed get activitiesByDate() {
    return this.groupActivitiesBydate(Array.from(this.activityRegistry.values()))
  }
  groupActivitiesBydate (activities: IActivity[]) {
    const sortedActivity = activities.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    return Object.entries(sortedActivity.reduce((activities, activity)=> {
      const date = activity.date.split('T')[0];
      activities[date] = activities[date] ? [...activities[date], activity]: [activity];
      return activities
    }, {} as {[key: string]: IActivity[]}) );
  } 

   
  @action getActivities = async () => {
    this.loading = true;
    await Activities.getList()
      .then((response) => {
          runInAction(()=> {
            response.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activityRegistry.set(activity.id, activity);
              });
          });
      } )
      .catch((error) => {throw(error)})
      .finally(() => {
          runInAction(() => {
            this.loading = false;
          })
      });
  };

  @action getActivity = async (id: string) => {
    let activity = this.activityRegistry.get(id);
    if(activity){
      this.selectedActivity = activity
      this.loading = false
    }
    else {
      this.loading = true;
      await Activities.getDetails(id).then((response)=>{
        runInAction(()=> {
          this.selectedActivity = response
        })
      }).catch((error)=> {
        throw(error)
      })
      .finally(()=> {
        runInAction(()=> {
        this.loading = false
      })
      })
    }
  }
  @action editActivityHandler = async (activity: IActivity) => {
    this.subbmiting = true;
    await Activities.update(activity).then(() => {
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.subbmiting = false;
      this.createMode = false;
      this.editMode = false;
    }).finally;
  };


  @action setEditMode = (state: Boolean) => {
    
    this.editMode = state;
  };

  @action setCreatMode = (state: Boolean) => {
    
    this.createMode = state;
  };

  @action selectActivityHandler = (id: string) => {
    
    this.selectedActivity = this.activityRegistry.get(id);
    this.createMode = false;
  };
  @action deleteActivityhandler = (id: string) => {
    
    Activities.delete(id).then(() => {
      this.activityRegistry.delete(id);
      this.selectedActivity = undefined;
    });
  };

  @action addActivityHandler = async (activity: IActivity) => {
    
    await Activities.create(activity).then(() => {    
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
    });
  };

  @action clearSelectedActivity = ()=> {
    this.selectedActivity = undefined
  }

  constructor() {
    makeObservable(this);
  }
}

export default createContext(new ActivityStore());
