'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen,
  faCartShopping,
  faTruckFast,
  faRotateLeft,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

export default function NoOrders() {
  return (
    <div className="flex flex-col items-center px-6 pb-[60px] pt-[86px] text-center">
      <div className="relative mb-9 size-[190px]">
        <div className="absolute inset-0 rounded-full bg-green-50" />
        <div className="absolute inset-6 rounded-full bg-green-100/70" />
        <div className="absolute inset-0 flex items-center justify-center text-green-500">
          <FontAwesomeIcon icon={faBoxOpen} className="text-[54px]" />
        </div>

        <div className="absolute -left-[58px] top-0.5 flex animate-float items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3.5 py-2 text-[11.5px] font-bold shadow-[0_8px_22px_rgba(16,24,20,0.08)] max-[640px]:hidden">
          <span className="size-2 rounded-full bg-green-500" />
          Delivered
        </div>
        <div className="absolute -right-16 bottom-2 flex animate-float items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3.5 py-2 text-[11.5px] font-bold shadow-[0_8px_22px_rgba(16,24,20,0.08)] [animation-delay:1.2s] max-[640px]:hidden">
          <span className="size-2 rounded-full bg-amber-400" />
          On the way
        </div>
      </div>

      <h2 className="mb-2.5 text-[25px] font-extrabold tracking-tight">No orders yet</h2>
      <p className="mb-[30px] max-w-[400px] text-[14.5px] leading-relaxed text-gray-500">
        When you place an order, it&apos;ll show up here so you can track its status and reorder your favorites in a
        click.
      </p>

      <div className="mb-11 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-[11px] border border-green-500 bg-green-500 px-[26px] py-[13px] text-[13.5px] font-bold text-white shadow-[0_6px_16px_rgba(34,197,94,0.22)] transition-all hover:-translate-y-px hover:border-green-600 hover:bg-green-600"
        >
          <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
          Start shopping
        </Link>
        <Link
          href="/wishlist"
          className="rounded-[11px] border border-gray-200 bg-white px-[22px] py-[13px] text-[13.5px] font-semibold transition-all hover:border-green-500 hover:bg-green-50 hover:text-green-700"
        >
          View wishlist
        </Link>
      </div>

      <div className="grid w-full grid-cols-3 gap-4 border-t border-gray-100 pt-8 max-[640px]:grid-cols-1 max-[640px]:gap-[22px]">
        <div className="flex flex-col items-center gap-2.5 px-2.5 text-center">
          <div className="flex size-[42px] items-center justify-center rounded-xl bg-green-50 text-green-600">
            <FontAwesomeIcon icon={faTruckFast} className="text-base" />
          </div>
          <h4 className="text-[13px] font-bold">Fast delivery</h4>
          <p className="text-xs leading-relaxed text-gray-400">Most orders arrive in 2–4 days</p>
        </div>

        <div className="flex flex-col items-center gap-2.5 px-2.5 text-center">
          <div className="flex size-[42px] items-center justify-center rounded-xl bg-green-50 text-green-600">
            <FontAwesomeIcon icon={faRotateLeft} className="text-base" />
          </div>
          <h4 className="text-[13px] font-bold">Easy returns</h4>
          <p className="text-xs leading-relaxed text-gray-400">14-day hassle-free return policy</p>
        </div>

        <div className="flex flex-col items-center gap-2.5 px-2.5 text-center">
          <div className="flex size-[42px] items-center justify-center rounded-xl bg-green-50 text-green-600">
            <FontAwesomeIcon icon={faShieldHalved} className="text-base" />
          </div>
          <h4 className="text-[13px] font-bold">Secure checkout</h4>
          <p className="text-xs leading-relaxed text-gray-400">Your payment info stays protected</p>
        </div>
      </div>
    </div>
  );
}
