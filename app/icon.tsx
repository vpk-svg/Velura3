import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#FDFCF0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#c6a65d',
            lineHeight: 1,
            marginTop: 2,
            marginLeft: 2,
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size },
  );
}
