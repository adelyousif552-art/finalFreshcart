import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto w-full flex flex-col items-center text-center py-24 px-6">
      <p className="text-7xl font-extrabold text-green-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-500 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn text-white">Back to home</Link>
        <Link href="/shop" className="btn bg-white border border-gray-300">Continue shopping</Link>
      </div>
    </section>
  )
}