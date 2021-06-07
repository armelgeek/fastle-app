import { projectModel, ProjectModel } from "./projects";

export interface StoreModel {
    projects:ProjectModel
};

const model: StoreModel = {
    projects:projectModel,
};

export default model;