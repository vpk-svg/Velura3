import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fabclinic.nl'

  // Static routes for both locales
  const locales = ['nl', 'en']
  const staticRoutes = [
    '',
    '/behandelingen',
    '/consult',
    '/consult/plan',
    '/contact',
    '/faq',
    '/fillers',
    '/medicatie',
    '/shape',
    '/team',
    '/terms',
    '/trajecten',
    '/weightloss',
    '/botox',
    '/cursus'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add static routes for each locale
  locales.forEach(locale => {
    staticRoutes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  // Add treatment pages (dynamic routes)
  // This would need to be expanded with actual treatment slugs
  // For now, we'll add some known ones
  const treatmentSlugs = [
    'voorhoofd-botox',
    'frons-botox',
    'kraaienpootjes-botox',
    'neus-lippenplooi-botox',
    'marionetlijnen-botox',
    'opperlip-botox',
    'kin-botox',
    'nek-botox',
    'kaaklijn-botox',
    'wenkbrauwen-botox',
    'temporalis-botox',
    'masseter-botox',
    'lipfillers',
    'wangfillers',
    'kaaklijn-fillers',
    'neus-fillers',
    'kin-fillers',
    'traangoot-fillers',
    'temple-fillers',
    'liquid-bbl',
    'eyelid-correction',
    'double-chin-reduction',
    'bbraun-contour',
    'bbraun-shape'
  ]

  locales.forEach(locale => {
    treatmentSlugs.forEach(slug => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/behandeling/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  return sitemapEntries
}