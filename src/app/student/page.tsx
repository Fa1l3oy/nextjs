"use client";

import { useState } from "react";
import { addStudent, getStudents, Student } from "@/store/student";

export default function StudentPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    school: "",
    gpa: "",
    specialSkills: "",
    reason: "",
    majorChoice: "",
    university: "",
    teacherName: "",
    activities: "",
    awards: "",
    works: "",
    photos: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Student[]>(() => getStudents());

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "กรุณากรอกชื่อ";
    if (!form.lastName.trim()) e.lastName = "กรุณากรอกนามสกุล";
    if (!form.phone.trim()) e.phone = "กรุณากรอกหมายเลขโทรศัพท์";
    else if (!/^0\d{8,9}$/.test(form.phone.trim()))
      e.phone = "หมายเลขโทรศัพท์ไม่ถูกต้อง (เริ่มด้วย 0 และ 9-10 หลัก)";
    if (!form.school.trim()) e.school = "กรุณากรอกโรงเรียน";
    const gpaNum = Number(form.gpa);
    if (form.gpa === "") e.gpa = "กรุณากรอก GPA";
    else if (Number.isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0)
      e.gpa = "GPA ต้องเป็นตัวเลขระหว่าง 0.00 - 4.00";
    if (!form.majorChoice.trim()) e.majorChoice = "กรุณากรอกสาขาที่เลือก";
    if (!form.university.trim()) e.university = "กรุณากรอกมหาวิทยาลัย";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const readers: Promise<string>[] = [];
    for (const f of Array.from(files)) {
      readers.push(
        new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(String(r.result));
          r.onerror = rej;
          r.readAsDataURL(f);
        })
      );
    }
    Promise.all(readers).then((images) => setForm((s) => ({ ...s, photos: [...s.photos, ...images] })));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eobj = validate();
    if (Object.keys(eobj).length) return setErrors(eobj);

    const student = addStudent({
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
      photos: form.photos,
      activities: form.activities.split('\n').map((s) => s.trim()).filter(Boolean),
      awards: form.awards.split('\n').map((s) => s.trim()).filter(Boolean),
      works: form.works.split('\n').map((s) => s.trim()).filter(Boolean),
    });

    setSubmitted(getStudents());
    setForm({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      school: "",
      gpa: "",
      specialSkills: "",
      reason: "",
      majorChoice: "",
      university: "",
      teacherName: "",
      activities: "",
      awards: "",
      works: "",
      photos: [],
    });
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">แบบฟอร์ม Portfolio สมัคร TCAS69</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">ชื่อ *</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block font-medium">นามสกุล *</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block font-medium">ที่อยู่</label>
          <textarea name="address" value={form.address} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">หมายเลขโทรศัพท์ *</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block font-medium">โรงเรียน *</label>
          <input name="school" value={form.school} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.school && <p className="text-red-600">{errors.school}</p>}
        </div>

        <div>
          <label className="block font-medium">ชื่ออาจารย์ที่เกี่ยวข้อง</label>
          <input name="teacherName" value={form.teacherName} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">GPA *</label>
          <input name="gpa" value={form.gpa} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.gpa && <p className="text-red-600">{errors.gpa}</p>}
        </div>

        <div>
          <label className="block font-medium">ความสามารถพิเศษ</label>
          <input name="specialSkills" value={form.specialSkills} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">อัปโหลดรูปภาพ (ผลงาน/กิจกรรม)</label>
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="w-full" />
          <div className="flex gap-2 mt-2">
            {form.photos.map((p, i) => (
              <img key={i} src={p} alt={`photo-${i}`} className="w-24 h-24 object-cover rounded border" />
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">กิจกรรม (แต่ละบรรทัดเป็นกิจกรรม)</label>
          <textarea name="activities" value={form.activities} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">รางวัล (แต่ละบรรทัดเป็นรายการ)</label>
          <textarea name="awards" value={form.awards} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">ผลงาน (แต่ละบรรทัดเป็นรายการ)</label>
          <textarea name="works" value={form.works} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">เหตุผลในการสมัครเข้าเรียน</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">สาขาที่เลือก *</label>
          <input name="majorChoice" value={form.majorChoice} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.majorChoice && <p className="text-red-600">{errors.majorChoice}</p>}
        </div>

        <div>
          <label className="block font-medium">มหาวิทยาลัย *</label>
          <input name="university" value={form.university} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.university && <p className="text-red-600">{errors.university}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">บันทึก Portfolio</button>
          <button
            type="button"
            onClick={() => {
              setForm({
                firstName: "",
                lastName: "",
                address: "",
                phone: "",
                school: "",
                gpa: "",
                specialSkills: "",
                reason: "",
                majorChoice: "",
                university: "",
                teacherName: "",
                activities: "",
                awards: "",
                works: "",
                photos: [],
              });
              setErrors({});
            }}
            className="px-4 py-2 border rounded"
          >
            ยกเลิก
          </button>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">รายชื่อที่บันทึก</h2>
        {submitted.length === 0 && <p className="text-gray-600">ยังไม่มีข้อมูล</p>}
        <ul className="space-y-3">
          {submitted.map((s) => (
            <li key={s.id} className="border p-3 rounded">
              <div className="font-semibold">{s.firstName} {s.lastName} <span className="text-sm text-gray-500">({s.gpa})</span></div>
              <div className="text-sm text-gray-700">โรงเรียน: {s.school} — มหาวิทยาลัย: {s.university} — สาขา: {s.majorChoice}</div>
              <div className="text-sm text-gray-600">โทร: {s.phone} — อาจารย์: {s.teacherName ?? '-'}</div>
              {s.specialSkills && <div className="text-sm">ความสามารถพิเศษ: {s.specialSkills}</div>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
