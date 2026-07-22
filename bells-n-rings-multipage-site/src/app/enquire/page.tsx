import type { Metadata } from "next";
import InvitationReveal from "@/components/enquire/InvitationReveal";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Enquire with BnR Event Planners about your wedding, traditional ceremony, reception, or corporate event.",
};

export default function EnquirePage() {
  return <InvitationReveal />;
}
