'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSurvey } from '@/components/survey/SurveyFlow';

export default function SurveyAutoOpen() {
  const searchParams = useSearchParams();
  const { open } = useSurvey();
  const opened = useRef(false);

  useEffect(() => {
    if (searchParams.get('openSurvey') === '1' && !opened.current) {
      opened.current = true;
      open();
    }
  }, [open, searchParams]);

  return null;
}
