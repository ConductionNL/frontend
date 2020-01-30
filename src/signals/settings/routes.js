export const BASE_URL = '/instellingen';
export const USERS_URL = `${BASE_URL}/gebruikers`;
export const USERS_PAGED_URL = `${USERS_URL}/page`;
export const USER_URL = `${BASE_URL}/gebruiker`;
export const ROLES_URL = `${BASE_URL}/rollen`;
export const ROLE_URL = `${BASE_URL}/rol`;
export const DEPARTMENTS_URL = `${BASE_URL}/afdelingen`;
export const DEPARTMENT_URL = `${BASE_URL}/afdeling`;

const routes = {
  users: USERS_URL,
  usersPaged: `${USERS_PAGED_URL}/:pageNum(\\d+)`,
  user: `${USER_URL}/:userId(\\d+)`,
  roles: ROLES_URL,
  role: `${ROLE_URL}/:roleId(\\d+)`,
  departments: DEPARTMENTS_URL,
  department: `${DEPARTMENT_URL}/:departmentId(\\d+)`,
};

export default routes;