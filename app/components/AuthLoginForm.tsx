import { FC, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const supabase = createClientComponentClient();

const AuthLoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(
          error.message.charAt(0).toUpperCase() + error.message.slice(1)
        );
      } else if (data.user) {
        setSuccess("Sign in successful!");
        router.push("/chat");
      }
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-10/12 h-full items-center">
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="flex flex-col items-center w-full h-20">
          <div className="flex flex-col h-full w-full">
            <span className="font-nue text-white text-[1rem] ml-1">Email</span>
            <input
              type="email"
              placeholder="e.g. haribahadur@gmail.com"
              className="bg-bgsec h-16 text-[1rem] rounded-lg pl-3 m-0 w-full focus:outline-none focus:border focus:border-foreground/40 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full h-28 mt-3">
          <div className="flex flex-col h-full w-full">
            <span className="font-nue text-white text-[1rem] ml-1">Password</span>
            <input
              type="password"
              placeholder="e.g. sec!!rE@321"
              className="bg-bgsec text-white h-16 text-[1rem] rounded-lg pl-3 m-0 w-full focus:outline-none focus:border focus:border-foreground/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className=" text-xs text-foreground/35 ml-1 mt-2">
              Must be at least 8 characters long, with a number and a special
              character.
            </span>
          </div>
        </div>

        {error ? (
          <p className="text-red-500/80 text-[0.7em]  mt-2">{error}</p>
        ) : success ? (
          <p className="text-green-500/80 text-[0.7em]  mt-2">{success}</p>
        ) : (
          <p>&#8239;</p>
        )}

        <button
          type="submit"
          className="hover:cursor-pointer hover:bg-prim2 transition duration-300 ease-in-out flex flex-col
          items-center justify-center w-full h-12 rounded-xl mt-3 hover:opacity-100 last: text-lg 
          text-background bg-foreground font-bold"
        >
          LOGIN
        </button>
      </form>

      <p className="text-foreground/[.5]  text-xs text-thin mt-4">
        Don't have an account?{" "}
        <Link href="/auth/register">
          <span className="font-bold text-[0.9rem] underline text-foreground">
            Register
          </span>
        </Link>
      </p>
    </div>
  );
};

export default AuthLoginForm;
