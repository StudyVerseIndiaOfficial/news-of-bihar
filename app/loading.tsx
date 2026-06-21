export default function Loading() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-6">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center">
        <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-red-100 bg-white/90 p-6 text-center shadow-2xl backdrop-blur">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-200/50 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-orange-200/60 blur-3xl" />

          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-gradient-to-br from-red-950 via-red-800 to-orange-500 shadow-xl">
            <div className="absolute inset-0 animate-ping rounded-[1.7rem] bg-red-700/25" />
            <span className="relative text-lg font-black tracking-tight text-white">
              NOB
            </span>
          </div>

          <h1 className="relative text-3xl font-black leading-tight text-red-950">
            News of Bihar
          </h1>

          <p className="relative mt-2 text-sm font-bold leading-6 text-gray-600">
            बिहार की जरूरी खबरें loading हो रही हैं...
          </p>

          <div className="relative mx-auto mt-6 h-3 w-full max-w-sm overflow-hidden rounded-full bg-red-100">
            <div className="h-full w-1/2 animate-[loadingBar_1.3s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-red-900 via-red-600 to-orange-500" />
          </div>

          <div className="relative mt-5 flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-red-800" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-600 [animation-delay:120ms]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-yellow-500 [animation-delay:240ms]" />
          </div>
        </div>

        <div className="mt-8 grid w-full gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-[1.7rem] border border-red-100 bg-white p-4 shadow-md"
            >
              <div className="mb-4 h-32 animate-pulse rounded-[1.3rem] bg-gradient-to-r from-red-100 via-orange-50 to-red-100" />

              <div className="mb-3 h-4 w-24 animate-pulse rounded-full bg-red-100" />

              <div className="mb-2 h-5 w-full animate-pulse rounded-full bg-gray-200" />
              <div className="mb-4 h-5 w-4/5 animate-pulse rounded-full bg-gray-200" />

              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded-full bg-gray-100" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-gray-100" />
                <div className="h-3 w-3/5 animate-pulse rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes loadingBar {
            0% {
              transform: translateX(-120%);
            }
            50% {
              transform: translateX(80%);
            }
            100% {
              transform: translateX(220%);
            }
          }
        `}</style>
      </div>
    </main>
  );
}