import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-200 via-purple-100 to-pink-100">
      <div className="container px-4 py-8 text-center sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl">
            Share Your Faith Journey
          </h1>

          <p className="mx-auto max-w-2xl px-4 text-base text-gray-600 sm:px-0 sm:text-lg">
            Join us in a quick survey about faith and the Bible. It&apos;s
            completely anonymous and helps us understand young people&apos;s
            perspectives better.
          </p>

          <div className="flex flex-col items-center gap-4 px-4 sm:px-0">
            <Link
              href="/survey"
              className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg active:scale-[0.98] sm:w-auto sm:px-8 sm:text-lg"
            >
              Start Survey
            </Link>

            <p className="text-sm text-gray-500">Quick 5-10 minute survey</p>
          </div>

          <div className="mx-4 mt-8 rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-xl sm:mx-0 sm:mt-12 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold text-purple-600 sm:mb-4 sm:text-xl">
              Be Yourself!
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              There are no right or wrong answers - we value your honest
              thoughts and real experiences. Your unique perspective matters to
              us.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
