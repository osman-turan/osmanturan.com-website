import Script from "next/script";

export function PerformanceReport(): JSX.Element {
  return (
    <Script id="performance-report">
      {`function notifyDomLoaded() {
            console.log("Finished: " + performance.now().toFixed(1) + "ms");
        }
      
        // Wait until DOM fully ready.
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", notifyDomLoaded);
        } else {
            notifyDomLoaded();
        }`}
    </Script>
  );
}
