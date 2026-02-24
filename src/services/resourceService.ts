// src/services/resourceService.ts
// Handles resource listing, upload, download and deletion.

import api, { BASE_URL } from "./api";

export interface ApiResource {
  id: string;
  titre: string;
  matiere: string;
  description?: string;
  type_ressource: string;
  filiere: string;
  promotion: string;
  semestre: number;
  fichier: string;
  fichier_url: string | null;
  uploaded_by: number;
  uploaded_by_name: string;
  created_at: string;
  updated_at: string;
}

export interface GetResourcesFilters {
  filiere?: string;
  type_ressource?: string;
  search?: string;
}

const resourceService = {
  /** GET /api/resources/ — list with optional filters */
  async getResources(filters: GetResourcesFilters = {}): Promise<ApiResource[]> {
    const params: Record<string, string> = {};
    if (filters.filiere && filters.filiere !== "Toutes") params.filiere = filters.filiere;
    if (filters.type_ressource) params.type_ressource = filters.type_ressource;
    if (filters.search) params.search = filters.search;
    const res = await api.get<ApiResource[]>("/api/resources/", { params });
    return res.data;
  },

  /** POST /api/resources/ — multipart upload */
  async uploadResource(formData: FormData): Promise<ApiResource> {
    const res = await api.post<ApiResource>("/api/resources/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  /** GET /api/resources/{id}/ — single resource detail */
  async getResource(id: string): Promise<ApiResource> {
    const res = await api.get<ApiResource>(`/api/resources/${id}/`);
    return res.data;
  },

  /** Delete a resource (admin/responsable) */
  async deleteResource(id: string): Promise<void> {
    await api.delete(`/api/resources/${id}/`);
  },

  /** Build absolute URL for a file served by Django */
  fileUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path}`;
  },
};

export default resourceService;
