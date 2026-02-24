import { AppConfig } from '../config/appConfig';
import * as mockData from '../data/mockData';
import * as api from './api';

// Simuler un délai réseau pour les mocks
const mockDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

export class DataService {
  private static useMock = AppConfig.USE_MOCK_DATA;

  static toggleMockMode(useMock?: boolean) {
    this.useMock = useMock ?? !this.useMock;
    console.log(`🔄 Mode ${this.useMock ? 'MOCK' : 'API'} activé`);
    return this.useMock;
  }

  static isMockMode() {
    return this.useMock;
  }

  // AUTH
  static async register(data: any) {
    if (this.useMock) {
      await mockDelay();
      // Ajouter l'utilisateur au localStorage
      const users = JSON.parse(localStorage.getItem("unilib_users") || "[]");
      const newUser = {
        ...data,
        id: String(users.length + 1),
        status: "active",
      };
      users.push(newUser);
      localStorage.setItem("unilib_users", JSON.stringify(users));
      
      return {
        user: newUser,
        access: "mock_access_token",
        refresh: "mock_refresh_token",
      };
    }
    return api.register(data);
  }

  static async login(email: string, password: string) {
    if (this.useMock) {
      await mockDelay();
      // Vérifier dans localStorage
      const users = JSON.parse(localStorage.getItem("unilib_users") || "[]");
      const user = [...mockData.registeredUsers, ...users].find(
        u => u.email === email && u.password === password
      );
      
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const { password: _, ...userWithoutPassword } = user;
      
      localStorage.setItem('access_token', 'mock_access_token');
      localStorage.setItem('refresh_token', 'mock_refresh_token');
      
      return {
        user: userWithoutPassword,
        access: 'mock_access_token',
        refresh: 'mock_refresh_token',
      };
    }
    return api.login(email, password);
  }

  static async getCurrentUser() {
    if (this.useMock) {
      await mockDelay();
      return mockData.currentUser;
    }
    return api.getCurrentUser();
  }

  // RESOURCES
  static async getResources(filters?: any) {
    if (this.useMock) {
      await mockDelay();
      let resources = [...mockData.mockResources];
      
      // Appliquer les filtres si nécessaire
      if (filters?.filiere) {
        resources = resources.filter(r => r.filiere === filters.filiere);
      }
      if (filters?.type) {
        resources = resources.filter(r => r.type === filters.type);
      }
      
      return resources;
    }
    return api.getResources(filters);
  }

  static async uploadResource(formData: FormData) {
    if (this.useMock) {
      await mockDelay();
      
      const newResource = {
        id: String(Date.now()),
        titre: formData.get('titre') as string,
        type: formData.get('type') as string,
        filiere: formData.get('filiere') as string,
        niveau: formData.get('niveau') as string,
        semestre: formData.get('semestre') as string,
        auteur: formData.get('auteur') as string,
        date: new Date().toISOString(),
        url: URL.createObjectURL(formData.get('file') as File),
        telechargements: 0,
      };
      
      // Sauvegarder dans localStorage
      const resources = JSON.parse(localStorage.getItem("unilib_resources") || "[]");
      resources.push(newResource);
      localStorage.setItem("unilib_resources", JSON.stringify(resources));
      
      return newResource;
    }
    return api.uploadResource(formData);
  }

  static async deleteResource(id: string) {
    if (this.useMock) {
      await mockDelay();
      
      // Supprimer de localStorage
      const resources = JSON.parse(localStorage.getItem("unilib_resources") || "[]");
      const filtered = resources.filter((r: any) => r.id !== id);
      localStorage.setItem("unilib_resources", JSON.stringify(filtered));
      
      return { success: true };
    }
    return api.deleteResource(id);
  }

  // PROJETS
  static async getProjets() {
    if (this.useMock) {
      await mockDelay();
      return mockData.mockProjets;
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }

  // EMPLOI DU TEMPS
  static async getEmploiDuTemps(filiere?: string, niveau?: string) {
    if (this.useMock) {
      await mockDelay();
      return mockData.mockEmploiDuTemps;
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }

  // ACTUALITES
  static async getActualites() {
    if (this.useMock) {
      await mockDelay();
      return mockData.actualites;
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }

  // ADMIN STATS
  static async getAdminStats() {
    if (this.useMock) {
      await mockDelay();
      return mockData.adminStats;
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }

  // CONTRIBUTIONS EN ATTENTE
  static async getContributionsEnAttente() {
    if (this.useMock) {
      await mockDelay();
      return mockData.contributionsEnAttente;
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }

  static async approveContribution(id: string) {
    if (this.useMock) {
      await mockDelay();
      return { success: true, message: "Contribution approuvée" };
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }

  static async rejectContribution(id: string) {
    if (this.useMock) {
      await mockDelay();
      return { success: true, message: "Contribution rejetée" };
    }
    // TODO: Ajouter l'endpoint API quand disponible
    throw new Error("API endpoint not implemented");
  }
}