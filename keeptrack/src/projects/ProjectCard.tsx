import React from "react";
import { Project } from "./Project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

const handleEditClick = (
  projectBeingEdited: Project,
  editHandler: (project: Project) => void
) => {
  editHandler(projectBeingEdited);
};

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props;
  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{project.description}</p>
        <p>Budget: ${project.budget.toLocaleString()}</p>
        <button
          className=" bordered"
          onClick={() => {
            handleEditClick(project, onEdit);
          }}
        >
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;
