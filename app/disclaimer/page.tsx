export default function DisclaimerPage() {
  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-md">
        <h1 className="mb-4 text-3xl font-black text-red-800">Disclaimer</h1>

        <p className="mb-4 leading-7 text-gray-700">
          News of Bihar किसी सरकारी संस्था, विभाग या आयोग की official website
          नहीं है। यह एक स्वतंत्र news और information platform है।
        </p>

        <h2 className="mb-2 text-xl font-black text-gray-900">
          सरकारी नौकरी / परीक्षा / योजना
        </h2>
        <p className="mb-4 leading-7 text-gray-700">
          सरकारी नौकरी, परीक्षा, admit card, result, answer key, योजना या
          official notice से जुड़ी जानकारी को आवेदन करने या निर्णय लेने से पहले
          संबंधित official website से अवश्य मिलान करें।
        </p>

        <h2 className="mb-2 text-xl font-black text-gray-900">
          खबरों की सटीकता
        </h2>
        <p className="mb-4 leading-7 text-gray-700">
          हमारा प्रयास रहता है कि खबरें सही, साफ और जिम्मेदार भाषा में दी जाएं।
          फिर भी किसी सूचना में बदलाव, त्रुटि या अपडेट संभव है।
        </p>

        <h2 className="mb-2 text-xl font-black text-gray-900">
          Correction Policy
        </h2>
        <p className="leading-7 text-gray-700">
          यदि किसी खबर या जानकारी में सुधार की आवश्यकता हो, तो आप हमें Contact
          page के माध्यम से सूचित कर सकते हैं।
        </p>
      </div>
    </div>
  );
}