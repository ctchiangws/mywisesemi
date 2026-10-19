
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const QualityPolicy = () => {
  const { t } = useLanguage();

  const pillars = [
    { icon: Scale, label: t('quality.pillar1') },
    { icon: Users, label: t('quality.pillar2') },
    { icon: ShieldCheck, label: t('quality.pillar3') },
    { icon: TrendingUp, label: t('quality.pillar4') },
  ];

  return (
    <section className="mb-6 rounded-lg shadow-md bg-gradient-to-r from-wisesemi-dark via-wisesemi to-wisesemi-dark text-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-3 p-3 md:p-4">
        <div className="flex flex-row items-center md:items-start gap-2 md:flex-col text-center md:text-left md:w-1/3 md:border-r md:border-white/20 md:pr-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-wisesemi-light/90">
            {t('quality.label')}
          </span>
          <p className="text-base md:text-lg font-bold italic leading-tight">
            {t('quality.slogan')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1 w-full">
          {pillars.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-row items-center justify-center gap-1.5 rounded-md bg-white/10 px-2 py-1.5 text-center"
            >
              <Icon className="h-4 w-4 text-white shrink-0" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/documents/quality-policy"
        className="flex items-center justify-center gap-1 bg-black/10 hover:bg-black/20 transition-colors py-1 text-xs font-medium"
      >
        {t('quality.learn_more')}
        <ChevronRight className="h-3 w-3" />
      </Link>
    </section>
  );
};

export default QualityPolicy;
