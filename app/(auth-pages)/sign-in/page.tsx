import AuthForm from "@/components/auth-form";
import { Message } from "@/components/form-message";

export default async function Login(props: { searchParams: Promise<Message>, description: string}) {
  const searchParams = await props.searchParams;

  return (
    <AuthForm isLogin={true} searchParams={searchParams} />
  );
}
