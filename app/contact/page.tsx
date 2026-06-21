export default function ContactPage() {
  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-md">
        <h1 className="mb-4 text-3xl font-black text-red-800">Contact</h1>

        <p className="mb-5 leading-7 text-gray-700">
          News of Bihar से संपर्क करने के लिए नीचे दिए गए माध्यम का उपयोग करें।
          आप news correction, सुझाव, official update या जरूरी सूचना भेज सकते
          हैं।
        </p>

        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 p-4">
          <h2 className="mb-2 text-lg font-black text-red-800">
            Email Contact
          </h2>
          <p className="text-gray-700">
            Email:{" "}
            <span className="font-bold text-gray-900">
              newsofbiharofficial@gmail.com
            </span>
          </p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
          <h2 className="mb-2 text-lg font-black text-orange-800">
            Submit News / Correction
          </h2>
          <p className="leading-7 text-gray-700">
            अगर किसी खबर में सुधार चाहिए या आपके पास कोई official सूचना है, तो
            कृपया source/link के साथ हमें भेजें।
          </p>
        </div>
      </div>
    </div>
  );
}