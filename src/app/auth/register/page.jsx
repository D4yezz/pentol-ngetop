import Logo from "@/components/layout/logo/logo";
import RegisterView from "@/components/views/auth/Register/register";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-neutral-100 w-full h-dvh">
        <div className="px-12">
          <Logo />
        </div>
        <div className="mx-auto flex flex-col">
          <RegisterView />
        </div>
      </div>
    </>
  );
}
