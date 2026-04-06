import ApplicationRepository from "../repositories/application.repository.js";
import type { CreateApplicationSchemaType } from "../schemas/application.schema.js";

export default class ApplicationService {
  private applicationRepository = new ApplicationRepository();

  constructor() {}

  createApplication(application: CreateApplicationSchemaType) {
    return this.applicationRepository.createApplication(application);
  }

  rejectApplication(applicationId: string) {
    return this.applicationRepository.rejectApplication(applicationId);
  }

  acceptApplication(applicationId: string) {
    return this.applicationRepository.acceptApplication(applicationId);
  }

  getApplications() {
    return this.applicationRepository.getApplications();
  }
}
