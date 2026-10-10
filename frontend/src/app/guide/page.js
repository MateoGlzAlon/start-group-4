import { Suspense } from "react";

import Guide from "@/components/Guide";

export const metadata = {
  title: "Your checklist · Arrive SG",
};

// The guide reads the answers from the URL, so it renders in the browser.
export default function GuidePage() {
  return (
    <Suspense fallback={null}>
      <Guide />
    </Suspense>
  );
}
