import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface OrderConfirmationEmailProps {
    customerEmail: string;
    orderNumber: string;
    totalAmount: string;
    productName: string;
}

export const OrderConfirmationEmail = ({
    customerEmail,
    orderNumber,
    totalAmount,
    productName,
}: OrderConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Bedankt voor uw bestelling bij Velura - Uw behandeling wordt voorbereid.</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                brand: '#0A2E2E',
                                gold: '#C9A84C',
                            },
                        },
                    },
                }}
            >
                <Body className="bg-[#fcfcfc] font-sans my-auto mx-auto px-4">
                    <Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-10 max-w-[600px] bg-white">
                        <Heading className="text-brand text-3xl font-normal text-center p-0 my-8 mx-0 italic font-serif">
                            Bedankt voor uw bestelling
                        </Heading>

                        <Text className="text-[#333] text-[16px] leading-[26px]">
                            Beste {customerEmail},
                        </Text>
                        <Text className="text-[#333] text-[16px] leading-[26px]">
                            We hebben uw aanvraag voor {productName} in goede orde ontvangen. Onze erkende artsen zullen uw medische vragenlijst binnen 1 werkdag beoordelen.
                        </Text>

                        <Section className="bg-[#e6f4f1] p-6 rounded-lg my-8">
                            <Text className="text-brand text-[14px] leading-[24px] uppercase tracking-wider font-bold mb-2 mt-0">
                                Besteloverzicht
                            </Text>
                            <Text className="text-brand text-[15px] leading-[24px] m-0">
                                <strong>Referentie:</strong> {orderNumber}
                            </Text>
                            <Text className="text-brand text-[15px] leading-[24px] m-0">
                                <strong>Behandeling:</strong> {productName}
                            </Text>
                            <Text className="text-brand text-[15px] leading-[24px] mt-4 mb-0 font-bold">
                                Totaal: {totalAmount}
                            </Text>
                        </Section>

                        <Text className="text-[#333] text-[16px] leading-[26px]">
                            Zodra uw aanvraag is goedgekeurd, wordt uw medicatie discreet verpakt en gekoeld verzonden. U ontvangt van ons automatisch een track & trace code zodra uw pakket onderweg is.
                        </Text>

                        <Section className="text-center mt-8 mb-8">
                            <Link
                                href="https://velura.nl/contact"
                                className="bg-brand text-white text-[14px] font-semibold no-underline text-center px-6 py-3 rounded-full hover:bg-gold transition-colors tracking-wide uppercase inline-block"
                            >
                                Klantenservice Contacteren
                            </Link>
                        </Section>

                        <Text className="text-[#a8a8a8] text-[12px] leading-[20px] mt-8 text-center italic">
                            VELURA aangedreven door Wellis Pharmacy B.V. — Geregistreerde EU-apotheek.
                            Dit is een automatisch gegenereerd bericht. Neem bij vragen contact op met de klantenservice.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default OrderConfirmationEmail;
