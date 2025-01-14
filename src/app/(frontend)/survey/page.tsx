import { getCachedGlobal } from "@/payload/utils/getGlobals";
import Survey from "./_components/survey";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Take the Survey | Faith Journey Survey",
  description:
    "Take our 5-10 minute anonymous survey about faith and share your unique perspective. Your honest thoughts and real experiences matter to us.",
  openGraph: {
    title: "Take the Survey | Faith Journey Survey",
    description:
      "Take our 5-10 minute anonymous survey about faith and share your unique perspective.",
    type: "website",
    locale: "en_US",
    siteName: "Faith Journey Survey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take the Survey | Faith Journey Survey",
    description:
      "Take our 5-10 minute anonymous survey about faith and share your unique perspective.",
  },
};

export default async function SurveyPage() {
  const survey = await getCachedGlobal("survey", 1)();

  return <Survey survey={survey} />;
}
