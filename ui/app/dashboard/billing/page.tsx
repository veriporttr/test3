'use client';

import { useState, useEffect } from 'react';
import { useCompanyStore } from '@/store/companyStore';
import { 
  CreditCard, 
  Check, 
  Star, 
  Calendar, 
  DollarSign,
  FileText,
  Users
} from 'lucide-react';


export default function BillingPage() {
  const { company, fetchCompany } = useCompanyStore();

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Abonelik & Faturalama</h1>
        <p className="text-gray-600">Abonelik durumunuzu görüntüleyin ve faturalandırma ayarlarını düzenleyin.</p>
      </div>

      {/* Current Plan */}
      {company && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Abonelik Durumu</h2>
          </div>
          <div className="card-body">
            <div className={`flex items-center justify-between p-4 rounded-lg ${
              company.hasActiveSubscription ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div>
                <h3 className={`text-lg font-semibold ${
                  company.hasActiveSubscription ? 'text-green-900' : 'text-red-900'
                }`}>
                  {company.hasActiveSubscription ? 'Aktif Abonelik' : 'Abonelik Yok'}
                </h3>
                <p className={`text-sm ${
                  company.hasActiveSubscription ? 'text-green-700' : 'text-red-700'
                }`}>
                  {company.hasActiveSubscription && company.subscriptionEndDate
                    ? `${new Date(company.subscriptionEndDate).toLocaleDateString('tr-TR')} tarihinde yenilenir`
                    : company.hasActiveSubscription 
                      ? 'Aktif abonelik'
                      : 'Abonelik gerekli'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${
                  company.hasActiveSubscription ? 'text-green-900' : 'text-red-900'
                }`}>
                  {company.hasActiveSubscription ? '₺99/ay' : '₺0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Statistics */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Bu Ay Kullanım</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Oluşturulan Teklif</p>
              <p className="text-xs text-gray-500 mt-1">Sınırsız</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">Aktif Kullanıcı</p>
              <p className="text-xs text-gray-500 mt-1">Sınırsız</p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">₺45,320</p>
              <p className="text-sm text-gray-500">Toplam Teklif Değeri</p>
              <p className="text-xs text-gray-500 mt-1">Bu ay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Abonelik Bilgileri</h2>
        </div>
        <div className="card-body">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary-900">Pro Plan</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-primary-900">₺99</span>
                <span className="text-primary-700">/aylık</span>
              </div>
            </div>
            
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3" />
                <span className="text-sm text-gray-700">Sınırsız teklif</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3" />
                <span className="text-sm text-gray-700">Sınırsız kullanıcı</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3" />
                <span className="text-sm text-gray-700">PDF dışa aktarma</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3" />
                <span className="text-sm text-gray-700">E-posta ile gönderim</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3" />
                <span className="text-sm text-gray-700">Öncelikli destek</span>
              </li>
            </ul>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Abonelik yönetimi için lütfen sistem yöneticisi ile iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Ödeme Geçmişi</h2>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">Pro Plan - Ocak 2024</p>
                  <p className="text-sm text-gray-500">01 Ocak 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₺99.00</p>
                <p className="text-sm text-green-600">Ödendi</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">Pro Plan - Aralık 2023</p>
                  <p className="text-sm text-gray-500">01 Aralık 2023</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₺99.00</p>
                <p className="text-sm text-green-600">Ödendi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}