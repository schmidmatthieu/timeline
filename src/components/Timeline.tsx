import { motion } from 'framer-motion';
import { TimelinePoint } from './TimelinePoint';
import type { TimelinePoint as TimelinePointType } from '../types';

interface TimelineProps {
  points: TimelinePointType[];
  currentPosition: number;
  progress: number;
  onPointClick: (position: number) => void;
}

export function Timeline({ points, currentPosition, progress, onPointClick }: TimelineProps) {
  // Calculate viewport width percentages for point positioning
  const viewportWidth = 100; // 100vw
  const centerPosition = 50; // Center at 50vw
  const pointSpacing = 30; // 30vw between points

  // Calculate the timeline offset to keep current point centered
  const timelineOffset = -(currentPosition * pointSpacing);

  return (
    <div className="fixed bottom-32 left-0 right-0 h-40">
      {/* Timeline container with horizontal scroll */}
      <div className="relative w-full h-full">
        {/* Sliding timeline content */}
        <motion.div
          className="absolute h-full"
          style={{
            left: `${centerPosition}vw`,
            width: `${points.length * pointSpacing}vw`,
          }}
          animate={{
            x: `${timelineOffset}vw`,
          }}
          transition={{
            duration: 5,
            ease: "easeInOut"
          }}
        >
          {/* Timeline line with glow effect */}
          <div className="absolute bottom-[12px] left-0 right-0 flex items-center">
            {/* Left fade gradient */}
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-white/30" />
            
            {/* Main line with glow */}
            <div className="flex-grow h-[2px] bg-white/30 relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-sm" />
            </div>
            
            {/* Right fade gradient */}
            <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-white/30" />
          </div>

          {/* Timeline points */}
          {points.map((point, index) => {
            const isVisible = 
              index >= currentPosition - 1 && 
              index <= currentPosition + 1;

            return (
              <motion.div
                key={point.id}
                className="absolute bottom-0"
                style={{
                  left: `${index * pointSpacing}vw`,
                  transform: 'translateX(-50%)',
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
                animate={{
                  scale: isVisible ? 1 : 0.8,
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                <TimelinePoint
                  point={point}
                  isActive={index === currentPosition}
                  onClick={() => onPointClick(index)}
                  totalPoints={points.length}
                />
              </motion.div>
            );
          })}

          {/* Year markers */}
          {points.map((point, index) => {
            const isVisible = 
              index >= currentPosition - 1 && 
              index <= currentPosition + 1;

            return (
              <motion.div
                key={`year-${point.id}`}
                className="hidden absolute bottom-[-24px] text-sm text-gray-400"
                style={{
                  left: `${index * pointSpacing}vw`,
                  transform: 'translateX(-50%)',
                }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                {point.year}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Static gradient overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </div>
  );
}