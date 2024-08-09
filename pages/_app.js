import "@/styles/globals.css";
import Menu from "@/components/menu";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const login = router.pathname === "/login";
  const register = router.pathname === "/register";
  return (
    <div className="flex min-h-dvh flex-col">
      <div className={`${login || register ? "mb-0" : "mb-[62px]"}`}>
        {!(login || register) && <Menu />}
      </div>
      <Component {...pageProps} />
    </div>
  );
}
