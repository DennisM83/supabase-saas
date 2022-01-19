import { useEffect } from "react";
import { useUser } from "../context/user";
export default function Login() {
  const { login } = useUser();
  useEffect(login, []);

  return (
    <div>
      <p>Logging in</p>
    </div>
  );
}
