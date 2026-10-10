import ProfileEditor from "@/components/ProfileEditor";

export const metadata = {
  title: "Customise profile · Arrive SG",
};

// "Customise profile" in the header: all answers on one page, with the current ones selected.
export default function ProfilePage() {
  return <ProfileEditor />;
}
