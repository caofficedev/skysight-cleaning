import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  company: z.string().trim().max(160),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  telephone: z.string().trim().max(40).regex(/^[+\d\s().-]*$/, "Enter a valid telephone number."),
  sites: z.string().trim().min(1, "Sites or work involved is required.").max(4000),
});

export function enquiryEmail(input: z.infer<typeof enquirySchema>) {
  const data = enquirySchema.parse(input);
  const body = `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nTelephone: ${data.telephone}\n\nSites or work involved:\n${data.sites}`;
  return `mailto:info@thebioniceye.co.uk?subject=${encodeURIComponent("Discuss a requirement")}&body=${encodeURIComponent(body)}`;
}