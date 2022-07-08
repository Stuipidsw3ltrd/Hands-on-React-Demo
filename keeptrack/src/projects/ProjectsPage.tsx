import React from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { ReactDOM } from "react";
import { Project } from "./Project";
import ProjectList from "./ProjextList";


function ProjectsPage() {
    const saveProject = (project: Project) => {
        console.log("Saving Project: ", project)
    }
  return (
    <>
    <h1>Projects</h1>
    <ProjectList projects={MOCK_PROJECTS} onSave={saveProject}></ProjectList>
    </>
  );
}


export default ProjectsPage;
