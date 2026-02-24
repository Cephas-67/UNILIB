// src/services/authService.ts
// Handles all authentication API calls.
// Falls back gracefully so existing localStorage/mock flow still works.

import api from "./api";

export interface LoginPayload { username: string; password: string; }
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  filiere?: string;
}
export interface ApiUser {
  id: number;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  filiere: string;
  promotion?: string;
  semestre?: string;
  role: "etudiant" | "responsable" | "admin";
  avatar?: string;
}

// Convert API user → frontend User shape
export function mapApiUser(u: ApiUser) {
  return {
    id: String(u.id),
    email: u.email,
    nom: u.nom,
    prenom: u.prenom,
    filiere: u.filiere ?? "",
    promotion: u.promotion,
    semestre: u.semestre,
    role: u.role,
    avatar: u.avatar,
  };
}

const authService = {
  /** POST /api/auth/login/ — returns JWT tokens and saves them to localStorage */
  async login(email: string, password: string) {
    // SimpleJWT expects `username` field; we use email as username
    const res = await api.post<{ access: string; refresh: string }>("/api/auth/login/", {
      username: email,
      password,
    });
    localStorage.setItem("unilib_access_token", res.data.access);
    localStorage.setItem("unilib_refresh_token", res.data.refresh);
    return res.data;
  },

  /** POST /api/auth/register/ — creates account */
  async register(payload: RegisterPayload) {
    const res = await api.post<ApiUser>("/api/auth/register/", payload);
    return res.data;
  },

  /** GET /api/auth/me/ — returns current user profile */
  async getMe(): Promise<ApiUser> {
    const res = await api.get<ApiUser>("/api/auth/me/");
    return res.data;
  },

  /** PATCH /api/auth/me/ — updates profile fields */
  async updateMe(data: Partial<ApiUser>) {
    const res = await api.patch<ApiUser>("/api/auth/me/", data);
    return res.data;
  },

  /** Clear tokens from localStorage */
  logout() {
    localStorage.removeItem("unilib_access_token");
    localStorage.removeItem("unilib_refresh_token");
    localStorage.removeItem("unilib_user");
  },

  /** True if an access token is currently stored */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("unilib_access_token");
  },
};

export default authService;
