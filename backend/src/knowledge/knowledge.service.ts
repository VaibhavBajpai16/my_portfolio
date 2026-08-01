import { Injectable } from '@nestjs/common';
import education from './data/education.json';
import experience from './data/experience.json';
import profile from './data/profile.json';
import projects from './data/projects.json';
import skills from './data/skills.json';

@Injectable()
export class KnowledgeService {
  getProfile() {
    return profile;
  }

  getSkills() {
    return skills;
  }

  getProjects() {
    return projects;
  }

  getExperience() {
    return experience;
  }

  getEducation() {
    return education;
  }

  getAll() {
    return {
      profile,
      skills,
      projects,
      experience,
      education,
    };
  }
}
