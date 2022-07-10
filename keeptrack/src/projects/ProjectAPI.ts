import { Project } from "./Project";

const baseURL: string = " http://localhost:4000";
const url: string = `${baseURL}/projects`;

function translateStatusToErrorMessage(status: number): string {
    switch (status) {
        case 401:
            return "Please login again.";
        case 403:
            return "You have no permission to this project.";
        default:
            return "There was an error retrieving the projects, please try again.";
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error, error info: \n ${JSON.stringify(httpErrorInfo)}`);
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);

    }

}

function parseJson(response:Response) {
    return response.json();
}

function convertToProjectModels(data: any[]):Project[] {
    let projects:Project[] = data.map(convertToProjectModel)
    return projects
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
  }

const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(checkStatus)
            .then(parseJson)
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                console.log("log client error" + error);
                throw new Error("There was an error retrieving the projects, please try again.")
            });

    },
    put(project:Project){
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(checkStatus)
        .then(parseJson)
        .catch((error:TypeError) => {
            console.log("log in server error:" + error.message);
            throw new Error("There was an error updating the projects, please try again.")
        })
    }
}

export { projectAPI }