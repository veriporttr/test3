'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useSuperAdminStore } from '@/store/superAdminStore';
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function CompanyManagePage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const { companies, updateCompanySubscription, toggleCompanyStatus } = useSuperAdminStore();
  
  const companyId = parseInt(params.id as string);
  const company = companies.find(c => c.id === companyId);
  
  const [subscriptionData, setSubscriptionData] = useState({
    hasActiveSubscription: false,
    subscriptionStartDate: '',
    subscriptionEndDate: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    if (company) {
      setSubscriptionData({
        hasActiveSubscription: company.hasActiveSubscription,
        subscriptionStartDate: company.subscriptionStartDate 
          ? format(new Date(company.subscriptionStartDate), 'yyyy-MM-dd')
          : '',
        subscriptionEndDate: company.subscriptionEndDate 
          ? format(new Date(company.subscriptionEndDate), 'yyyy-MM-dd')
          : '',
      });
    }
  }, [user, router, company]);

  const handleUpdateSubscription = async () => {
    if (!company) return;
    
    setLoading(true);
    try {
      await updateCompanySubscription(company.id, {
        hasActiveSubscription: subscriptionData.hasActiveSubscription,
        subscriptionStartDate: subscriptionData.subscriptionStartDate || undefined,
        subscriptionEndDate: subscriptionData.subscriptionEndDate || undefined,
      });
      toast.success('Abonelik güncellendi');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!company) return;
    
    try {
      await toggleCompanyStatus(company.id);
      toast.success('Şirket durumu güncellendi');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!user?.isSuperAdmin) {
    return null;
  }

  if (!company) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Şirket bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
          <p className="text-gray-600">Şirket yönetimi ve abonelik ayarları</p>
        </div>
      </div>

      {/* Company Info */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Şirket Bilgileri</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şirket Adı
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {company.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {company.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Sayısı
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {company.userCount}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teklif Sayısı
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {company.offerCount}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kayıt Tarihi
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {format(new Date(company.createdAt), 'dd/MM/yyyy HH:mm')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Management */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Abonelik Yönetimi</h2>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasActiveSubscription"
                checked={subscriptionData.hasActiveSubscription}
                onChange={(e) => setSubscriptionData({
                  ...subscriptionData,
                  hasActiveSubscription: e.target.checked
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="hasActiveSubscription" className="ml-2 block text-sm text-gray-900">
                Aktif Abonelik (99 TL/ay)
              </label>
            </div>

            {subscriptionData.hasActiveSubscription && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={subscriptionData.subscriptionStartDate}
                    onChange={(e) => setSubscriptionData({
                      ...subscriptionData,
                      subscriptionStartDate: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={subscriptionData.subscriptionEndDate}
                    onChange={(e) => setSubscriptionData({
                      ...subscriptionData,
                      subscriptionEndDate: e.target.value
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={handleToggleStatus}
          className="btn btn-outline btn-md"
        >
          Şirket Durumunu Değiştir
        </button>
        
        <button
          onClick={handleUpdateSubscription}
          disabled={loading}
          className="btn btn-primary btn-md"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Abonelik Güncelle'}
        </button>
      </div>
    </div>
  );
}