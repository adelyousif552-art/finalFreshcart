'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center px-6 pb-[90px] pt-20 text-center">
      <div className="relative mb-9 size-44">
        <div className="absolute inset-0 rounded-full bg-green-50" />
        <div className="absolute inset-[22px] rounded-full bg-green-100/70" />
        <div className="absolute inset-0 flex items-center justify-center text-green-500">
          <FontAwesomeIcon icon={faHeart} className="text-[56px]" />
        </div>

        <div className="absolute -left-14 top-1.5 flex animate-float items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3 py-2 text-[11.5px] font-semibold shadow-[0_8px_22px_rgba(16,24,20,0.08)] max-[520px]:hidden">
          <span className="size-[18px] rounded-[5px] bg-gradient-to-br from-stone-200 to-stone-400" />
          Saved
        </div>
        <div className="absolute -right-[58px] bottom-3.5 flex animate-float items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3 py-2 text-[11.5px] font-semibold shadow-[0_8px_22px_rgba(16,24,20,0.08)] [animation-delay:1.2s] max-[520px]:hidden">
          <span className="size-[18px] rounded-[5px] bg-gradient-to-br from-emerald-100 to-emerald-300" />
          For later
        </div>
      </div>

      <h2 className="mb-2.5 text-[26px] font-extrabold tracking-tight">Nothing saved yet</h2>
      <p className="mb-[30px] max-w-[390px] text-[15px] leading-relaxed text-gray-500">
        Tap the heart on any product to keep it here. Your wishlist stays with you across devices.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-[11px] border border-green-500 bg-green-500 px-6 py-3 text-[13.5px] font-semibold text-white shadow-[0_6px_16px_rgba(34,197,94,0.22)] transition-all hover:-translate-y-px hover:border-green-600 hover:bg-green-600"
        >
          Browse products
        </Link>
        <Link
          href="/"
          className="rounded-[11px] border border-gray-200 bg-white px-5 py-3 text-[13.5px] font-semibold transition-all hover:border-green-500 hover:bg-green-50 hover:text-green-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
