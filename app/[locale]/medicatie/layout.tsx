import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'GLP-1 Afvalmedicatie op Recept | Ozempic, Mounjaro, Wegovy | FAB Clinic',
  description:
    'Klinisch bewezen GLP-1 afvalmedicatie voorgeschreven door BIG-geregistreerde artsen. Ozempic, Mounjaro en Wegovy - veilig geleverd via erkende apotheek. Gratis screening.',
  openGraph: {
    title: 'GLP-1 Afvalmedicatie op Recept | FAB Clinic',
    description:
      'Bewezen afvalmedicatie onder medische begeleiding. Ozempic, Mounjaro & Wegovy via BIG-geregistreerde artsen.',
    type: 'website',
  },
};

export default function MedicatieLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* JSON-LD: MedicalWebPage + Drug structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalWebPage',
            name: 'GLP-1 Afvalmedicatie',
            description:
              'Overzicht van klinisch bewezen GLP-1 afvalmedicatie voorgeschreven door BIG-geregistreerde artsen bij FAB Clinic.',
            audience: {
              '@type': 'MedicalAudience',
              audienceType: 'Patient',
            },
            medicalAudience: {
              '@type': 'MedicalAudience',
              audienceType: 'Patient',
            },
            specialty: {
              '@type': 'MedicalSpecialty',
              name: 'Endocrinology',
            },
            mainEntity: [
              {
                '@type': 'Drug',
                name: 'Ozempic',
                activeIngredient: 'Semaglutide',
                prescriptionStatus: 'PrescriptionOnly',
                administrationRoute: 'Subcutaneous injection',
                dosageForm: 'Pre-filled pen',
                mechanismOfAction: 'GLP-1 receptor agonist',
                manufacturer: { '@type': 'Organization', name: 'Novo Nordisk' },
              },
              {
                '@type': 'Drug',
                name: 'Mounjaro',
                activeIngredient: 'Tirzepatide',
                prescriptionStatus: 'PrescriptionOnly',
                administrationRoute: 'Subcutaneous injection',
                dosageForm: 'Pre-filled pen',
                mechanismOfAction: 'GLP-1 and GIP dual receptor agonist',
                manufacturer: { '@type': 'Organization', name: 'Eli Lilly' },
              },
              {
                '@type': 'Drug',
                name: 'Wegovy',
                activeIngredient: 'Semaglutide',
                prescriptionStatus: 'PrescriptionOnly',
                administrationRoute: 'Subcutaneous injection',
                dosageForm: 'Pre-filled pen',
                mechanismOfAction: 'GLP-1 receptor agonist',
                manufacturer: { '@type': 'Organization', name: 'Novo Nordisk' },
              },
            ],
            provider: {
              '@type': 'MedicalBusiness',
              name: 'FAB Clinic',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ede',
                addressCountry: 'NL',
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
