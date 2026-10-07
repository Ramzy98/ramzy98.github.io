import type { MetadataRoute } from 'next';
import { PORTFOLIO_DATA } from '@/constants/portfolio';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${PORTFOLIO_DATA.siteUrl}/sitemap.xml`,
  };
}
