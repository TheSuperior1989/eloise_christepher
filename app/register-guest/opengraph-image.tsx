import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Eloise & Christepher - April 4, 2026'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #F5F1E8 0%, #FAF8F5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '3px solid #C4A57B',
            borderRadius: '8px',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Heart icon */}
          <div
            style={{
              fontSize: 80,
              marginBottom: 40,
            }}
          >
            ❤️
          </div>
          
          {/* Names */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#3D3630',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            Eloise & Christepher
          </div>
          
          {/* Date */}
          <div
            style={{
              fontSize: 36,
              color: '#6B6560',
              marginBottom: 30,
              fontStyle: 'italic',
            }}
          >
            April 4, 2026
          </div>
          
          {/* Divider */}
          <div
            style={{
              width: 120,
              height: 2,
              background: '#C4A57B',
              marginBottom: 30,
            }}
          />
          
          {/* Location */}
          <div
            style={{
              fontSize: 28,
              color: '#7A6F5D',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Kwalata Game Lodge
            <br />
            Dinokeng Game Reserve, South Africa
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

