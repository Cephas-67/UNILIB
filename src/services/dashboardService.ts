import api from "./api";
import { ApiResource } from "./resourceService";

export async function fetchResourceStats() {
  // Get total resources
  const resourcesRes = await api.get<ApiResource[]>("/api/resources/");
  const totalResources = resourcesRes.data.length;

  // Get total downloads (if available in API, else set to 0)
  // Placeholder: backend must expose download stats for real value
  const totalDownloads = 0;

  // Get total courses (type_ressource === 'cours')
  const coursCount = resourcesRes.data.filter(r => r.type_ressource === "cours").length;

  // Get recent resources (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentResources = resourcesRes.data.filter(r => new Date(r.created_at) >= sevenDaysAgo);

  return {
    totalResources,
    coursCount,
    totalDownloads,
    recentResourcesCount: recentResources.length,
  };
}
