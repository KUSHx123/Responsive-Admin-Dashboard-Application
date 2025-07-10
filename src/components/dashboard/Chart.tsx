import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ChartData } from '../../types';

interface ChartProps {
  title: string;
  data: ChartData;
  height?: number;
  type?: 'line' | 'bar';
}

export const Chart: React.FC<ChartProps> = ({ 
  title, 
  data, 
  height = 300, 
  type = 'line' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      setAnimationProgress(prev => {
        if (prev >= 1) return 1;
        return prev + 0.02;
      });
    };

    const animationId = setInterval(animate, 16);
    return () => clearInterval(animationId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;
    
    ctx.clearRect(0, 0, width, height);

    if (!data.datasets.length || !data.labels.length) return;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
    const minValue = Math.min(...data.datasets.flatMap(d => d.data));
    const range = maxValue - minValue || 1;

    const xStep = chartWidth / (data.labels.length - 1);
    const yStep = chartHeight / range;

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    for (let i = 0; i < data.labels.length; i++) {
      const x = padding + xStep * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      const animatedData = dataset.data.map(value => 
        minValue + (value - minValue) * animationProgress
      );

      if (type === 'line') {
        // Draw line
        ctx.strokeStyle = dataset.borderColor;
        ctx.lineWidth = 2;
        ctx.beginPath();

        animatedData.forEach((value, index) => {
          const x = padding + xStep * index;
          const y = height - padding - (value - minValue) * yStep;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.stroke();

        // Draw fill area
        if (dataset.fill) {
          ctx.fillStyle = dataset.backgroundColor;
          ctx.beginPath();
          
          animatedData.forEach((value, index) => {
            const x = padding + xStep * index;
            const y = height - padding - (value - minValue) * yStep;
            
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          
          ctx.lineTo(width - padding, height - padding);
          ctx.lineTo(padding, height - padding);
          ctx.closePath();
          ctx.fill();
        }

        // Draw points
        ctx.fillStyle = dataset.borderColor;
        animatedData.forEach((value, index) => {
          const x = padding + xStep * index;
          const y = height - padding - (value - minValue) * yStep;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });
      } else {
        // Draw bars
        const barWidth = xStep * 0.6;
        const barOffset = (xStep - barWidth) / 2;
        
        ctx.fillStyle = dataset.backgroundColor;
        
        animatedData.forEach((value, index) => {
          const x = padding + xStep * index + barOffset;
          const y = height - padding - (value - minValue) * yStep;
          const barHeight = (value - minValue) * yStep;
          
          ctx.fillRect(x, y, barWidth, barHeight);
        });
      }
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    data.labels.forEach((label, index) => {
      const x = padding + xStep * index;
      ctx.fillText(label, x, height - 10);
    });

    // Draw y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (range / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i + 5;
      ctx.fillText(Math.round(value).toString(), padding - 10, y);
    }
  }, [data, animationProgress, type, height]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }} className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};