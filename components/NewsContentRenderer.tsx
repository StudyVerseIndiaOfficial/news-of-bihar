type NewsContentRendererProps = {
  content: string;
};

function cleanLine(line: string) {
  return line.trim();
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-black text-red-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

export default function NewsContentRenderer({
  content,
}: NewsContentRendererProps) {
  const lines = content
    .split("\n")
    .map(cleanLine)
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl bg-gray-50 p-6 text-center">
        <p className="text-sm font-bold text-gray-500">
          इस खबर की पूरी जानकारी अभी उपलब्ध नहीं है।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {lines.map((line, index) => {
        if (line.startsWith("# ")) {
          return (
            <h2
              key={index}
              className="mt-8 rounded-3xl bg-gradient-to-r from-red-900 to-orange-600 px-5 py-4 text-2xl font-black leading-snug text-white shadow-lg"
            >
              {line.replace("# ", "")}
            </h2>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h3
              key={index}
              className="mt-7 border-l-4 border-red-800 bg-red-50 px-4 py-3 text-xl font-black leading-snug text-red-950"
            >
              {line.replace("## ", "")}
            </h3>
          );
        }

        if (line.startsWith("### ")) {
          return (
            <h4
              key={index}
              className="mt-6 text-lg font-black leading-snug text-gray-950"
            >
              {line.replace("### ", "")}
            </h4>
          );
        }

        if (line.startsWith("- ")) {
          return (
            <div
              key={index}
              className="flex gap-3 rounded-2xl border border-red-100 bg-white p-4 shadow-sm"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-800 text-xs font-black text-white">
                ✓
              </span>
              <p className="break-words text-base font-semibold leading-8 text-gray-800">
                {renderInlineText(line.replace("- ", ""))}
              </p>
            </div>
          );
        }

        if (line.startsWith("! ")) {
          return (
            <div
              key={index}
              className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-5 shadow-md"
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-black text-orange-700">
                <span>⚠️</span>
                <span>जरूरी जानकारी</span>
              </div>
              <p className="break-words text-base font-bold leading-8 text-gray-900">
                {renderInlineText(line.replace("! ", ""))}
              </p>
            </div>
          );
        }

        if (line.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="rounded-3xl border-l-4 border-red-800 bg-gray-50 p-5 shadow-sm"
            >
              <p className="break-words text-lg font-black italic leading-8 text-red-900">
                “{line.replace("> ", "")}”
              </p>
            </blockquote>
          );
        }

        if (line === "---") {
          return (
            <div key={index} className="my-8 h-px w-full bg-red-100" />
          );
        }

        return (
          <p
            key={index}
            className="break-words rounded-2xl bg-white px-1 text-base font-semibold leading-9 text-gray-800"
          >
            {renderInlineText(line)}
          </p>
        );
      })}
    </div>
  );
}