export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-md">
        <h1 className="mb-4 text-3xl font-black text-red-800">
          Privacy Policy
        </h1>

        <p className="mb-4 leading-7 text-gray-700">
          News of Bihar आपकी privacy का सम्मान करता है। हमारा उद्देश्य बिहार की
          जरूरी खबरों, शिक्षा, नौकरी, योजना और जिला अपडेट को सरल भाषा में लोगों
          तक पहुँचाना है।
        </p>

        <h2 className="mb-2 text-xl font-black text-gray-900">
          हम कौन सी जानकारी लेते हैं?
        </h2>
        <p className="mb-4 leading-7 text-gray-700">
          वर्तमान में यह वेबसाइट किसी यूज़र से व्यक्तिगत जानकारी जैसे पासवर्ड,
          बैंक डिटेल या निजी दस्तावेज नहीं मांगती। Contact form या email के
          माध्यम से भेजी गई जानकारी केवल जवाब देने के उद्देश्य से उपयोग की जा
          सकती है।
        </p>

        <h2 className="mb-2 text-xl font-black text-gray-900">
          Cookies और Analytics
        </h2>
        <p className="mb-4 leading-7 text-gray-700">
          भविष्य में वेबसाइट performance समझने के लिए basic analytics या cookies
          का उपयोग किया जा सकता है, ताकि user experience बेहतर बनाया जा सके।
        </p>

        <h2 className="mb-2 text-xl font-black text-gray-900">
          Third Party Links
        </h2>
        <p className="leading-7 text-gray-700">
          हमारी वेबसाइट पर सरकारी वेबसाइट, official notice या अन्य बाहरी links
          दिए जा सकते हैं। उन websites की privacy policy के लिए वे खुद
          जिम्मेदार होंगे।
        </p>
      </div>
    </div>
  );
}