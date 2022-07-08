import { Project } from "./Project";
import React, { SyntheticEvent } from "react";

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (projet: Project) => void;
}

function ProjectForm(props: ProjectFormProps) {
  const { onCancel, onSave } = props;
  const cancelHandler = () => {
    onCancel();
  };
  const saveHandler = (event:SyntheticEvent) => {
    event.preventDefault();
    onSave(new Project({name: "Updated Project"}))
  }
  return (
    <form className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" />
      <label htmlFor="description">Project Description</label>

      <textarea name="description" placeholder="enter description"></textarea>
      <label htmlFor="budget">Project Budget</label>

      <input type="number" name="budget" placeholder="enter budget" />
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" />

      <div className="input-group">
        <button className="primary bordered medium" onClick={saveHandler}>Save</button>
        <span></span>
        <button
          type="button"
          className="bordered medium"
          onClick={cancelHandler}
        >
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
