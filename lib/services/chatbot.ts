/**
 * AI Chatbot service abstraction.
 * Falls back to local keyword-based responses when no API key is configured.
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const FALLBACK_RESPONSES: Record<string, string> = {
  botox: 'Botox behandelingen starten vanaf €90 per zone. U kunt online zones selecteren en direct een afspraak inplannen op vrijdag of zaterdag.',
  fillers: 'Wij bieden premium hyaluronzuur fillers aan voor lippen, kin, kaaklijn en meer. Bekijk onze fillers pagina voor prijzen per zone.',
  prijs: 'Onze prijzen variëren per behandeling. Botox vanaf €90/zone, fillers op aanvraag, afvaltrajecten vanaf €179/maand.',
  afspraak: 'U kunt een afspraak inplannen via onze website of bel ons op het nummer op de contactpagina. Botox en fillers zijn beschikbaar op vrijdag en zaterdag.',
  weightloss: 'Ons afvalprogramma werkt met GLP-1 medicatie zoals Ozempic, Mounjaro en Wegovy. Start met onze gratis online intake.',
  shape: 'Shape behandelingen omvatten Butt Contour, ooglidcorrectie en vet onder de kin verwijderen. Neem contact op voor een consult.',
  openingstijden: 'Behandelingen vinden plaats op vrijdag en zaterdag. Consulten zijn ook doordeweeks mogelijk.',
  default: 'Bedankt voor uw bericht! Voor specifieke vragen kunt u ons bereiken via de contactpagina of WhatsApp. Wij reageren zo snel mogelijk.',
};

/**
 * Get a chatbot response. Uses AI API if configured, otherwise local fallback.
 */
export async function getChatResponse(
  message: string,
  _history: ChatMessage[] = [],
): Promise<string> {
  // Check for AI provider
  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    try {
      // TODO: integrate with Google Gemini or other AI provider
      // For now fall through to local
    } catch {
      // Fall through to local responses
    }
  }

  // Local keyword-based fallback
  const lower = message.toLowerCase();
  for (const [keyword, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (keyword !== 'default' && lower.includes(keyword)) {
      return response;
    }
  }

  return FALLBACK_RESPONSES.default;
}
