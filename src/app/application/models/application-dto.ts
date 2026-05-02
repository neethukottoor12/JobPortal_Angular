export class ApplicationDto {
    applicationId!:string;
    jobPostId!:string;
    jobTitle!:string;
    applicantId!:string;
    jobSeekerProfileId!:string;
    applicantName!:string;
    email!:string;
    phone!:string;
    profileImageBase64?: string | null;
    qualifications!:string[];
    totalYearsOfExperience!:number;
    appliedDate!:string;
}
