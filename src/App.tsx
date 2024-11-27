import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline } from './components/Timeline';
import { Character } from './components/Character';
import { ParallaxBackground } from './components/ParallaxBackground';
import { TVDisplay } from './components/tv/TVDisplay';
import { LoadingScreen } from './components/LoadingScreen';
import { useTimelineData } from './hooks/useTimelineData';
import { useSoundEffects } from './hooks/useSoundEffects';

export default function App() {
  const { data, loadingState } = useTimelineData();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isTVVisible, setIsTVVisible] = useState(true);
  const { playTransition } = useSoundEffects();
  
  const handlePointChange = (newPosition: number) => {
    if (isMoving || newPosition === currentPosition) return;
    
    // First, close the TV
    setIsTVVisible(false);
    
    // Wait for TV to close, then start movement
    setTimeout(() => {
      setIsMoving(true);
      playTransition();
      setCurrentPosition(newPosition);
      
      // After movement completes, show TV
      setTimeout(() => {
        setIsMoving(false);
        setIsTVVisible(true);
      }, 5000); // Match timeline animation duration
    }, 500); // TV close animation duration
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!data || isMoving) return;
      
      if (e.key === 'ArrowLeft' && currentPosition > 0) {
        handlePointChange(currentPosition - 1);
      } else if (e.key === 'ArrowRight' && currentPosition < data.points.length - 1) {
        handlePointChange(currentPosition + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [data, isMoving, currentPosition]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatePresence>
        <LoadingScreen loadingState={loadingState} />
      </AnimatePresence>

      <ParallaxBackground 
        progress={currentPosition / (data.points.length - 1)}
        currentBackground={data.points[currentPosition].background}
        floatingImages={data.points[currentPosition].floatingImages}
      />
      
      {/* Character */}
      <Character 
        position={currentPosition} 
        isMoving={isMoving}
        totalPoints={data.points.length}
      />

      {/* TV Display */}
      <AnimatePresence mode="wait">
        {isTVVisible && (
          <TVDisplay
            key={`tv-${currentPosition}`}
            point={data.points[currentPosition]}
            isActive={!isMoving}
          />
        )}
      </AnimatePresence>

      {/* Timeline */}
      <Timeline
        points={data.points}
        currentPosition={currentPosition}
        onPointClick={handlePointChange}
        progress={currentPosition / (data.points.length - 1)}
      />

      {/* Navigation hint */}
      <motion.div 
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Use arrow keys or click points to navigate
      </motion.div>
    </div>
  );
}