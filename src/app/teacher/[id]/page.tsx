"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStudentById, updateStudent } from "@/store/student";

type Props = { params: { id: string } };

export default function StudentDetailClient({ params }: Props) {
  // Next.js may pass `params` as a Promise in client components.
  // Use `React.use()` to unwrap it when available (future-proof).
  // Fallback to `params` for older runtimes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedParams = (React as any).use ? (React as any).use(params) : params;
  const s = getStudentById(resolvedParams.id);
  if (!s) return <div className="p-6">ไม่พบข้อมูลนักเรียน</div>;
  const [stu, setStu] = useState(() => s);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(() => ({
    firstName: s.firstName,
    lastName: s.lastName,
    address: s.address || "",
    phone: s.phone || "",
    school: s.school || "",
    gpa: String(s.gpa ?? ""),
    specialSkills: s.specialSkills || "",
    reason: s.reason || "",
    majorChoice: s.majorChoice || "",
    university: s.university || "",
    teacherName: s.teacherName || "",
  }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function save() {
    if (!s) return;
    const updated = updateStudent(s.id, {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      school: form.school.trim(),
      gpa: Number(Number(form.gpa).toFixed(2)),
      specialSkills: form.specialSkills.trim(),
      reason: form.reason.trim(),
      majorChoice: form.majorChoice.trim(),
      university: form.university.trim(),
      teacherName: form.teacherName.trim() || undefined,
    });
    if (updated) {
      setStu(updated);
      setEditMode(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="text-sm text-blue-600 underline">ไปหน้าหลัก</Link>
        <h1 className="text-2xl font-bold">{s.firstName} {s.lastName}</h1>
      </div>

      {!editMode ? (
        <>
          <div className="text-sm text-gray-600 mb-4">GPA: {stu.gpa.toFixed(2)} — โรงเรียน: {stu.school}</div>

          {stu.photos && stu.photos.length > 0 && (
            <section className="mb-4">
              <h2 className="font-semibold mb-2">รูปภาพ</h2>
              <div className="flex gap-2 flex-wrap">
                {stu.photos.map((p, i) => (
                  <div key={i} className="w-40 h-40 relative rounded border overflow-hidden">
                    <Image src={p} alt={`photo-${i}`} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mb-3">
            <h3 className="font-semibold">ข้อมูลส่วนตัว</h3>
            <div>ที่อยู่: {stu.address}</div>
            <div>โทรศัพท์: {stu.phone}</div>
            <div>ความสามารถพิเศษ: {stu.specialSkills}</div>
            <div>เหตุผล: {stu.reason}</div>
            <div>อาจารย์ที่เกี่ยวข้อง: {stu.teacherName ?? '-'}</div>
          </section>

          <section className="mb-3">
            <h3 className="font-semibold">กิจกรรม</h3>
            {stu.activities && stu.activities.length > 0 ? (
              <ul className="list-disc ml-6">{stu.activities.map((a, i) => <li key={i}>{a}</li>)}</ul>
            ) : <div className="text-gray-600">ไม่มี</div>}
          </section>

          <section className="mb-3">
            <h3 className="font-semibold">รางวัล</h3>
            {stu.awards && stu.awards.length > 0 ? (
              <ul className="list-disc ml-6">{stu.awards.map((a, i) => <li key={i}>{a}</li>)}</ul>
            ) : <div className="text-gray-600">ไม่มี</div>}
          </section>

          <section className="mb-3">
            <h3 className="font-semibold">ผลงาน</h3>
            {stu.works && stu.works.length > 0 ? (
              <ul className="list-disc ml-6">{stu.works.map((w, i) => <li key={i}>{w}</li>)}</ul>
            ) : <div className="text-gray-600">ไม่มี</div>}
          </section>

          <div className="mt-4">
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-yellow-500 rounded">แก้ไข (สำหรับอาจารย์)</button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="font-semibold mb-2">แก้ไขข้อมูลนักเรียน</h2>
          <div className="space-y-2">
            <div>
              <label className="block">ชื่อ</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block">นามสกุล</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block">GPA</label>
              <input name="gpa" value={form.gpa} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block">โทร</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block">อาจารย์ที่เกี่ยวข้อง</label>
              <input name="teacherName" value={form.teacherName} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div className="flex gap-2 mt-3">
              <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">บันทึก</button>
              <button onClick={() => setEditMode(false)} className="px-4 py-2 border rounded">ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
