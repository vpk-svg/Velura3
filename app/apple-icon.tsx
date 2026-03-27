import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#FDFCF0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#c6a65d',
            lineHeight: 1,
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size },
  );
}
