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

const plans = [
  {
    name: 'Free',
    price: 0,
    currency: 'TRY',
    interval: 'aylık',
    features: [
      '5 teklif/ay',
      '1 kullanıcı',
      'Temel şablonlar',
      'E-posta desteği',
    ],
    limits: {
      offers: 5,
      users: 1,
      storage: '500MB',
    },
  },
  {
    name: 'Pro',
    price: 99,
    currency: 'TRY',
    interval: 'aylık',
    popular: true,
    features: [
      '50 teklif/ay',
      '5 kullanıcı',
      'Tüm şablonlar',
      'Öncelikli destek',
      'API erişimi',
      'Detaylı raporlar',
    ],
    limits: {
      offers: 50,
      users: 5,
      storage: '5GB',
    },
  },
  {
    name: 'Enterprise',
    price: 299,
    currency: 'TRY',
    interval: 'aylık',
    features: [
      'Sınırsız teklif',
      'Sınırsız kullanıcı',
      'Özel şablonlar',
      '7/24 destek',
      'API erişimi',
      'Gelişmiş raporlar',
      'Özel entegrasyonlar',
    ],
    limits: {
      offers: 'Sınırsız',
      users: 'Sınırsız',
      storage: '50GB',
    },
  },
];

export default function BillingPage() {
  const { company, fetchCompany } = useCompanyStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const handlePlanSelect = async (planName: string) => {
    setLoading(true);
    setSelectedPlan(planName);
    
    try {
      // Mock payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would trigger Stripe/iyzico payment
      console.log(`Upgrading to ${planName} plan`);
      
      // Simulate success
      alert(`${planName} planına yükseltme işlemi başarılı!`);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Ödeme işlemi başarısız oldu.');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Abonelik & Faturalama</h1>
        <p className="text-gray-600">Planınızı yönetin ve faturalandırma ayarlarını düzenleyin.</p>
      </div>

      {/* Current Plan */}
      {company && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Mevcut Planınız</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-primary-900 capitalize">
                  {company.subscriptionPlan}
                </h3>
                <p className="text-sm text-primary-700">
                  {company.subscriptionEndDate
                    ? `${new Date(company.subscriptionEndDate).toLocaleDateString('tr-TR')} tarihinde yenilenir`
                    : 'Sınırsız kullanım'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-900">
                  {company.subscriptionPlan === 'Free' ? 'Ücretsiz' :
                   company.subscriptionPlan === 'Pro' ? '₺99/ay' :
                   '₺299/ay'
                  }
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
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {company?.subscriptionPlan === 'Free' ? '5 limitinden' :
                 company?.subscriptionPlan === 'Pro' ? '50 limitinden' :
                 'Sınırsız'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">Aktif Kullanıcı</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {company?.subscriptionPlan === 'Free' ? '1 limitinden' :
                 company?.subscriptionPlan === 'Pro' ? '5 limitinden' :
                 'Sınırsız'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">₺45,320</p>
              <p className="text-sm text-gray-500">Toplam Teklif Değeri</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Bu ay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Planları Karşılaştır</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative border-2 rounded-lg p-6 ${
                  plan.popular
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Popüler
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price === 0 ? 'Ücretsiz' : `₺${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500">/{plan.interval}</span>
                    )}
                  </div>
                </div>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <button
                    onClick={() => handlePlanSelect(plan.name)}
                    disabled={loading && selectedPlan === plan.name}
                    className={`w-full btn btn-md ${
                      plan.popular
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {loading && selectedPlan === plan.name ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        İşleniyor...
                      </div>
                    ) : company?.subscriptionPlan.toLowerCase() === plan.name.toLowerCase() ? (
                      'Mevcut Plan'
                    ) : (
                      `${plan.name} Planını Seç`
                    )}
                  </button>
                </div>
              </div>
            ))}
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