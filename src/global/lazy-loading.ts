/**
 * Resolves a promise when the host is on the screen.
 * @param host The element to lazy load, normally `@Element()`.
 * @param rootMargin How close to being on the screen should the image load. Accepts CSS style margin-property.
 */
export function waitForIntersection(element: Element, rootMargin?: string): Promise<void> {

  return new Promise((resolve) => {
    if ("IntersectionObserver" in window) {
      let io = new IntersectionObserver((data) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[0].isIntersecting) {
          io.disconnect();
          resolve();
        }
      }, { rootMargin });

      io.observe(element);
    } else {
      resolve();
    }
  });
}
