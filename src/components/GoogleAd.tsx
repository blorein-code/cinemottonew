'use client';

import { useEffect } from 'react';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ adSlot, adFormat = 'auto', style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Google Adsense Error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="pub-5226101459122786"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd; 