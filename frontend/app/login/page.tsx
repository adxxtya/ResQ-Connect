import { getServerSession } from "next-auth";
import { LoginForm } from "./form";
import { authOptions } from "@/lib/auth";
import { LoginButton, LogoutButton } from "@/components/buttons.component";
import Cli from "./cli";
// import Header from "@/components/header.component";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      {/* <Header /> */}
      <section className="bg-ct-blue-600 min-h-screen pt-20 flex">
        <div className="mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <LoginForm />
            <LoginButton />
            <LogoutButton />
          </div>
          <Cli />
          <h1>Server Session</h1>
          <pre>{JSON.stringify(session)}</pre>
        </div>
      </section>
    </>
  );
}
