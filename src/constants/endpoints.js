import resolvePath from '../utils/resolvePath';

const endpoints = {
  navbar: resolvePath('profile/navbar.json'),
  routes: resolvePath('profile/routes.json'),
  home: resolvePath('profile/home.json'),
  social: resolvePath('profile/social.json'),
  about: resolvePath('profile/about.json'),
  skills: resolvePath('profile/skills.json'),
  education: resolvePath('profile/education.json'),
  experiences: resolvePath('profile/experiences.json'),
  projects: resolvePath('profile/projects.json'),
  contact: resolvePath('profile/contacts.json'),
};

export default endpoints;
