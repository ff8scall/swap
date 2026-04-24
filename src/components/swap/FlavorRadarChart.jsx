"use client";
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Legend
} from 'recharts';

/**
 * FlavorRadarChart Component
 * Visualizes and compares flavor profiles of two ingredients.
 * 
 * @param {Object} original - Original ingredient properties
 * @param {Object} substitute - Substitute ingredient properties (optional)
 * @param {string} originalName - Label for the original ingredient
 * @param {string} substituteName - Label for the substitute ingredient
 */
const FlavorRadarChart = ({ original, substitute, originalName, substituteName }) => {
  
  // Helper to normalize data for Recharts
  const normalizeValue = (key, val) => {
    if (typeof val === 'number') return val;
    
    // String mappings
    const mappings = {
      ph: { acidic: 8, neutral: 5, alkaline: 2 },
      umami: { high: 9, medium: 5, low: 2 },
      viscosity: { watery: 1, thin: 3, medium: 5, thick: 7, 'very-thick': 9 }
    };
    
    if (mappings[key]) {
      // Handle cases like "high (fermented)"
      const base = Object.keys(mappings[key]).find(k => val?.toLowerCase().includes(k));
      return mappings[key][base] || 5;
    }
    
    return 5;
  };

  const isKo = originalName?.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/); // Simple heuristic for locale

  const labels = isKo ? {
    sweetness: '당도',
    salinity: '염도',
    umami: '감칠맛',
    heat: '매운맛',
    viscosity: '점도',
    acidity: '산도'
  } : {
    sweetness: 'Sweetness',
    salinity: 'Salinity',
    umami: 'Umami',
    heat: 'Heat',
    viscosity: 'Viscosity',
    acidity: 'Acidity'
  };

  const data = [
    { subject: labels.sweetness, A: (original?.sweetness_index || 50) / 10, B: (substitute?.sweetness_index || 40) / 10, fullMark: 10 },
    { subject: labels.salinity, A: (original?.salinity || 40) / 10, B: (substitute?.salinity || 30) / 10, fullMark: 10 },
    { subject: labels.umami, A: (original?.umami_intensity || 50) / 10, B: (substitute?.umami_intensity || 40) / 10, fullMark: 10 },
    { subject: labels.heat, A: (original?.spiciness || 0) / 10, B: (substitute?.spiciness || 0) / 10, fullMark: 10 },
    { subject: labels.viscosity, A: normalizeValue('viscosity', original?.viscosity), B: normalizeValue('viscosity', substitute?.viscosity), fullMark: 10 },
    { subject: labels.acidity, A: (original?.acidity || 20) / 10, B: (substitute?.acidity || 20) / 10, fullMark: 10 },
  ];

  return (
    <div className="flavor-chart-container" style={{ width: '100%', height: '350px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#484F58" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#8B949E', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 10]} 
            tick={false} 
            axisLine={false} 
          />
          
          <Radar
            name={originalName}
            dataKey="A"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.4}
            strokeWidth={3}
            animationDuration={1500}
          />
          
          {substitute && (
            <Radar
              name={substituteName}
              dataKey="B"
              stroke="#58A6FF"
              fill="#58A6FF"
              fillOpacity={0.2}
              strokeWidth={3}
              strokeDasharray="4 4"
              animationDuration={1500}
            />
          )}
          
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ paddingTop: '30px', fontSize: '14px', fontWeight: 600 }}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      <style jsx>{`
        .flavor-chart-container {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default FlavorRadarChart;
