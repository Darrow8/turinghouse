'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Pixel {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  velocity: number;
  delay: number;
  started: boolean;
  settled: boolean;
}

const TuringBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);

  // Configuration
  const MOBILE_BREAKPOINT = 768; // Standard mobile breakpoint
  const DESKTOP_PIXEL_SIZE = 8; // Larger pixels for better performance at full screen
  const MOBILE_PIXEL_SIZE = 4; // Smaller pixels for better quality on mobile
  const GRAVITY = 0.5;
  const BOUNCE_DAMPING = 0.4;
  const SETTLE_THRESHOLD = 0.5;

  const isMobile = () => {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  };

  const getImageSource = () => {
    return isMobile() ? '/aturing-mobile.jpg' : '/aturing-desktop.jpg';
  };

  const getPixelSize = () => {
    return isMobile() ? MOBILE_PIXEL_SIZE : DESKTOP_PIXEL_SIZE;
  };

  const startAnimation = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const loadImage = (): void => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = getImageSource();
      img.onload = () => {
        console.log('Image loaded successfully');
        const canvas = canvasRef.current;
        if (!canvas) {
          console.error('Canvas not found');
          return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Context not found');
          return;
        }

        // Set canvas to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Calculate scaled dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        // Calculate scale factors for both width and height
        const scaleX = canvas.width / width;
        const scaleY = canvas.height / height;
        
        // Use the larger scale to ensure the image covers the screen
        const scale = Math.max(scaleX, scaleY);
        
        // Calculate new dimensions
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
        
        // Center the image
        const x = Math.floor((canvas.width - width) / 2);
        const y = Math.floor((canvas.height - height) / 2);
        
        // Draw image temporarily to extract colors
        ctx.drawImage(img, x, y, width, height);
        
        // Extract pixel data
        const imageData = ctx.getImageData(x, y, width, height);
        const newPixels: Pixel[] = [];
        
        // Get current pixel size based on device
        const currentPixelSize = getPixelSize();
        
        // Calculate the number of pixels needed to cover the width and height
        const numPixelsX = Math.ceil(width / currentPixelSize);
        const numPixelsY = Math.ceil(height / currentPixelSize);
        
        // Create pixels with slight overlap to prevent gaps
        for (let py = 0; py < numPixelsY; py++) {
          for (let px = 0; px < numPixelsX; px++) {
            const pixelX = px * currentPixelSize;
            const pixelY = py * currentPixelSize;
            
            // Sample from the center of each pixel
            const centerX = Math.min(pixelX + currentPixelSize / 2, width - 1);
            const centerY = Math.min(pixelY + currentPixelSize / 2, height - 1);
            const index = (Math.floor(centerY) * width + Math.floor(centerX)) * 4;
            
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            const a = imageData.data[index + 3];
            
            // Only create pixels for non-transparent areas
            if (a > 0) {
              // Calculate initial position with some randomness
              const initialX = x + pixelX + (Math.random() - 0.5) * 200;
              const initialY = -currentPixelSize - Math.random() * 500;
              
              newPixels.push({
                x: initialX,
                y: initialY,
                targetX: x + pixelX,
                targetY: y + pixelY,
                color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
                velocity: 0,
                delay: Math.random() * 100 + (py / numPixelsY) * 50,
                started: false,
                settled: false
              });
            }
          }
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        console.log(`Created ${newPixels.length} pixels`);
        pixelsRef.current = newPixels;
        // Start animation automatically when image is loaded
        startAnimation();
      };
      
      img.onerror = (e) => {
        console.error('Failed to load image:', e);
      };
    };

    loadImage();

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate image dimensions
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = getImageSource();
        
        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          // Calculate scaled dimensions maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          // Calculate scale factors for both width and height
          const scaleX = canvas.width / width;
          const scaleY = canvas.height / height;
          
          // Use the larger scale to ensure the image covers the screen
          const scale = Math.max(scaleX, scaleY);
          
          // Calculate new dimensions
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
          
          // Center the image
          const x = Math.floor((canvas.width - width) / 2);
          const y = Math.floor((canvas.height - height) / 2);
          
          // Reset and restart animation with new dimensions
          resetCanvas();
          startAnimation();
        };
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getImageSource, getPixelSize, startAnimation]);

  const drawPixels = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const currentPixelSize = getPixelSize();
    let settledCount = 0;
    pixelsRef.current.forEach(pixel => {
      if (pixel.started) {
        ctx.fillStyle = pixel.color;
        // Use floor instead of round to prevent gaps
        const x = Math.floor(pixel.x);
        const y = Math.floor(pixel.y);
        // Draw slightly larger pixels to ensure coverage
        ctx.fillRect(x, y, currentPixelSize + 1, currentPixelSize + 1);
      }
      if (pixel.settled) settledCount++;
    });
    
    // Update progress
    const newProgress = Math.round((settledCount / pixelsRef.current.length) * 100);
    setProgress(newProgress);
  };

  const animate = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let allSettled = true;
    
    // Update pixels
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      
      // Handle delay
      if (pixel.delay > 0) {
        pixel.delay -= 1;
        allSettled = false;
        continue;
      }
      
      // Mark as started
      if (!pixel.started) {
        pixel.started = true;
      }
      
      // Skip if already settled
      if (pixel.settled) continue;
      
      // Apply gravity
      pixel.velocity += GRAVITY;
      pixel.y += pixel.velocity;
      
      // Check if pixel reached or passed target position
      if (pixel.y >= pixel.targetY) {
        const overshoot = pixel.y - pixel.targetY;
        
        // If moving fast, bounce
        if (Math.abs(pixel.velocity) > SETTLE_THRESHOLD) {
          pixel.y = pixel.targetY - overshoot * BOUNCE_DAMPING;
          pixel.velocity = -pixel.velocity * BOUNCE_DAMPING;
          allSettled = false;
        } else {
          // Settle the pixel
          pixel.y = pixel.targetY;
          pixel.x = pixel.targetX;
          pixel.velocity = 0;
          pixel.settled = true;
        }
      } else {
        allSettled = false;
      }
      
      // Gradually move x towards target
      if (!pixel.settled) {
        pixel.x += (pixel.targetX - pixel.x) * 0.1;
      }
    }
    
    // Draw all pixels
    drawPixels(ctx);
    
    // Continue animation if needed
    if (!allSettled) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      console.log('Animation complete');
      setIsAnimating(false);
    }
  };

  const resetCanvas = (): void => {
    console.log('Reset clicked');
    
    // Cancel animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset all pixels
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      pixel.started = false;
      pixel.settled = false;
    }
    
    setProgress(0);
    setIsAnimating(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default TuringBackground; 