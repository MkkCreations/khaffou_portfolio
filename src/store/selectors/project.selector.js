import { createSelector } from 'reselect'

const _projects = state => state.projectReducer.projects;
const _project = state => state.projectReducer.project;
const _addProject = state => state.projectReducer.addProject;
const _deleteProject = state => state.projectReducer.deleteProject;
const _updateProject = state => state.projectReducer.updateProject;

export const projectsSelector = createSelector(
    _projects,
    projects => projects
);

export const projectSelector = createSelector(
    _project,
    project => project
);

export const addProjectSelector = createSelector(
    _addProject,
    addProject => addProject
);

export const deleteProjectSelector = createSelector(
    _deleteProject,
    deleteProject => deleteProject
);

export const updateProjectSelector = createSelector(
    _updateProject,
    updateProject => updateProject
);
