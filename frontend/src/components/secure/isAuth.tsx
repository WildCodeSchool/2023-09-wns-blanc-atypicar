import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * High Order Component
 * Get the token from localstage to tell if the user is connected.
 * If the user is not connected, redirect on the /signin page
 * otherwise display the component as usual.
 */
export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const token = localStorage.getItem("token");

    return;
  }
}