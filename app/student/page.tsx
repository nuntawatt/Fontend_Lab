import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <Image
          src="/app/img.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full"

          
        />
        <h1 className="text-3xl font-semibold mt-4">Nuntawat Seahuam</h1>
        <p className="text-lg text-gray-600 mt-2">Student ID: 653450510-0</p>
        <p className="text-lg text-gray-600">Program: NEXT JS</p>
        <p className="text-lg text-gray-600">Contact: nanthawat.s@kkumail.com</p>
      </div>
    </div>
  );
}
