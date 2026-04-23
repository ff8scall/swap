import { ImageResponse } from 'next/og';
import ingredientsData from '@/lib/data/ingredients.json';

// Runtime setting removed for compatibility

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const ingredient = ingredientsData.ingredients.find((ing) => ing.id === id);

    if (!ingredient) {
      return new Response('Ingredient not found', { status: 404 });
    }

    const name = ingredient.name.en;
    const substitute = ingredient.substitutes?.[0];
    const subName = substitute?.name?.en || 'Alternative';
    const ratio = substitute?.ratio 
      ? `${substitute.ratio.source} : ${substitute.ratio.target_min}${substitute.ratio.target_max !== substitute.ratio.target_min ? '-' + substitute.ratio.target_max : ''}`
      : 'Variable';
    const unit = substitute?.ratio?.unit || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)',
            padding: '40px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Lab Grid Background Effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Glassmorphism Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '60px',
              width: '900px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ 
                backgroundColor: '#3b82f6', 
                width: '12px', 
                height: '40px', 
                borderRadius: '4px', 
                marginRight: '20px' 
              }} />
              <span style={{ fontSize: '24px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.1em' }}>
                GLOBAL INGREDIENT SWAP
              </span>
            </div>

            <h1 style={{ 
              fontSize: '84px', 
              color: 'white', 
              margin: '0 0 40px 0', 
              fontWeight: 800,
              lineHeight: 1.1
            }}>
              {name}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '24px', color: '#64748b' }}>BEST SUBSTITUTE</span>
              <div style={{ 
                display: 'flex', 
                alignItems: 'baseline', 
                gap: '15px' 
              }}>
                <span style={{ fontSize: '48px', color: '#60a5fa', fontWeight: 700 }}>
                  {subName}
                </span>
                <span style={{ fontSize: '32px', color: '#94a3b8' }}>
                  ({ratio} {unit})
                </span>
              </div>
            </div>

            <div style={{ 
              position: 'absolute', 
              bottom: '40px', 
              right: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ color: '#475569', fontSize: '18px' }}>swap.lego-sia.com</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
