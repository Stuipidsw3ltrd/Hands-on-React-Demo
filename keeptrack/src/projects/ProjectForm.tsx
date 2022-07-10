import { Project } from "./Project";
import React, { SyntheticEvent, useState } from "react";

interface ProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (projet: Project) => void;
}

function ProjectForm({ project: initialProject, onCancel, onSave }: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({ name: "", description: "", budget: "" })
  const cancelHandler = () => {
    onCancel();
  };
  const saveHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(errors)
    if (!isValid(errors))
    {
      console.log("Triggered!")
      return;
    } 
    onSave(project)
  }

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue
    };

    let updatedProject: Project;
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject
    })

    setErrors(() => validate(updatedProject))
  }

  function validate(project: Project) {
    let errors = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Project's name is required";
    }
    if (project.name.length > 0 && project.name.length <= 3) {
      errors.name = "Project's name should be longer than 3 words.";
    }
    if (project.description.length == 0) {
      errors.description = "Description is required.";
    }
    if (project.budget <= 0) {
      errors.budget = "Budget must be larger than 0.";
    }
    return errors
  }

  function isValid(errors: any) {
    return errors.name.length === 0 && errors.description.length === 0 &&
      errors.budget.length === 0;
  }

  return (
    <form className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
      {errors.name.length !== 0 &&
        <div className="card error"><p>{errors.name}</p></div>}
      <label htmlFor="description">Project Description</label>

      <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}></textarea>
      {errors.description.length !== 0 &&
        <div className="card error"><p>{errors.description}</p></div>}
      <label htmlFor="budget">Project Budget</label>

      <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
      {errors.budget.length !== 0 &&
        <div className="card error"><p>{errors.budget}</p></div>}
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

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
