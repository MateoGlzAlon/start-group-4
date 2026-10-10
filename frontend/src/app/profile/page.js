import Questionnaire from "@/components/Questionnaire";

export const metadata = {
  title: "Customise profile · Arrive SG",
};

// "Customise profile" in the header: the questions, starting at the first one, with the saved answers selected.
export default function ProfilePage() {
  return <Questionnaire editing />;
}
