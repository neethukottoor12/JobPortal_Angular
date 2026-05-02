import { ExperienceDto } from "./experience-dto";

export class UpdateapplicationDto {
    applicationId!:string;
    appliedDate!:string;
    jobPostId!:string;
    jobTitle!:string;
    jobSummary!:string;
    companyId!:string;
    jobLocationId!:string;
    applicantId!:string;
    applicantName!:string;
    email!:string;
    phone!:string;
    jobSeekerProfileId!:string;
    profileName!:string;
    profileSummary!:string;
    locationName!:string;
    profileImageBase64?: string | null;
    resumeFileName!:string;
    resumeBase64?:string|null;
    qualifications!:string[];
    skills!:string[];
    totalYearsOfExperience!:number;
    workExperiences!: ExperienceDto[];

}
