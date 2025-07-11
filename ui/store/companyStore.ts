import { create } from 'zustand';
import axios from 'axios';

interface Company {
  id: number;
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  taxNumber?: string;
  iban?: string;
  website?: string;
  subscriptionPlan: string;
  subscriptionStartDate: string;
  subscriptionEndDate?: string;
  isActive: boolean;
}

interface UpdateCompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxNumber?: string;
  iban?: string;
  website?: string;
}

interface CompanyState {
  company: Company | null;
  loading: boolean;
  error: string | null;
  fetchCompany: () => Promise<void>;
  updateCompany: (data: UpdateCompanyData) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useCompanyStore = create<CompanyState>((set, get) => ({
  company: null,
  loading: false,
  error: null,

  fetchCompany: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/company/me`);
      set({ company: response.data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Şirket bilgileri yüklenemedi', 
        loading: false 
      });
    }
  },

  updateCompany: async (data: UpdateCompanyData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/company`, data);
      set({ company: response.data });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Şirket bilgileri güncellenemedi');
    }
  },

  uploadLogo: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      
      await axios.post(`${API_BASE_URL}/api/company/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Refresh company data
      await get().fetchCompany();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logo yüklenemedi');
    }
  },
}));