import { useRef, useState } from 'react';

const UseScrollbarHook = () => {
  const scrollableTableRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (scrollableTableRef.current) {
      setIsMouseDown(true);
      setStartX(e.pageX - scrollableTableRef.current.offsetLeft);
      setScrollLeft(scrollableTableRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMouseDown || !scrollableTableRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollableTableRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the multiplier for faster or slower scrolling
    scrollableTableRef.current.scrollLeft = scrollLeft - walk;
  };
  return {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  };
};
export default UseScrollbarHook;
