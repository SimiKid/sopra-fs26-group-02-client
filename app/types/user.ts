/*
 * Current backend only 1 API endpoint:
 * POST /users -> { username }
 * 
 * Response -> { id, username, status }
 */
export interface User {
  id?: number;
  username: string;
  status?: string;
}

/*
 * FUTURE FIELDS
 *
 * token: string;
 */