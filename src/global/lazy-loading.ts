export function waitForIntersection(host: Element, rootMargin?: string): Promise<void> {
  return new Promise((resolve) => {
    if ("IntersectionObserver" in window) {
      let io = new IntersectionObserver((data) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        console.log(data);
        if (data[0].isIntersecting) {
          io.disconnect();
          resolve();
        }
      }, { rootMargin });

      io.observe(host);
    } else {
      resolve();
    }
  });
}
