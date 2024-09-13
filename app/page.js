import Link from "next/link";
import StudentInfo from "./week-2/student-info";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl">CPRG 306: Web Development 2 - Assignments</h1>
      <ul>
        <li>
          <Link href="./week-2">Week 2</Link>
        </li>
      </ul>

    </main>
  );
}
