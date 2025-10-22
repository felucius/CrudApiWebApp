import { HydrateClient } from "~/trpc/server";
import BankAccount from "../_components/bankAccount"; // adjust path if needed

export default function Page() {
  return (
    <HydrateClient>
      <BankAccount />
    </HydrateClient>
  );
}
