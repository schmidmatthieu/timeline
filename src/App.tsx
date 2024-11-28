import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline } from './components/Timeline';
import { Character } from './components/Character';
import { ParallaxBackground } from './components/ParallaxBackground';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingScreen } from './components/LoadingScreen';
import { TimelineNavigation } from './components/TimelineNavigation';
import { AdminPage } from './pages/AdminPage';
import { useTimelineData } from './hooks/useTimelineData';
import { useSoundEffects } from './hooks/useSoundEffects';

export default function App() {
  const { data, loadingState, saveData } = useTimelineData();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const { playTransition } = useSoundEffects();
  
  const handlePointChange = (newPosition: number) => {
    if (isMoving || newPosition === currentPosition) return;
    
    setShowContent(false);
    
    setTimeout(() => {
      setIsMoving(true);
      playTransition();
      setCurrentPosition(newPosition);
      
      setTimeout(() => {
        setIsMoving(false);
        setShowContent(true);
      }, 5000);
    }, 500);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowAdmin(prev => !prev);
        return;
      }

      if (!showAdmin && !isMoving && data) {
        if (e.key === 'ArrowLeft' && currentPosition > 0) {
          handlePointChange(currentPosition - 1);
        } else if (e.key === 'ArrowRight' && currentPosition < data.points.length - 1) {
          handlePointChange(currentPosition + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [data, isMoving, currentPosition, showAdmin]);

  if (!data) return null;

  const visiblePoints = data.points.filter(point => !point.hidden);
  const currentPoint = visiblePoints[currentPosition];

  if (showAdmin) {
    return <AdminPage data={data} onSave={saveData} onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatePresence>
        <LoadingScreen loadingState={loadingState} />
      </AnimatePresence>

      <ParallaxBackground 
        progress={currentPosition / (visiblePoints.length - 1)}
        currentBackground={currentPoint.background}
        floatingImages={currentPoint.floatingImages}
        hideFloatingImages={currentPoint.hideFloatingImages}
      />
      
      <Character 
        position={currentPosition} 
        isMoving={isMoving}
        data={data}
      />

      <AnimatePresence mode="wait">
        {showContent && (
          <ImageDisplay
            key={`image-${currentPosition}`}
            point={currentPoint}
            isActive={!isMoving}
          />
        )}
      </AnimatePresence>

      <Timeline
        points={data.points}
        currentPosition={currentPosition}
        onPointClick={handlePointChange}
        progress={currentPosition / (visiblePoints.length - 1)}
      />

      <TimelineNavigation
        points={visiblePoints}
        onNavigate={handlePointChange}
      />
    </div>
  );
}