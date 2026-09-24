import { faFacebook, faFacebookF, faInstagram, faPinterest, faPinterestP, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


export default function Footer() {
  return <>
  <footer className="bg-white py-3 border-b mt-10 border-gray-400/80  px-10  ">
    <div className="container space-y-4 max-w-6xl mx-auto grid lg:grid-cols-5 md:grid-cols-2 gap-3">
      <section className="lg:col-span-2 space-y-3">
        <h1 className="font-bold text-xl"><span className="text-green-500">Fresh</span>Cart</h1>
        <p>FreshCart is your one-stop destination for fresh groceries<br/>
        orgainc produce, and househeld essentials delivered right to <br/>
        your doorstep
        </p>
        <div className="icons text-gray-500 space-x-2 *hover:text-gray-800 *:transition-all *:duration-200">
            <FontAwesomeIcon  icon={faFacebookF}/>
            <FontAwesomeIcon icon={faTwitter}/>
            <FontAwesomeIcon icon={faInstagram}/>
            <FontAwesomeIcon icon={faPinterestP}/>
        </div>

    </section>
    <section className="space-y-3">
      <h2 className="font-bold">Categories</h2>
      <ul className="text-gray-500 space-y-3 **:hover:text-gray-800 **:transition-all **:duration-200">
       <li> <Link  className='space-x-2' href={'/mensfashion'}>
          <span>Men's Fashion</span>
          </Link>
          </li>
       <li>  <Link className='space-x-2' href={'/womensfashion'}>
          <span>women's Fashion</span>
          </Link>
          </li>
       <li><Link className='space-x-2' href={'/baby'}>
          <span>Baby & Toys</span>
          </Link>
          </li>
       <li><Link className='space-x-2' href={'/beauty'}>
          <span>Beauty & Health</span>
          </Link>
          </li>
       <li> <Link className='space-x-2' href={'/electronics'}>
          <span>Electronics</span>
          </Link>
          </li>
      </ul>
    </section>
     <section className="space-y-3">
      <h2 className="font-bold">Quick Links</h2>
      <ul className="text-gray-500 space-y-3 *:hover:text-gray-800 *:transition-all *:duration-200 *:cursor-pointer">
       <li><Link href={'/aboutus'}>About Us</Link></li>
       <li><Link href={'/contactus'}>Contact Us</Link></li>
       <li><Link href={'/privacypolicy'}>Privacy Policy</Link></li>
       <li><Link href={'/termsofservice'}>Terms of Service</Link></li>
       <li><Link href={'/shippingpolicy'}>Shipping Policy</Link></li>
      </ul>
    </section>
     <section className="space-y-3">
      <h2 className="font-bold">Customer Service</h2>
      <ul className="text-gray-500 space-y-3 *:hover:text-gray-800 *:transition-all *:duration-200 *:cursor-pointer">
       <li><Link href={'/myaccount'}>My Account</Link></li>
       <li><Link href={'/orderhistory'}>Order History</Link></li>
       <li><Link href={'/wishlist'}>Wishlist</Link></li>
       <li><Link href={'/returnsfunds'}>Returns & Refunds</Link></li>
       <li><Link href={'/helpcenter'}>Help Center</Link></li>
      </ul>
    </section>
    </div>
    

  </footer>
   <div className="text-gray-500 max-w-6xl mx-auto py-5 ">
    <p>@ {new Date().getFullYear()} FreshCart. All rights reserved</p>
  </div>
 
  </>
}
