// 'use client';

// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// type CellStyle = React.CSSProperties & {
//   '--delay'?:    string;
//   '--duration'?: string;
// };

// interface DivGridProps {
//   rows:        number;
//   cols:        number;
//   cellSize:    number;
//   clickedCell: { row: number; col: number } | null;
//   onCellHit:   (row: number, col: number) => void;
//   animKey:     number; // forces cell class re-evaluation on each ripple
// }

// interface BackgroundRippleEffectProps {
//   rows?:     number;
//   cols?:     number;
//   cellSize?: number;
// }

// function DivGrid({ rows, cols, cellSize, clickedCell, onCellHit, animKey }: DivGridProps) {
//   const cells = useMemo(
//     () => Array.from({ length: rows * cols }, (_, i) => i),
//     [rows, cols],
//   );

//   const gridStyle: React.CSSProperties = {
//     display:             'grid',
//     gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
//     gridTemplateRows:    `repeat(${rows}, ${cellSize}px)`,
//     width:               cols * cellSize,
//     height:              rows * cellSize,
//   };

//   return (
//     <div style={gridStyle}>
//       {cells.map((idx) => {
//         const rowIdx = Math.floor(idx / cols);
//         const colIdx = idx % cols;

//         const distance = clickedCell
//           ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
//           : 0;

//         const delay    = clickedCell ? Math.max(0, distance * 48) : 0;
//         const duration = clickedCell ? 200 + distance * 70        : 0;

//         // Key includes animKey so React re-renders cells and restarts the animation
//         const cellKey = `${animKey}-${idx}`;

//         const style: CellStyle = clickedCell
//           ? { '--delay': `${delay}ms`, '--duration': `${duration}ms` }
//           : {};

//         return (
//           <div
//             key={cellKey}
//             className={clickedCell ? 'adv-cell adv-cell--ripple' : 'adv-cell'}
//             style={style}
//             onMouseEnter={() => onCellHit(rowIdx, colIdx)}
//             onClick={() => onCellHit(rowIdx, colIdx)}
//             onTouchStart={(e) => {
//               e.preventDefault();
//               onCellHit(rowIdx, colIdx);
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

// export function BackgroundRippleEffect({
//   rows:     rowsProp,
//   cols:     colsProp,
//   cellSize = 52,
// }: BackgroundRippleEffectProps) {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   const [rows, setRows] = useState(rowsProp ?? 14);
//   const [cols, setCols] = useState(colsProp ?? 26);

//   // Auto-size to fill the parent section
//   useEffect(() => {
//     if (rowsProp !== undefined && colsProp !== undefined) return;
//     const parent = wrapRef.current?.parentElement;
//     if (!parent) return;

//     const calc = () => {
//       const h = parent.offsetHeight || window.innerHeight;
//       const w = parent.offsetWidth  || window.innerWidth;
//       if (rowsProp === undefined) setRows(Math.ceil(h / cellSize) + 1);
//       if (colsProp === undefined) setCols(Math.ceil(w / cellSize) + 1);
//     };

//     calc();
//     const ro = new ResizeObserver(calc);
//     ro.observe(parent);
//     return () => ro.disconnect();
//   }, [cellSize, rowsProp, colsProp]);

//   const [clickedCell, setClickedCell] = useState<{ row: number; col: number } | null>(null);
//   const [animKey,     setAnimKey]     = useState(0);

//   const trigger = useCallback((row: number, col: number) => {
//     setClickedCell({ row, col });
//     // Increment key → React re-renders DivGrid cells → animation class restarts cleanly
//     setAnimKey((k) => k + 1);
//   }, []);

//   // Touch drag: resolve the cell under the finger each frame
//   const handleTouchMove = useCallback(
//     (e: React.TouchEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       const touch = e.touches[0];
//       const el    = gridRef.current;
//       if (!el) return;
//       const rect = el.getBoundingClientRect();
//       const col  = Math.floor((touch.clientX - rect.left) / cellSize);
//       const row  = Math.floor((touch.clientY - rect.top)  / cellSize);
//       if (row >= 0 && row < rows && col >= 0 && col < cols) {
//         trigger(row, col);
//       }
//     },
//     [cellSize, cols, rows, trigger],
//   );

//   return (
//     // Outer wrapper: pointer-events none so underlying hero buttons still work
//     <div
//       ref={wrapRef}
//       className="absolute inset-0 overflow-hidden"
//       style={{ zIndex: 3, pointerEvents: 'none' }}
//     >
//       {/* Inner grid wrapper: pointer-events auto only here */}
//       <div
//         ref={gridRef}
//         className="absolute inset-0"
//         style={{ pointerEvents: 'auto', touchAction: 'none' }}
//         onTouchMove={handleTouchMove}
//       >
//         <DivGrid
//           rows={rows}
//           cols={cols}
//           cellSize={cellSize}
//           clickedCell={clickedCell}
//           onCellHit={trigger}
//           animKey={animKey}
//         />
//       </div>

//       {/* Edge fade mask — cells dissolve at edges, hero image stays fully visible */}
//       <div
//         className="pointer-events-none absolute inset-0"
//         style={{
//           background: [
//             'radial-gradient(ellipse 90% 75% at 50% 40%, transparent 20%, rgba(0,0,0,0.75) 70%, #000 100%)',
//           ].join(', '),
//         }}
//       />
//     </div>
//   );
// }






'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type CellStyle = React.CSSProperties & {
  '--delay'?:    string;
  '--duration'?: string;
};

interface DivGridProps {
  className?:    string;
  rows:          number;
  cols:          number;
  cellSize:      number;
  borderColor:   string;
  fillColor:     string;
  clickedCell:   { row: number; col: number } | null;
  onCellClick?:  (row: number, col: number) => void;
  interactive?:  boolean;
}

const DivGrid = ({
  className,
  rows       = 4,
  cols       = 27,
  cellSize   = 56,
  borderColor,
  fillColor,
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display:             'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows:    `repeat(${rows}, ${cellSize}px)`,
    width:               cols * cellSize,
    height:              rows * cellSize,
    marginInline:        'auto',
  };

  return (
    <div className={cn('relative z-[3]', className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;

        const delay    = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style: CellStyle = clickedCell
          ? { '--delay': `${delay}ms`, '--duration': `${duration}ms` }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              'adv-cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80',
              // original shadcn class — works with @theme inline in globals.css
              clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
              !interactive && 'pointer-events-none',
            )}
            style={{
              backgroundColor: fillColor,
              borderColor:     borderColor,
              ...style,
            }}
            onClick={interactive ? () => onCellClick(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
};

interface BackgroundRippleEffectProps {
  rows?:     number;
  cols?:     number;
  cellSize?: number;
}

export function BackgroundRippleEffect({
  rows:     rowsProp,
  cols:     colsProp,
  cellSize = 54,
}: BackgroundRippleEffectProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(rowsProp ?? 14);
  const [cols, setCols] = useState(colsProp ?? 26);

  // Auto-fill parent dimensions
  useEffect(() => {
    if (rowsProp !== undefined && colsProp !== undefined) return;
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;

    const calc = () => {
      const h = parent.offsetHeight || window.innerHeight;
      const w = parent.offsetWidth  || window.innerWidth;
      if (rowsProp === undefined) setRows(Math.ceil(h / cellSize) + 1);
      if (colsProp === undefined) setCols(Math.ceil(w / cellSize) + 1);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [cellSize, rowsProp, colsProp]);

  const [clickedCell, setClickedCell] = useState<{ row: number; col: number } | null>(null);
  const [rippleKey,   setRippleKey]   = useState(0);

  // Touch drag support
  const gridRef = useRef<HTMLDivElement>(null);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      const el    = gridRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const col  = Math.floor((touch.clientX - rect.left) / cellSize);
      const row  = Math.floor((touch.clientY - rect.top)  / cellSize);
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        setClickedCell({ row, col });
        setRippleKey((k) => k + 1);
      }
    },
    [cellSize, cols, rows],
  );

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{ zIndex: 3, pointerEvents: 'none' }}
    >
      <div
        ref={gridRef}
        className="relative h-full w-full overflow-hidden"
        style={{ pointerEvents: 'auto', touchAction: 'none' }}
        onTouchMove={handleTouchMove}
      >
        {/*
          key=`base-${rippleKey}` is the original shadcn pattern —
          remounting DivGrid resets all cell keys so animate-cell-ripple
          restarts cleanly from frame 0 on every click.
        */}
        <DivGrid
          key={`base-${rippleKey}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="rgba(245, 197, 24, 0.12)"
          fillColor="rgba(0, 0, 0, 0.01)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>

      {/* Edge fade — cells dissolve toward the borders */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 50% 40%, transparent 20%, rgba(0,0,0,0.8) 70%, #000 100%)',
        }}
      />
    </div>
  );
}