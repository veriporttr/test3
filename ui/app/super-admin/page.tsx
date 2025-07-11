'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useSuperAdminStore } from '@/store/superAdminStore';
import { 
  Building2, 
  Users, 
  FileText, 
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SuperAdminPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    dashboardStats, 
    companies, 
    loading, 
    fetchDashboardStats, 
    fetchCompanies 
  } = useSuperAdminStore();

  useEffect(() => {
    if (!user?.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    fetchDashboardStats();
    fetchCompanies();
  }, [user, router, fetchDashboardStats, fetchCompanies]);

  if (!user?.isSuperAdmin) {
    return null;
  }

  if (loading && !dashboardStats) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="text-gray-600">Sistem geneli istatistikler ve şirket yönetimi</p>
      </div>

      {/* Stats Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Şirket</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCompanies}</p>
                </div>
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aktif Şirket</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeCompanies}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aylık Gelir</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats.monthlyRevenue.toLocaleString('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    })}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Companies Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Şirketler</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz şirket bulunmuyor</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-head">Şirket</th>
                    <th className="table-head">Kullanıcı</th>
                    <th className="table-head">Teklif</th>
                    <th className="table-head">Abonelik</th>
                    <th className="table-head">Kayıt Tarihi</th>
                    <th className="table-head">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {companies.map((company) => (
                    <tr key={company.id} className="table-row">
                      <td className="table-cell">
                        <div>
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{company.userCount}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{company.offerCount}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          company.hasActiveSubscription
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {company.hasActiveSubscription ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Aktif
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Pasif
                            </>
                          )}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(company.createdAt), 'dd MMM yyyy', { locale: tr })}
                        </div>
                      </td>
                      <td className="table-cell">
                        <button
                          onClick={() => router.push(`/super-admin/companies/${company.id}`)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Yönet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}