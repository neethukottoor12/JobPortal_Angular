export class UpdateJobPostdto {
    id!: string;
  jobTitle!: string;
  jobSummary!: string;

  locationId!: string;
  locationName!: string;

  categoryId!: string;
  categoryName!: string;

  industryId!: string;
  industryName!: string;

  companyId!: string;
  companyName!: string;

  postedDate!: string;

  responsibilities!: { id: string, description: string }[];

  skills!: { id: string, name: string }[];
  qualifications!: { id: string, name: string }[];
}
