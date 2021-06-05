import { Action, action,Thunk, thunk } from "easy-peasy";
import projectService from '../services/project.service';
export interface ProjectModel {
  projects:any;
  fetched: Action<ProjectModel, any>;
  saved : Action<ProjectModel, any>;
  setProjects : Action<ProjectModel, any>;
  fetchProjects:Thunk<ProjectModel>;
  save: Thunk<ProjectModel>;
  toggle: Thunk<ProjectModel,any,any>;
  update: Thunk<ProjectModel,any,any>;
  updated : Action<ProjectModel, any>;
  removed :Action<ProjectModel,number>;
  remove : Thunk<ProjectModel, any ,any>;
  find : Thunk<ProjectModel, number>;
  initialize:Thunk<ProjectModel, any>;
}
export const projectModel: ProjectModel = {
  projects: [],
  fetched: action((state:any, payload) => {
    state.projects = payload.reduce((acc:any, project:any) => {
      acc[project.id] = project;
      return acc;
    }, {});
  }),
  setProjects: action((state:any, payload) => {
    state.projects= payload;
  }),
  saved: action((state:any, payload) => {
    state.projects.unshift(payload)
  }),
  fetchProjects: thunk(async actions => {
    const projects = await projectService.fetchProjects();
    actions.fetched(projects);
  }),
  toggle: thunk(async (actions, payload, { getState }) => {
    const project = getState().projects[payload];
    if (!project) return;
    const updated = await projectService.updateProject(payload, {
      done: !project.done,
    });
    actions.saved(updated);
  }),
   find: thunk(async (actions, payload, { getState }) => {
    const project = getState().projects[payload];
    if (!project) return;
    actions.fetched(project);
  }),
   update: thunk(async (actions, payload, { getState }) => {
    const updated = await projectService.updateProject(payload._id,payload);
    actions.updated(payload);
  }),
  updated:action((state,payload)=> {
    for(var i = 0; i < state.projects.length; i += 1) {
      if(state.projects[i]["_id"] === payload._id) {
        state.projects[i] = payload
      }
  }
  }),
  save: thunk(async (actions, payload) => {
    const project = await projectService.saveProject(payload);
    actions.saved(project);
  }),
  removed: action((state, id) => {
     state.projects = state.projects.filter((project:any) => project._id !== id);
  }),
  remove: thunk(async (actions, payload) => {
    console.log(payload)
    if (!payload) return;
    const removedProject = await projectService.deleteProject(payload);
    actions.removed(payload)
  }),
  initialize: thunk(async (actions, payload) => {
    const projects= await projectService.fetchProjects()
    actions.setProjects(projects)
  })
};
