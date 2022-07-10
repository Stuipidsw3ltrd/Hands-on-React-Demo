import React, { Fragment, useState, useEffect } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { ReactDOM } from "react";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import ProjectList from "./ProjextList";

function ProjectsPage() {
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const saveProject = (project: Project) => {
    projectAPI
    .put(project)
    .then(() => {
      let updatedProjects: Project[] = projects.map((p:Project)=>{
        return p.id === project.id ? project : p
      })
      setProjects(updatedProjects)
    })
    .catch((e) => {
      if (e instanceof Error){
        console.log("error occurs in saving project:" + e.message);
        setError(e.message)
      }
    })


  }
  const handleMoreClick = () => {
    // let newPage = currentPage + 1
    setCurrentPage(currentPage + 1)
  }
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        // const data = await projectAPI.get(1, 20);
        const data = await projectAPI.get(currentPage, 20);
        setError("");
        // setProjects(data);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects([...projects, ...data])
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false)
      }
    }
    loadProjects();
  }, [currentPage])
  return (
    <Fragment>
      <h1>Projects</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse ">
                  {error}
                </span>
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} onSave={saveProject}></ProjectList>
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </Fragment>
  );
}


export default ProjectsPage;
