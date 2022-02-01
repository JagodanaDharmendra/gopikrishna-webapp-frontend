const environment = {
  baseUrl: "http://localhost:4001",
};

class Endpoints {
  baseUrl: string = environment.baseUrl;
  BASE = this.joinPaths(this.baseUrl);
  USER = this.joinPaths(this.BASE, "user");
  CLIENT = this.joinPaths(this.BASE, "client");
  ASSESSMENT = this.joinPaths(this.BASE, "assessment");
  ENDPOINTS = {
    LOGIN: this.joinPaths(this.BASE, "login"),
    LOGOUT: this.joinPaths(this.BASE, "logout"),

    //USERS
    CREATE_USER: this.joinPaths(this.USER, "create"),
    EDIT_USER: this.joinPaths(this.USER, "edit"),
    DELETE_USER: this.joinPaths(this.USER, "delete"),
    FIND_USER: this.joinPaths(this.USER, "find"),
    FIND_ALL_USER: this.joinPaths(this.USER, "findAll"),

    //CLIENTS
    CREATE_CLIENT: this.joinPaths(this.CLIENT, "create"),
    EDIT_CLIENT: this.joinPaths(this.CLIENT, "edit"),
    DELETE_CLIENT: this.joinPaths(this.CLIENT, "delete"),
    FIND_CLIENT: (client_id: string) => {
      return this.joinPaths(this.CLIENT, `find?client_id=${client_id}`);
    },
    FIND_ALL_CLIENT: this.joinPaths(this.CLIENT, "findAll"),

    //ASSESSMENTS
    CREATE_ASSESSMENT: this.joinPaths(this.ASSESSMENT, "create"),
    EDIT_ASSESSMENT: this.joinPaths(this.ASSESSMENT, "edit"),
    FIND_ALL_ASSESSMENTS: (assessmentType: string) => {
      return this.joinPaths(this.ASSESSMENT, `findAll?assessmentType=${assessmentType}`);
    },
    FIND_ALL_ASSESSMENTS_FOR_CLIENT: (client_id: string) => {
      return this.joinPaths(this.ASSESSMENT, `findAllForClient?client_id=${client_id}`);
    },
    FIND_AS_PDF_ASSESSMENT: (client_id: string, assessmentType: string) => {
      return this.joinPaths(this.ASSESSMENT, `findAsPDF?client_id=${client_id}&assessmentType=${assessmentType}`);
    },
    EMAIL_ASSESSMENT: this.joinPaths(this.ASSESSMENT, "email"),
  };

  private joinPaths(...params: string[]) {
    const newUrl = params.join("/");
    return newUrl;
  }
}

export const API = new Endpoints();