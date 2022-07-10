import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "./Project";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project:Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
  //   return <pre>{JSON.stringify(projects, null, " ")}</pre>;
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const handleCancel = () => {
    setProjectBeingEdited({});
  };

//   const handleSubmit = (newProject: Project) => {
//     setProjectBeingEdited(newProject)
//   }

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {project === projectBeingEdited ? (
            <ProjectForm project={project} onCancel={handleCancel} onSave={onSave}/>
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
