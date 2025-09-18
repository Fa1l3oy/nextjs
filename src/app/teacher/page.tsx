"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getStudents, Student } from "@/store/student";

export default function TeacherPage() {
  const [students] = useState<Student[]>(() => getStudents());
  const [sortBy, setSortBy] = useState<"name" | "gpa">("name");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    const arr = [...students];
    if (sortBy === "name") {
      arr.sort((a, b) => (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName));
    } else {
      arr.sort((a, b) => a.gpa - b.gpa);
    }
    if (dir === "desc") arr.reverse();
    return arr;
  }, [students, sortBy, dir]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">หน้าสำหรับอาจารย์ — รายชื่อนักเรียน</h1>
        <Link href="/" className="text-sm text-blue-600 underline">ไปหน้าหลัก</Link>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div>
          <label className="mr-2">เรียงตาม:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "gpa")} className="border p-1 rounded">
            <option value="name">ชื่อนักเรียน</option>
            <option value="gpa">GPA</option>
          </select>
        </div>
        <div>
          <button onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))} className="px-3 py-1 border rounded">
            {dir === "asc" ? "จากน้อย → มาก" : "จากมาก → น้อย"}
          </button>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">ชื่อ-นามสกุล</th>
            <th className="p-2">GPA</th>
            <th className="p-2">โรงเรียน</th>
            <th className="p-2">อาจารย์ที่เกี่ยวข้อง</th>
            <th className="p-2">ดูรายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="p-2">{s.firstName} {s.lastName}</td>
              <td className="p-2">{s.gpa.toFixed(2)}</td>
              <td className="p-2">{s.school}</td>
              <td className="p-2">{s.teacherName ?? '-'}</td>
              <td className="p-2"><Link href={`/teacher/${s.id}`} className="text-blue-600 underline">รายละเอียด</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
