// GROQ queries — populated by backend worker
import { client } from "./client";

export async function getSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getAbout() {
  return client.fetch(`*[_type == "about"][0]`);
}

export async function getSkills() {
  return client.fetch(`*[_type == "skill"] | order(category asc, order asc)`);
}

export async function getExperience() {
  return client.fetch(`*[_type == "experience"] | order(startDate desc) { ..., technologies[]-> }`);
}

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(featured desc, order asc) { ..., technologies[]-> }`);
}

export async function getContact() {
  return client.fetch(`*[_type == "contactInfo"][0]`);
}
