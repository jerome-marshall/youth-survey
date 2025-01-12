import { getCachedGlobal } from "@/payload/utils/getGlobals";
import Survey from "./_components/survey";

export default async function SurveyPage() {
  const survey = await getCachedGlobal("survey", 1)();

  return <Survey survey={survey} />;
}
