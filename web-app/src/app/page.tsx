import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import IndexPage from "./_components/pages/index";
import BasicPage from "./_components/pages/basicPage";
import BankAccount from "./_components/bankAccount";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <IndexPage/>
    </HydrateClient>
  );
}
