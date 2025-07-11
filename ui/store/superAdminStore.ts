import { create } from 'zustand';
import axios from 'axios';

interface DashboardStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  totalOffers: number;
  monthlyRevenue: number;
  totalRevenue: number;
}

interface CompanyStats {
  id: number;
  name: string;
  email: string;
  userCount: number;
  offerCount: number;
  hasActiveSubscription: boolean;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  createdAt: string;
}

interface SuperAdminState {
  dashboardStats: DashboardStats | null;
  companies: CompanyStats[];
  loading: boolean;
  error: string | null;
  fetchDashboardStats: () => Promise<void>;
  fetchCompanies: () => Promise<void>;
  updateCompanySubscription: (companyId: number, data: {
    hasActiveSubscription: boolean;
    subscriptionStartDate?: string;
    subscriptionEndDate?: string;
  }) => Promise<void>;
  toggleCompanyStatus: (companyId: number) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useSuperAdminStore = create<SuperAdminState>((set, get) => ({
  dashboardStats: null,
  companies: [],
  loading: false,
  error: null,

  fetchDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/superadmin/dashboard`);
      set({ dashboardStats: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Dashboard verileri yüklenemedi', 
        loading: false 
      });
    }
  },

  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/superadmin/companies`);
      set({ companies: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Şirket verileri yüklenemedi', 
        loading: false 
      });
    }
  },

  updateCompanySubscription: async (companyId: number, data) => {
    try {
      await axios.put(`${API_BASE_URL}/api/superadmin/companies/${companyId}/subscription`, data);
      
      // Update local state
      set((state) => ({
        companies: state.companies.map((company) =>
          company.id === companyId
            ? {
                ...company,
                hasActiveSubscription: data.hasActiveSubscription,
                subscriptionStartDate: data.subscriptionStartDate,
                subscriptionEndDate: data.subscriptionEndDate,
              }
            : company
        ),
      }));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Abonelik güncellenemedi');
    }
  },

  toggleCompanyStatus: async (companyId: number) => {
    try {
      await axios.post(`${API_BASE_URL}/api/superadmin/companies/${companyId}/toggle-status`);
      
      // Refresh companies list
      await get().fetchCompanies();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Şirket durumu güncellenemedi');
    }
  },
}));