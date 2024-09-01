import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>About Me</h1>
      <p>This is a first page.</p>
      <Link href="/student">Go to student</Link>
    </div>
  );
}
