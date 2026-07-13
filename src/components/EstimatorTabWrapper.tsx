import React, { useState } from 'react';
import { QuickEstimator } from './QuickEstimator';
import { DetailEstimator } from './DetailEstimator';
import { Zap, ClipboardList } from 'lucide-react';

interface Package {
  slug: string;
  namaPaket: string;
  jenisPekerjaan: string;
  hargaPerM2: number;
  persenStruktur: number;
  persenDinding: number;
  persenAtap: number;
  persenFinishing: number;
  persenMEP: number;
  persenLainnya: number;
  deskripsi: string;
  contohMaterial: string[];
}

interface EstimatorTabWrapperProps {
  packages: Package[];
  ahspItems: any[];
  materials: any[];
  wages: any[];
  whatsappNumber: string;
}

export const EstimatorTabWrapper: React.FC<EstimatorTabWrapperProps> = ({
  packages,
  ahspItems,
  materials,
  wages,
  whatsappNumber
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'detail'>('quick');

  return (
    <div className="w-full">
      {/* Premium Editorial Tab Selector */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 bg-stone-100 border border-stone-200 rounded-xl shadow-inner relative">
          <button
            onClick={() => setActiveTab('quick')}
            className={activeTab === 'quick'
              ? 'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-sans font-semibold tracking-wide transition-all duration-300 bg-white text-amber-700 shadow-sm'
              : 'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-sans font-semibold tracking-wide transition-all duration-300 text-stone-500 hover:text-stone-800'
            }
          >
            <Zap className="w-4 h-4" />
            Estimasi Cepat
          </button>
          <button
            onClick={() => setActiveTab('detail')}
            className={activeTab === 'detail'
              ? 'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-sans font-semibold tracking-wide transition-all duration-300 bg-white text-amber-700 shadow-sm'
              : 'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-sans font-semibold tracking-wide transition-all duration-300 text-stone-500 hover:text-stone-800'
            }
          >
            <ClipboardList className="w-4 h-4" />
            Estimasi Detail (SNI)
          </button>
        </div>
      </div>

      {/* Tab Panels with Smooth Transitions */}
      <div className="relative overflow-hidden transition-all duration-500">
        {activeTab === 'quick' ? (
          <div className="animate-fade-in">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <span className="font-sans text-[11px] font-bold tracking-widest text-accent uppercase block mb-1">
                4-STEP ESTIMATOR
              </span>
              <p className="text-xs text-text-secondary font-sans">
                Gunakan estimasi cepat berbasis paket untuk mengetahui budget pembangunan awal secara instan.
              </p>
            </div>
            <QuickEstimator 
              packages={packages} 
              whatsappNumber={whatsappNumber} 
              onSwitchToDetail={() => setActiveTab('detail')}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <span className="font-sans text-[11px] font-bold tracking-widest text-accent uppercase block mb-1">
                AHSP-SNI CALCULATOR
              </span>
              <p className="text-xs text-text-secondary font-sans">
                Rancang rencana anggaran belanja detail dengan memasukkan daftar pekerjaan dan volume secara spesifik.
              </p>
            </div>
            <DetailEstimator
              ahspItems={ahspItems}
              materials={materials}
              wages={wages}
              whatsappNumber={whatsappNumber}
            />
          </div>
        )}
      </div>
    </div>
  );
};
