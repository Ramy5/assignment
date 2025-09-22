export type ServiceProvider = {
  id: number;
  email: string;
  phone: string;
  postcode: string;
  vendorType: "Independent" | "Company";
  serviceOffering: "Housekeeping" | "Window Cleaning" | "Car Valet";
  signupDate: string;
  status: "Onboarded" | "Rejected" | "-";
};
