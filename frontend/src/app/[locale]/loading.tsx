export default function Loading() {
  return (
    <div className="container-page py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-64 rounded-lg bg-ink-100" />
        <div className="h-4 w-96 rounded bg-ink-100" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-ink-100 bg-white overflow-hidden">
              <div className="aspect-[16/10] bg-ink-100" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-ink-100" />
                <div className="h-4 w-1/2 rounded bg-ink-100" />
                <div className="h-10 w-full rounded bg-ink-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}