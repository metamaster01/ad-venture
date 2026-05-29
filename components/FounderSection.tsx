// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";

// const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// export default function FounderSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const bottomInView = useInView(bottomRef, { once: true, margin: "-60px" });

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });
//   const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

//   return (
//     <section ref={sectionRef} id="studio" className="relative bg-black">
//       <div className="relative" style={{ paddingBottom: "140px" }}>
//         <motion.div
//           className="relative mx-6 md:mx-10 lg:mx-14 overflow-visible"
//           style={{
//             background: "linear-gradient(135deg,#F5C518 0%,#D4A017 100%)",
//             height: "540px",
//           }}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: EASE }}
//         >
     
//           <motion.h2
//             className="font-impact text-black uppercase absolute"
//             style={{
//               fontSize: "clamp(1.8rem,3.8vw,3.8rem)",
//               top: "28px",
//               left: "28px",
//               lineHeight: 1,
//               zIndex: 10,
//             }}
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
//           >
//             Meet the Founder
//           </motion.h2>

//           <motion.div
//             className="absolute left-0 flex items-center gap-3 px-5 md:px-7"
//             style={{
//               top: "138px",
//               right: "32%",
//               background: "rgba(12,12,12,0.93)",
//               height: "58px",
//               zIndex: 20,
//             }}
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
//           >
//             <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
//               <Image
//                 src="/founder-1.png"
//                 alt=""
//                 fill
//                 className="object-cover object-top"
//               />
//             </div>
//             <span
//               className="font-impact text-white uppercase tracking-[0.06em] flex-shrink-0"
//               style={{ fontSize: "clamp(0.9rem,1.8vw,1.35rem)" }}
//             >
//               John Anderson
//             </span>
//             <span
//               className="text-[#F5C518] font-bold flex-shrink-0 hidden sm:block"
//               style={{ fontFamily: "Inter,sans-serif", fontSize: "12px" }}
//             >
//               Founder &amp; Creative Director
//             </span>
//             <span
//               className="text-[#777] hidden lg:block flex-shrink-0"
//               style={{ fontFamily: "Inter,sans-serif", fontSize: "11px" }}
//             >
//               (Built on Trust Since 2013)
//             </span>
//           </motion.div>

  
//           {/* <motion.div
//             className="absolute overflow-hidden"
//             style={{ right: 0, top: '-55px', width: 'clamp(220px,28vw,320px)', height: 'clamp(240px,33vw,340px)', zIndex: 15 }}
//             initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
//           >
//             <Image src="/founder-2.png" alt="Co-founder" fill className="object-cover object-center" sizes="20vw" />
//             <div className="absolute inset-x-0 bottom-0 h-12"
//               style={{ background: 'linear-gradient(to top,#D4A017,transparent)' }} />
//           </motion.div> */}

//           {/* FOUNDER 1 — man, left, overflows below */}
//           {/* <motion.div
//             className="absolute overflow-hidden"
//             style={{ left: 'clamp(20px,3.5vw,52px)', top: '70px', width: 'clamp(155px,19vw,250px)', height: 'clamp(310px,43vw,490px)', zIndex: 30 }}
//             initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
//           >
//             <motion.div className="absolute inset-0 z-10 origin-bottom" style={{ background: '#F5C518' }}
//               initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true }}
//               transition={{ duration: 0.9, delay: 0.55, ease: [0.76,0,0.24,1] as [number,number,number,number] }} />
//             <Image src="/founder-1.png" alt="John Anderson — Founder & Creative Director"
//               fill className="object-cover object-top" sizes="20vw" />
//           </motion.div> */}

//           <motion.div
//             className="absolute overflow-hidden"
//             style={{
//               right: "clamp(20px,3.5vw,52px)",
//               top: "-55px",
//               width: "clamp(220px,28vw,320px)",
//               height: "clamp(240px,33vw,340px)",
//               zIndex: 15,
//             }}
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
//           >
//             <Image
//               src="/founder-1.png"
//               alt="John Anderson — Founder & Creative Director"
//               fill
//               className="object-cover object-center"
//               sizes="21vw"
//             />
//             <div
//               className="absolute inset-x-0 bottom-0 h-12"
//               style={{
//                 background: "linear-gradient(to top,#D4A017,transparent)",
//               }}
//             />
//           </motion.div>


//           <motion.div
//             className="absolute overflow-hidden"
//             style={{
//               left: "clamp(20px,3.5vw,52px)",
//               bottom: "-70px",
//               width: "clamp(220px,28vw,320px)",
//               height: "clamp(260px,36vw,420px)",
//               zIndex: 30,
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
//           >
//             <motion.div
//               className="absolute inset-0 z-10 origin-bottom"
//               style={{ background: "#F5C518" }}
//               initial={{ scaleY: 1 }}
//               whileInView={{ scaleY: 0 }}
//               viewport={{ once: true }}
//               transition={{
//                 duration: 0.9,
//                 delay: 0.55,
//                 ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
//               }}
//             />
//             <Image
//               src="/founder-2.png"
//               alt="Jane Doe — Co-founder & CEO"
//               fill
//               className="object-cover object-top"
//               sizes="16vw"
//             />
//           </motion.div>

         
//           <motion.div
//             className="absolute bottom-0 right-0 flex items-center gap-3 px-5 md:px-7"
//             style={{
//               left: "28%",
//               background: "rgba(12,12,12,0.93)",
//               height: "65px",
//               zIndex: 20,
//             }}
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
//           >
//             <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
//               <Image
//                 src="/founder-2.png"
//                 alt=""
//                 fill
//                 className="object-cover object-top"
//               />
//             </div>
//             <div className="flex flex-col justify-center">
//               <span
//                 className="font-impact text-white uppercase tracking-[0.06em] leading-none"
//                 style={{ fontSize: "clamp(0.85rem,1.5vw,1.2rem)" }}
//               >
//                 Jane Doe
//               </span>
//               <div className="flex items-center gap-2 mt-[3px] flex-wrap">
//                 <span
//                   className="text-[#F5C518] font-bold"
//                   style={{ fontFamily: "Inter,sans-serif", fontSize: "11px" }}
//                 >
//                   Co-founder &amp; CEO
//                 </span>
//                 <span
//                   className="text-[#666] hidden sm:block"
//                   style={{ fontFamily: "Inter,sans-serif", fontSize: "10px" }}
//                 >
//                   (Built on Trust Since 2003)
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* BOTTOM — bg + quote + bio */}
//       <div ref={bottomRef} className="relative overflow-hidden">
//         <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
//           <Image
//             src="/founder-bg.png"
//             alt=""
//             fill
//             className="object-cover object-center"
//             aria-hidden="true"
//           />
//           <div
//             className="absolute inset-0"
//             style={{ background: "rgba(0,0,0,0.94)" }}
//           />
//         </motion.div>

//         <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-10 py-12 md:py-16 text-center">
//           <motion.p
//             className="font-impact text-white leading-[1.3] uppercase mb-8"
//             style={{ fontSize: "clamp(1.1rem,2.2vw,1.75rem)" }}
//             initial={{ opacity: 0, y: 24 }}
//             animate={bottomInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
//           >
//             &ldquo;At AD Venture Media, we believe great content is more than
//             visuals &mdash; it&apos;s about emotion, strategy, and impact. Our
//             goal is to help brands grow through meaningful storytelling and
//             modern digital experiences.&rdquo;
//           </motion.p>

//           <motion.p
//             className="font-impact text-white leading-[1.45] uppercase"
//             style={{ fontSize: "clamp(0.9rem,1.5vw,1.25rem)" }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={bottomInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
//           >
//             Started with a passion for creativity and media innovation, John
//             built AD Venture Media to help businesses stand out in the
//             fast-moving digital world. From branding and social campaigns to
//             content production and creative strategy, the vision has always been
//             simple &mdash; create work that people remember.
//           </motion.p>
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const bottomInView = useInView(bottomRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={sectionRef} id="founders" className="relative bg-black">

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (sm: and above — identical to your original)
          HIDDEN on mobile via  hidden sm:block
         ══════════════════════════════════════════════════════════ */}
      <div className="hidden sm:block relative" style={{ zIndex: 1, paddingBottom: "140px" }}>
        <motion.div
          className="relative mx-6 md:mx-10 lg:mx-14 overflow-visible"
          style={{
            background: "linear-gradient(135deg,#F5C518 0%,#D4A017 100%)",
            height: "540px",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Heading */}
          <motion.h2
            className="font-impact text-black uppercase absolute"
            style={{ fontSize: "clamp(1.8rem,3.8vw,3.8rem)", top: "28px", left: "28px", lineHeight: 1, zIndex: 10 }}
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Meet the Founder
          </motion.h2>

          {/* Name bar — founder-1 top */}
          <motion.div
            className="absolute left-0 flex items-center gap-3 px-5 md:px-7"
            style={{ top: "138px", right: "32%", background: "rgba(12,12,12,0.93)", height: "58px", zIndex: 20 }}
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
              <Image src="/founder-1.png" alt="" fill className="object-cover object-top" />
            </div>
            <span className="font-impact text-white uppercase tracking-[0.16em] flex-shrink-0" style={{ fontSize: "clamp(0.9rem,1.8vw,1.35rem)" }}>
              Ms. Trippti Anand
            </span>
            <span className="text-[#F5C518] font-bold flex-shrink-0 hidden sm:block" style={{ fontFamily: "Inter,sans-serif", fontSize: "12px" }}>
              Founder &amp; Director
            </span>
          </motion.div>

          {/* Founder-1 photo — top right */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ right: "clamp(20px,3.5vw,52px)", top: "-40px", width: "clamp(240px,28vw,390px)", height: "clamp(240px,33vw,340px)", zIndex: 15 }}
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          >
            <Image src="/founder-1.png" alt="Ms. Trippti Anand — Founder & Director" fill className="object-cover object-center" sizes="21vw" />
            <div className="absolute inset-x-0 bottom-0 h-12" style={{ background: "linear-gradient(to top,#D4A017,transparent)" }} />
          </motion.div>

          {/* Founder-2 photo — left tall overflow */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ left: "clamp(14px,3.5vw,24px)", bottom: "-70px", width: "clamp(220px,28vw,380px)", height: "clamp(260px,36vw,420px)", zIndex: 30 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0 z-10 origin-bottom" style={{ background: "#F5C518" }}
              initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }}
            />
            <Image src="/founder-2.png" alt="Mr. Prem Dhiraal — Founder & Director" fill className="object-cover object-top" sizes="16vw" />
          </motion.div>

          {/* Name bar — founder-2 bottom */}
          <motion.div
            className="absolute bottom-0 right-0 flex items-center gap-3 px-5 md:px-7"
            style={{ left: "28%", background: "rgba(12,12,12,0.93)", height: "65px", zIndex: 20 }}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
              <Image src="/founder-2.png" alt="" fill className="object-cover object-top" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-impact text-white uppercase tracking-[0.16em] leading-none" style={{ fontSize: "clamp(0.85rem,1.5vw,1.2rem)" }}>
                Mr. Prem Dhiraal
              </span>
              <div className="flex items-center gap-2 mt-[3px] flex-wrap">
                <span className="text-[#F5C518] font-bold" style={{ fontFamily: "Inter,sans-serif", fontSize: "11px" }}>
                  Founder &amp; Director
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT  (below sm — completely separate, clean design)
          HIDDEN on desktop via  sm:hidden
         ══════════════════════════════════════════════════════════ */}
      <div className="sm:hidden relative" style={{ zIndex: 1 }}>

        {/* Gold card */}
        <motion.div
          className="relative mx-0 overflow-visible"
          style={{
            background: "linear-gradient(135deg,#F5C518 0%,#D4A017 100%)",
            height: "320px",
          }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Heading */}
          <motion.h2
            className="font-impact text-black uppercase absolute"
            style={{ fontSize: "1.75rem", top: "20px", left: "16px", lineHeight: 1, zIndex: 10 }}
            initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Meet the<br />Founder
          </motion.h2>

          {/* Founder-1 photo — top right, small, doesn't overlap heading */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ right: 0, top: "-24px", width: "190px", height: "170px", zIndex: 15 }}
            initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          >
            <Image src="/founder-1.png" alt="Ms. Trippti Anand" fill className="object-cover object-center" sizes="130px" />
            <div className="absolute inset-x-0 bottom-0 h-8" style={{ background: "linear-gradient(to top,#D4A017,transparent)" }} />
          </motion.div>

          {/* Name bar — founder-1: full width strip below heading */}
          <motion.div
            className="absolute left-0 right-0 flex items-center gap-2 px-3"
            style={{ top: "155px", background: "rgba(12,12,12,0.93)", height: "46px", zIndex: 20 }}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            <div className="relative w-7 h-7 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
              <Image src="/founder-1.png" alt="" fill className="object-cover object-top" />
            </div>
            <span className="font-impact text-white tracking-[0.16em] flex-shrink-0" style={{ fontSize: "0.85rem" }}>
              Ms. Trippti Anand
            </span>
            <span className="text-[#F5C518] font-bold flex-shrink-0" style={{ fontFamily: "Inter,sans-serif", fontSize: "10px" }}>
              Founder &amp; Director
            </span>
          </motion.div>

          {/* Founder-2 photo — left, overflows below */}
          <motion.div
            className="absolute overflow-hidden"
            style={{ left: 0, bottom: "-50px", width: "180px", height: "180px", zIndex: 30 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0 z-10 origin-bottom" style={{ background: "#F5C518" }}
              initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }}
            />
            <Image src="/founder-2.png" alt="Mr. Prem Dhiraal" fill className="object-cover object-top" sizes="130px" />
          </motion.div>

          {/* Name bar — founder-2: bottom right strip */}
          <motion.div
            className="absolute bottom-0 right-0 flex items-center gap-2 px-3"
            style={{ left: "158px", background: "rgba(12,12,12,0.93)", height: "56px", zIndex: 20 }}
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden rounded-sm border border-white/20">
              <Image src="/founder-2.png" alt="" fill className="object-cover object-top" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-impact text-white uppercase tracking-[0.16em] leading-none" style={{ fontSize: "0.85rem" }}>
                Mr. Prem Dhiraal
              </span>
              <span className="text-[#F5C518] font-bold mt-[2px]" style={{ fontFamily: "Inter,sans-serif", fontSize: "10px" }}>
                Founder &amp; Director
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Spacer so founder-2 overflow photo has room before bottom section */}
        <div style={{ height: "60px" }} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM — bg + vision text  (shared, both mobile & desktop)
         ══════════════════════════════════════════════════════════ */}
      <div ref={bottomRef} className="relative overflow-hidden" style={{ zIndex: 2 }}>
        <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
          <Image src="/founder-bg.png" alt="" fill className="object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.97)" }} />
        </motion.div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-10 py-12 md:py-20 text-center">

          {/* Vision label */}
          <motion.p
            className="font-impact text-[#F5C518] uppercase tracking-widest mb-4"
            style={{ fontSize: "clamp(0.75rem,1.2vw,0.95rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            Our Vision
          </motion.p>

          {/* Vision headline */}
          <motion.p
            className="font-impact text-white uppercase leading-[1.25] mb-6 tracking-widest"
            style={{ fontSize: "clamp(1.1rem,2.2vw,1.75rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          >
            To redefine the future of advertising through cinematic storytelling,
            futuristic technology &amp; emotionally powerful visuals.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mx-auto mb-6"
            style={{ width: 48, height: 2, background: "#F5C518" }}
            initial={{ scaleX: 0 }}
            animate={bottomInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          />

          {/* Vision body */}
          <motion.p
            className="font-impact text-white uppercase leading-[1.45] tracking-wider"
            style={{ fontSize: "clamp(0.85rem,1.4vw,1.15rem)", color: "rgba(255,255,255,0.82)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={bottomInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
          >
            Our vision is to build a creative universe where brands are not
            promoted like products &mdash; but presented like experiences.
            We aspire to become a global creative powerhouse that merges
            entertainment, AI, innovation and storytelling into one
            unforgettable identity.
          </motion.p>

        </div>
      </div>

    </section>
  );
}