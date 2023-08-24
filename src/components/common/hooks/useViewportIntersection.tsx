import { RefObject, useEffect, useState } from "react";

export default function useViewportIntersection(
  elementRef: RefObject<Element>
) {
  const [intersectingSide, setIntersectingSide] = useState<
    "left" | "right" | null
  >(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      const { left, right } = entry.boundingClientRect;
      if (left <= 0) {
        setIntersectingSide("left");
      } else if (right >= window.innerWidth) {
        setIntersectingSide("right");
      }
      return;
    }

    setIntersectingSide(null);
  };

  useEffect(() => {
    const elementNode = elementRef?.current;

    if (!elementNode) return;

    const observerOptions = {};
    const observer = new IntersectionObserver(updateEntry, observerOptions);
    observer.observe(elementNode);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current]);

  return intersectingSide;
}
