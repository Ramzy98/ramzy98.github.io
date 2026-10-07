import type { MetadataRoute } from 'next';
import { PORTFOLIO_DATA } from '@/constants/portfolio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${PORTFOLIO_DATA.siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
