"use client";

import { useState, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  initialOffset: number;
  limit: number;
  shouldLoad: boolean;
}

export function useInfiniteScroll({
  initialOffset,
  limit,
  shouldLoad,
}: UseInfiniteScrollOptions) {
  const [offset, setOffset] = useState(initialOffset);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !shouldLoad) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setOffset((prevOffset) => prevOffset + limit);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, shouldLoad, limit]
  );

  return {
    offset,
    isLoading,
    setIsLoading,
    hasMore,
    setHasMore,
    lastElementRef,
  };
}
