import { describe, expect, it } from "vitest";
import { enquiryEmail, enquirySchema } from "@/lib/enquiry";

const enquiry = { name: "Alex", company: "Example & Co", email: "alex@example.com", telephone: "+44 1234 567890", sites: "Facade & roof\nNorth site" };

describe("Enquiry email", () => {
  it("addresses enquiries to the supplied Bionic Eye email", () => {
    expect(enquiryEmail(enquiry).split("?")[0]).toBe("mailto:info@thebioniceye.co.uk");
  });
  it("preserves entered sites and company without creating extra URL parameters", () => {
    const params = new URLSearchParams(enquiryEmail(enquiry).split("?")[1]);
    expect([...params.keys()]).toEqual(["subject", "body"]);
    expect(params.get("body")).toContain("Company: Example & Co");
    expect(params.get("body")).toContain("Facade & roof\nNorth site");
  });
  it("rejects invalid emails before opening the email draft", () => {
    expect(enquirySchema.safeParse({ ...enquiry, email: "invalid" }).success).toBe(false);
  });
});