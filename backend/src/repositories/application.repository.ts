import { ACCEPTED, PENDING, REJECTED } from "../constants.js";
import type { IApplication } from "../interfaces/application.interface.js";
import type { CreateApplicationSchemaType } from "../schemas/application.schema.js";

export default class ApplicationRepository {
  private applications: IApplication[] = [];
  constructor() {}

  createApplication(application: CreateApplicationSchemaType) {
    return this.applications.push({
      id: application.taskId + "-" + application.assistantId,
      ...application,
      status: PENDING,
      createdAt: new Date().toISOString(),
    });
  }

  getApplications() {
    return this.applications;
  }

  acceptApplication(applicationId: string) {
    const application = this.applications.find((a) => a.id === applicationId);
    if (application) {
      application.status = ACCEPTED;
    }
  }

  rejectApplication(applicationId: string) {
    const application = this.applications.find((a) => a.id === applicationId);
    if (application) {
      application.status = REJECTED;
    }
  }
}
