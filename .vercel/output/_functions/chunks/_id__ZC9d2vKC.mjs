import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as addAttribute, E as renderHead, M as createComponent, O as defineScriptVars, S as renderTemplate, T as maybeRenderHead, b as renderComponent, j as createAstro, v as renderScript, x as renderSlot } from "./render_BLk4hTKR.mjs";
import { t as keystatic_config_default } from "./keystatic.config_BqjxRUY3.mjs";
import "./compiler_zGY2KDy3.mjs";
import { n as formatRupiah, t as calculateDetailedRAB } from "./rab-formula_CNIPtC-K.mjs";
import { t as supabaseFetch } from "./supabase_CMHH-ulj.mjs";
/* empty css                 */
import React, { useState } from "react";
import { createReader } from "@keystatic/core/reader";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Calculator, ChevronUp, FileText, MapPin, Phone, Plus, Share2, ShoppingBag, Sliders, Trash2, User, X } from "lucide-react";
//#region src/components/Navbar.astro
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header id="siteNav" class="fixed top-[6px] left-0 right-0 z-50 h-[54px] border-b border-transparent bg-transparent backdrop-blur-[2px] transition-all duration-300 [&amp;.solid]:bg-bg-primary [&amp;.solid]:border-stone-300/40 [&amp;.solid]:backdrop-blur-none"><div class="h-full flex items-center justify-between px-[6vw]"><!-- Logo --><a href="/" class="flex items-center gap-1 group"><span class="font-serif font-normal text-lg tracking-wider text-text-primary group-hover:text-accent transition-colors duration-200">CREATIVA<span class="font-sans font-light text-[10px] tracking-widest text-text-secondary ml-1.5">STUDIO</span></span></a><nav class="hidden md:flex items-center gap-8 font-sans text-[11px] font-semibold tracking-widest uppercase text-text-primary"><a href="/" class="hover:text-accent transition-colors duration-200">HOME</a><a href="/portofolio" class="hover:text-accent transition-colors duration-200">PORTOFOLIO</a><a href="/layanan" class="hover:text-accent transition-colors duration-200">LAYANAN</a><a href="/tentang" class="hover:text-accent transition-colors duration-200">TENTANG KAMI</a><a href="/kontak" class="hover:text-accent transition-colors duration-200">KONTAK</a></nav><div class="flex items-center gap-3 sm:mr-14"><button id="theme-toggle" class="hidden h-8 px-3 border border-stone-300 hover:border-accent hover:bg-stone-900 hover:text-stone-100 dark:hover:bg-accent transition-all duration-200 cursor-pointer text-text-primary font-sans text-[10px] tracking-wider uppercase font-medium" aria-label="Toggle theme"><span id="theme-toggle-text">THEME</span></button><a href="/kalkulator-rab" class="hidden sm:inline-flex items-center h-8 px-4 bg-stone-900 hover:bg-accent text-stone-100 transition-all duration-250 font-sans text-[10px] font-semibold tracking-wider">ESTIMASI RAB</a><button id="mobile-menu-toggle" class="md:hidden h-8 w-8 flex items-center justify-center border border-stone-300 hover:border-accent hover:bg-stone-900 hover:text-stone-100 transition-colors duration-200 cursor-pointer text-text-primary" aria-label="Open menu"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path id="hamburger-icon" class="block" d="M4 6h16M4 12h16M4 18h16"></path><path id="close-icon" class="hidden" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div id="mobile-menu" class="hidden md:hidden border-b border-stone-300/40 bg-bg-primary flex-col font-sans text-xs font-semibold tracking-widest uppercase"><a href="/" class="px-[6vw] py-4 border-b border-stone-200/50 hover:bg-stone-100/30 text-text-primary transition-colors duration-200">HOME</a><a href="/portofolio" class="px-[6vw] py-4 border-b border-stone-200/50 hover:bg-stone-100/30 text-text-primary transition-colors duration-200">PORTOFOLIO</a><a href="/layanan" class="px-[6vw] py-4 border-b border-stone-200/50 hover:bg-stone-100/30 text-text-primary transition-colors duration-200">LAYANAN</a><a href="/tentang" class="px-[6vw] py-4 border-b border-stone-200/50 hover:bg-stone-100/30 text-text-primary transition-colors duration-200">TENTANG KAMI</a><a href="/kontak" class="px-[6vw] py-4 hover:bg-stone-100/30 text-text-primary transition-colors duration-200">KONTAK</a><div class="p-4 border-t border-stone-200/50 bg-[#FAF9F6]"><a href="/kalkulator-rab" class="w-full text-center block py-3 bg-stone-900 hover:bg-accent text-stone-100 font-sans text-xs font-semibold tracking-wider">MULAI ESTIMASI RAB</a></div></div></header><script>
  // Elements
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleText = document.getElementById('theme-toggle-text');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  // Initialize Theme UI
  function updateThemeUI() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (themeToggleText) {
      themeToggleText.textContent = isDark ? 'LIGHT' : 'DARK';
    }
  }

  updateThemeUI();

  // Toggle Theme
  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeUI();
  });

  // Mobile Menu Toggle
  mobileMenuToggle?.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
<\/script>`;
}, "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/components/Navbar.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const siteSettings = await createReader(process.cwd(), keystatic_config_default).singletons.siteSettings.read();
	const brandName = siteSettings?.brandName || "Creativa Studio";
	const description = siteSettings?.description || "Creativa Studio adalah perusahaan jasa arsitektur & kontraktor premium satu pintu. Kami merancang, merencanakan, dan membangun residensial serta komersial dengan standar estetika tinggi.";
	const email = siteSettings?.email || "info@creativastudio.com";
	const whatsapp = siteSettings?.whatsapp || "628123456789";
	const address = siteSettings?.address || "Jl. Kayu Manis No. 88, Blok Jati, Kebayoran Baru, Jakarta Selatan";
	const instagram = siteSettings?.instagram || "https://instagram.com/creativastudio";
	const formattedPhone = whatsapp.startsWith("62") ? `+${whatsapp.slice(0, 2)} ${whatsapp.slice(2, 5)} ${whatsapp.slice(5, 9)} ${whatsapp.slice(9)}` : whatsapp;
	return renderTemplate`${maybeRenderHead($$result)}<div class="w-full relative overflow-hidden bg-[#FAF9F6] pt-12" data-astro-cid-jo6i4kqk><!-- ===== Skyline Silhouette Top Border ===== --><div class="w-full block relative leading-[0] z-10 translate-y-[2px]" data-astro-cid-jo6i4kqk><svg viewBox="0 0 1200 100" class="w-full h-[50px] sm:h-[75px] md:h-[100px] preserve-aspect-none" fill="#1C1A17" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" data-astro-cid-jo6i4kqk><!-- High fidelity building skyline silhouette --><path d="M0,100 L0,50 L15,50 L15,70 L25,70 L25,45 L40,45 L40,80 L55,80 L55,30 L70,30 L70,90 L85,90 L85,40 L105,40 L105,65 L115,65 L115,20 L135,20 L135,75 L150,75 L150,55 L165,55 L165,35 L180,35 L180,85 L195,85 L195,45 L215,45 L215,60 L230,60 L230,25 L255,25 L255,80 L270,80 L270,50 L290,50 L290,70 L305,70 L305,30 L320,30 L320,85 L335,85 L335,40 L350,40 L350,65 L365,65 L365,15 L390,15 L390,75 L405,75 L405,50 L420,50 L420,35 L435,35 L435,80 L450,80 L450,45 L470,45 L470,60 L485,60 L485,25 L510,25 L510,80 L525,80 L525,50 L545,50 L545,70 L560,70 L560,30 L575,30 L575,85 L590,85 L590,40 L605,40 L605,65 L620,65 L620,15 L645,15 L645,75 L660,75 L660,50 L675,50 L675,35 L690,35 L690,80 L705,80 L705,45 L725,45 L725,60 L740,60 L740,25 L765,25 L765,80 L780,80 L780,50 L800,50 L800,70 L815,70 L815,30 L830,30 L830,85 L845,85 L845,40 L860,40 L860,65 L875,65 L875,15 L900,15 L900,75 L915,75 L915,50 L930,50 L930,35 L945,35 L945,80 L960,80 L960,45 L980,45 L980,60 L995,60 L995,25 L1020,25 L1020,80 L1035,80 L1035,50 L1055,50 L1055,70 L1070,70 L1070,30 L1085,30 L1085,85 L1100,85 L1100,40 L1115,40 L1115,65 L1130,65 L1130,15 L1155,15 L1155,75 L1170,75 L1170,50 L1185,50 L1185,35 L1200,35 L1200,100 Z" data-astro-cid-jo6i4kqk></path></svg></div><!-- ===== Footer Main Dark Container ===== --><footer class="bg-[#1C1A17] text-stone-300 pt-16 pb-12 px-[6vw] relative z-20" data-astro-cid-jo6i4kqk><div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8" data-astro-cid-jo6i4kqk><!-- Col 1: About Us --><div class="lg:col-span-3 space-y-4" data-astro-cid-jo6i4kqk><h3 class="font-serif text-[13px] tracking-[0.2em] text-white uppercase font-semibold pb-1 border-b border-stone-850" data-astro-cid-jo6i4kqk>ABOUT US</h3><p class="font-sans text-[12px] text-stone-400 leading-relaxed font-light" data-astro-cid-jo6i4kqk>${description}</p></div><!-- Col 2: Address --><div class="lg:col-span-3 space-y-4" data-astro-cid-jo6i4kqk><h3 class="font-serif text-[13px] tracking-[0.2em] text-white uppercase font-semibold pb-1 border-b border-stone-850" data-astro-cid-jo6i4kqk>ADDRESS</h3><div class="space-y-3 font-sans text-[12px] text-stone-400" data-astro-cid-jo6i4kqk><p class="flex items-start gap-2.5" data-astro-cid-jo6i4kqk><span class="text-accent mt-0.5" data-astro-cid-jo6i4kqk>📍</span><span class="leading-relaxed" data-astro-cid-jo6i4kqk>${address}</span></p><p class="flex items-center gap-2.5" data-astro-cid-jo6i4kqk><span class="text-accent" data-astro-cid-jo6i4kqk>📞</span><a${addAttribute(`https://wa.me/${whatsapp}`, "href")} target="_blank" class="hover:text-white transition-colors duration-300" data-astro-cid-jo6i4kqk>${formattedPhone}</a></p><p class="flex items-center gap-2.5" data-astro-cid-jo6i4kqk><span class="text-accent" data-astro-cid-jo6i4kqk>✉️</span><a${addAttribute(`mailto:${email}`, "href")} class="hover:text-white transition-colors duration-300" data-astro-cid-jo6i4kqk>${email}</a></p></div></div><!-- Col 3: Company (Links) --><div class="lg:col-span-3 space-y-4" data-astro-cid-jo6i4kqk><h3 class="font-serif text-[13px] tracking-[0.2em] text-white uppercase font-semibold pb-1 border-b border-stone-850" data-astro-cid-jo6i4kqk>COMPANY</h3><ul class="space-y-2.5 font-sans text-[12px] text-stone-400" data-astro-cid-jo6i4kqk><li data-astro-cid-jo6i4kqk><a href="/" class="hover:text-white transition-colors duration-300 flex items-center gap-1.5" data-astro-cid-jo6i4kqk><span class="text-[9px] text-stone-600 font-bold font-mono" data-astro-cid-jo6i4kqk>></span> Beranda</a></li><li data-astro-cid-jo6i4kqk><a href="/layanan" class="hover:text-white transition-colors duration-300 flex items-center gap-1.5" data-astro-cid-jo6i4kqk><span class="text-[9px] text-stone-600 font-bold font-mono" data-astro-cid-jo6i4kqk>></span> Layanan</a></li><li data-astro-cid-jo6i4kqk><a href="/portofolio" class="hover:text-white transition-colors duration-300 flex items-center gap-1.5" data-astro-cid-jo6i4kqk><span class="text-[9px] text-stone-600 font-bold font-mono" data-astro-cid-jo6i4kqk>></span> Portofolio</a></li><li data-astro-cid-jo6i4kqk><a href="/tentang" class="hover:text-white transition-colors duration-300 flex items-center gap-1.5" data-astro-cid-jo6i4kqk><span class="text-[9px] text-stone-600 font-bold font-mono" data-astro-cid-jo6i4kqk>></span> Tentang Kami</a></li><li data-astro-cid-jo6i4kqk><a href="/kontak" class="hover:text-white transition-colors duration-300 flex items-center gap-1.5" data-astro-cid-jo6i4kqk><span class="text-[9px] text-stone-600 font-bold font-mono" data-astro-cid-jo6i4kqk>></span> Kontak</a></li></ul></div><!-- Col 4: Newsletter --><div class="lg:col-span-3 space-y-4" data-astro-cid-jo6i4kqk><h3 class="font-serif text-[13px] tracking-[0.2em] text-white uppercase font-semibold pb-1 border-b border-stone-850" data-astro-cid-jo6i4kqk>KONSULTASI</h3><p class="font-sans text-[12px] text-stone-400 leading-relaxed font-light" data-astro-cid-jo6i4kqk>Kirim pertanyaan atau diskusikan rancangan Anda langsung via WhatsApp ke tim desainer kami.</p><!-- Input field styled like the image reference --><form id="footer-quick-wa" class="flex items-center w-full bg-[#292723] border border-stone-700/60 p-1 group focus-within:border-accent transition-colors duration-300" data-astro-cid-jo6i4kqk><input type="text" id="footer-msg" placeholder="Tulis pesan cepat..." required class="w-full bg-transparent px-3 py-2 text-stone-200 text-[12px] focus:outline-none placeholder-stone-500 font-sans" data-astro-cid-jo6i4kqk><button type="submit" aria-label="Kirim via WhatsApp" class="bg-stone-800 hover:bg-accent text-white p-2.5 transition-colors duration-300 flex items-center justify-center shrink-0 cursor-pointer" data-astro-cid-jo6i4kqk><svg class="w-3.5 h-3.5 transform rotate-45" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-astro-cid-jo6i4kqk><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-astro-cid-jo6i4kqk></path></svg></button></form></div></div><!-- ===== Bottom Section: Separator, Logo & Copyright ===== --><div class="mt-16 pt-8 border-t border-stone-800 relative" data-astro-cid-jo6i4kqk><!-- Separator Line with Social Icons in the Center --><div class="absolute -top-[19px] left-0 w-full flex items-center justify-center pointer-events-none" data-astro-cid-jo6i4kqk><div class="w-[30%] sm:w-[40%] h-[1px] bg-stone-800" data-astro-cid-jo6i4kqk></div><div class="flex items-center gap-3.5 px-6 pointer-events-auto bg-[#1C1A17]" data-astro-cid-jo6i4kqk><a${addAttribute(instagram, "href")} target="_blank" rel="noopener" aria-label="Instagram" class="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white transition-all duration-300" data-astro-cid-jo6i4kqk><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-jo6i4kqk><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-astro-cid-jo6i4kqk></path></svg></a><a${addAttribute(`https://wa.me/${whatsapp}`, "href")} target="_blank" rel="noopener" aria-label="WhatsApp" class="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-white transition-all duration-300" data-astro-cid-jo6i4kqk><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-jo6i4kqk><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" data-astro-cid-jo6i4kqk></path></svg></a></div><div class="w-[30%] sm:w-[40%] h-[1px] bg-stone-800" data-astro-cid-jo6i4kqk></div></div><!-- Real Estate Icon Logo and Name --><div class="flex flex-col items-center justify-center space-y-3 mt-6" data-astro-cid-jo6i4kqk><!-- Minimalist Architect Logo (Skyline/Building Block) --><svg class="w-10 h-10 text-stone-500 hover:text-accent transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jo6i4kqk><rect x="25" y="55" width="20" height="25" fill="currentColor" opacity="0.3" data-astro-cid-jo6i4kqk></rect><rect x="40" y="35" width="20" height="45" fill="currentColor" opacity="0.6" data-astro-cid-jo6i4kqk></rect><rect x="55" y="45" width="20" height="35" fill="currentColor" opacity="0.45" data-astro-cid-jo6i4kqk></rect><path d="M20 80 H80" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-jo6i4kqk></path></svg><span class="font-serif text-[15px] font-normal tracking-[0.25em] text-white uppercase" data-astro-cid-jo6i4kqk>CREATIVA <span class="italic text-accent" data-astro-cid-jo6i4kqk>STUDIO</span></span></div><!-- Copyright text --><p class="font-sans text-[10px] text-stone-600 uppercase tracking-[0.2em] text-center mt-6" data-astro-cid-jo6i4kqk>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${brandName}. ALL RIGHTS RESERVED. A PRODUCT OF CREATIVASTUDIO.COM</p></div></footer></div><script>(function(){${defineScriptVars({ whatsappNumber: whatsapp })}
  const form = document.getElementById('footer-quick-wa');
  const input = document.getElementById('footer-msg');
  
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawMsg = input.value;
      
      // Validasi pesan kosong atau hanya whitespace
      if (!rawMsg || !rawMsg.trim()) {
        // Tambahkan efek getar dan border merah
        form.classList.remove('border-stone-700/60', 'focus-within:border-accent');
        form.classList.add('border-red-500', 'ring-1', 'ring-red-500', 'animate-shake');
        
        // Hapus kelas getar setelah animasi selesai agar bisa di-trigger ulang
        setTimeout(() => {
          form.classList.remove('animate-shake');
        }, 500);
        
        // Fokuskan kembali ke input
        input.focus();
        return;
      }
      
      // Bersihkan style error saat submit berhasil
      form.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
      form.classList.add('border-stone-700/60', 'focus-within:border-accent');
      
      const formatted = \`Halo Creativa Studio,\\n\\n\${rawMsg.trim()}\`;
      const waUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(formatted)}\`;
      window.open(waUrl, '_blank');
      
      // Reset input setelah dikirim
      input.value = '';
    });

    // Reset style error ketika user mulai mengetik ulang
    input.addEventListener('input', () => {
      if (form.classList.contains('border-red-500')) {
        form.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
        form.classList.add('border-stone-700/60', 'focus-within:border-accent');
      }
    });
  }
})();<\/script>`;
}, "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://astro.build");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title = "Creativa Studio - Kontraktor & Arsitektur Premium", description = "Kontraktor pembangunan hunian mewah, renovasi komersial presisi, dan desain arsitektur premium dengan hasil akhir berkelas tinggi.", heroFullBleed = false, hideFooter = false } = Astro.props;
	return renderTemplate`<html lang="id"><head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title><!-- Theme Initialization to force Clean White (Light Mode) --><script>
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    <\/script>${renderHead($$result)}</head><body class="min-h-screen flex flex-col justify-between selection:bg-accent selection:text-bg-primary"><!-- Ruler Navigation Progress Indicator --><div id="ruler"><div id="ruler-fill"></div></div><div id="ruler-label">0.00 M</div><!-- Navbar -->${renderComponent($$result, "Navbar", $$Navbar, {})}<!-- Content Slot --><main${addAttribute(heroFullBleed ? "flex-grow" : "flex-grow pt-24", "class")}>${renderSlot($$result, $$slots["default"])}</main><!-- Footer -->${!hideFooter && renderTemplate`${renderComponent($$result, "Footer", $$Footer, {})}`}<!-- Scroll & Transition Effects -->${renderScript($$result, "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/layouts/BaseLayout.astro", void 0);
//#endregion
//#region src/components/DetailEstimator.tsx
var DetailEstimator = ({ ahspItems, materials, wages, whatsappNumber, initialData }) => {
	const [clientName, setClientName] = useState(initialData?.clientName || "");
	const [clientWhatsapp, setClientWhatsapp] = useState(initialData?.clientWhatsapp || "");
	const [clientEmail, setClientEmail] = useState(initialData?.clientEmail || "");
	const [projectLocation, setProjectLocation] = useState(initialData?.lokasi || "");
	const [projectArea, setProjectArea] = useState(initialData?.luasBangunan || 0);
	const [selectedItems, setSelectedItems] = useState(initialData?.items || [
		{
			slug: "galian-tanah-keras",
			volume: 45
		},
		{
			slug: "pasang-pondasi-batu-kali",
			volume: 20
		},
		{
			slug: "pasang-dinding-bata",
			volume: 150
		}
	]);
	const [tempItemSlug, setTempItemSlug] = useState(ahspItems[0]?.slug || "");
	const [tempVolume, setTempVolume] = useState(10);
	const [profitRate, setProfitRate] = useState(initialData?.profitRate !== void 0 ? initialData.profitRate : 10);
	const [taxRate, setTaxRate] = useState(initialData?.taxRate !== void 0 ? initialData.taxRate : 11);
	const [activeTab, setActiveTab] = useState("pekerjaan");
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [isPdfLoading, setIsPdfLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [saveUrl, setSaveUrl] = useState(null);
	const [saveError, setSaveError] = useState(null);
	const ahspRecord = React.useMemo(() => {
		const rec = {};
		ahspItems.forEach((item) => {
			rec[item.slug] = item;
		});
		return rec;
	}, [ahspItems]);
	const materialsRecord = React.useMemo(() => {
		const rec = {};
		materials.forEach((item) => {
			rec[item.slug] = item;
		});
		return rec;
	}, [materials]);
	const wagesRecord = React.useMemo(() => {
		const rec = {};
		wages.forEach((item) => {
			rec[item.slug] = item;
		});
		return rec;
	}, [wages]);
	const calculation = React.useMemo(() => {
		return calculateDetailedRAB(selectedItems, ahspRecord, materialsRecord, wagesRecord, taxRate, profitRate);
	}, [
		selectedItems,
		ahspRecord,
		materialsRecord,
		wagesRecord,
		taxRate,
		profitRate
	]);
	const handleAddItem = (e) => {
		e.preventDefault();
		if (!tempItemSlug) return;
		const existingIdx = selectedItems.findIndex((i) => i.slug === tempItemSlug);
		if (existingIdx !== -1) {
			const updated = [...selectedItems];
			updated[existingIdx].volume += tempVolume;
			setSelectedItems(updated);
		} else setSelectedItems([...selectedItems, {
			slug: tempItemSlug,
			volume: tempVolume
		}]);
	};
	const handleUpdateVolume = (slug, newVolume) => {
		const updated = selectedItems.map((item) => item.slug === slug ? {
			...item,
			volume: Math.max(0, newVolume)
		} : item);
		setSelectedItems(updated.filter((item) => item.volume > 0));
	};
	const handleRemoveItem = (slug) => {
		setSelectedItems(selectedItems.filter((item) => item.slug !== slug));
	};
	const handleSaveAndShare = async () => {
		if (selectedItems.length === 0) {
			alert("Pilih minimal satu item pekerjaan terlebih dahulu.");
			return null;
		}
		if (!clientName || !clientWhatsapp) {
			alert("Mohon isi Nama Klien dan Nomor WhatsApp di panel Informasi Proyek terlebih dahulu.");
			return null;
		}
		setIsSaving(true);
		setSaveError(null);
		try {
			const calcResponse = await fetch("/api/rab-save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					jenisPekerjaan: "Kustom Detail",
					luasBangunan: projectArea,
					lokasi: projectLocation,
					items: selectedItems,
					profitRate,
					taxRate,
					subtotal: calculation.subtotal,
					totalCost: calculation.totalCost
				})
			});
			if (!calcResponse.ok) throw new Error("Gagal menyimpan data kalkulasi.");
			const calcId = (await calcResponse.json()).id;
			await fetch("/api/rab-lead", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nama: clientName,
					whatsapp: clientWhatsapp,
					email: clientEmail,
					calculationId: calcId,
					sumberMode: "detail"
				})
			});
			const fullUrl = `${window.location.origin}/rab/hasil/${calcId}`;
			setSaveUrl(fullUrl);
			return calcId;
		} catch (err) {
			console.error(err);
			setSaveError(err.message || "Gagal menyimpan kalkulasi.");
			return null;
		} finally {
			setIsSaving(false);
		}
	};
	const handleDownloadPDF = async () => {
		if (selectedItems.length === 0) {
			alert("Pilih minimal satu item pekerjaan terlebih dahulu.");
			return;
		}
		if (!clientName || !clientWhatsapp) {
			alert("Mohon isi Nama Klien dan Nomor WhatsApp di panel Informasi Proyek terlebih dahulu.");
			return;
		}
		setIsPdfLoading(true);
		try {
			let calcId = null;
			try {
				const calcResponse = await fetch("/api/rab-save", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						jenisPekerjaan: "Kustom Detail",
						luasBangunan: projectArea,
						lokasi: projectLocation,
						items: selectedItems,
						profitRate,
						taxRate,
						subtotal: calculation.subtotal,
						totalCost: calculation.totalCost
					})
				});
				if (calcResponse.ok) {
					calcId = (await calcResponse.json()).id;
					await fetch("/api/rab-lead", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							nama: clientName,
							whatsapp: clientWhatsapp,
							email: clientEmail,
							calculationId: calcId,
							sumberMode: "detail"
						})
					});
				}
			} catch (saveErr) {
				console.warn("Gagal melakukan background save:", saveErr);
			}
			const response = await fetch("/api/rab-pdf", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					clientName: clientName || "Klien Creativa Studio",
					projectLocation: projectLocation || "Indonesia",
					projectArea: projectArea || 0,
					items: selectedItems,
					taxRatePercent: taxRate,
					profitRatePercent: profitRate
				})
			});
			if (!response.ok) throw new Error("Gagal menghasilkan file PDF.");
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `RAB_Creativa_Studio_${(clientName || "Estimasi").replace(/\s+/g, "_")}.pdf`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (err) {
			console.error(err);
			alert(err.message || "Terjadi kesalahan saat mengunduh PDF.");
		} finally {
			setIsPdfLoading(false);
		}
	};
	const handleWhatsAppConsultation = async () => {
		if (!clientName || !clientWhatsapp) {
			alert("Mohon isi Nama Klien dan Nomor WhatsApp di panel Informasi Proyek terlebih dahulu.");
			return;
		}
		let calcId = null;
		try {
			const calcResponse = await fetch("/api/rab-save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					jenisPekerjaan: "Kustom Detail",
					luasBangunan: projectArea,
					lokasi: projectLocation,
					items: selectedItems,
					profitRate,
					taxRate,
					subtotal: calculation.subtotal,
					totalCost: calculation.totalCost
				})
			});
			if (calcResponse.ok) {
				calcId = (await calcResponse.json()).id;
				await fetch("/api/rab-lead", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						nama: clientName,
						whatsapp: clientWhatsapp,
						email: clientEmail,
						calculationId: calcId,
						sumberMode: "detail"
					})
				});
			}
		} catch (saveErr) {
			console.warn("Gagal melakukan background save:", saveErr);
		}
		const shareInfo = calcId ? `\nLink Kalkulasi: ${window.location.origin}/rab/hasil/${calcId}` : "";
		const message = `Halo Creativa Studio, nama saya *${clientName}* (${clientWhatsapp}).\nSaya telah menghitung estimasi RAB detail untuk proyek pembangunan dengan parameter berikut:\n\n*Detail Proyek:*\n- Lokasi: ${projectLocation || "-"}\n- Luas Bangunan: ${projectArea || "-"} m²\n- Jumlah Item Pekerjaan: ${selectedItems.length}\n- Subtotal Pekerjaan: ${formatRupiah(calculation.subtotal)}\n- Fee Kontraktor (${profitRate}%): ${formatRupiah(calculation.profitCost)}\n- PPN (${taxRate}%): ${formatRupiah(calculation.taxCost)}\n*TOTAL BIAYA: ${formatRupiah(calculation.totalCost)}*${shareInfo}\n\nSaya ingin berkonsultasi mengenai detail spesifikasi material dan penjadwalan pembangunan. Mohon informasinya!`;
		const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
		window.open(waUrl, "_blank");
	};
	const renderSummaryContent = (isMobile = false) => /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-stone-200/80 pb-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
					className: "block font-sans text-[10px] text-stone-500 uppercase tracking-widest font-bold",
					children: [
						"Luas: ",
						projectArea || 0,
						" m² • Lokasi: ",
						projectLocation || "INDONESIA"
					]
				}), /* @__PURE__ */ jsx("h4", {
					className: "font-serif text-xl font-medium text-stone-900 uppercase",
					children: "Ringkasan Estimasi"
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "text-left sm:text-right",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block font-sans text-[10px] text-stone-500 uppercase tracking-widest font-bold",
						children: "TOTAL ESTIMASI AKHIR"
					}), /* @__PURE__ */ jsx("span", {
						className: "block font-serif font-semibold text-2xl text-amber-800",
						children: formatRupiah(calculation.totalCost)
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-3 gap-3 font-sans text-center text-xs",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-stone-50 border border-stone-200/60 p-3 rounded-lg",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5",
							children: "SUBTOTAL"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-stone-800",
							children: formatRupiah(calculation.subtotal)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-stone-50 border border-stone-200/60 p-3 rounded-lg",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "block text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5",
							children: [
								"FEE (",
								profitRate,
								"%)"
							]
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-stone-800",
							children: formatRupiah(calculation.profitCost)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-stone-50 border border-stone-200/60 p-3 rounded-lg",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "block text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5",
							children: [
								"PPN (",
								taxRate,
								"%)"
							]
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold text-stone-800",
							children: formatRupiah(calculation.taxCost)
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ jsxs("button", {
						onClick: handleDownloadPDF,
						disabled: isPdfLoading,
						className: "py-3 bg-amber-800 hover:bg-amber-900 text-stone-100 font-bold rounded-lg shadow-sm transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50",
						children: [/* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }), isPdfLoading ? "MENYUSUN PDF..." : "UNDUH PDF"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: handleWhatsAppConsultation,
						className: "py-3 bg-transparent text-stone-800 hover:bg-stone-50 font-bold border border-stone-300 rounded-lg transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5",
						children: [/* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }), "KONSULTASI WA"]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: handleSaveAndShare,
						disabled: isSaving,
						className: "py-3 bg-transparent text-stone-800 hover:bg-stone-50 font-bold border border-stone-300 rounded-lg transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50",
						children: [/* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }), isSaving ? "MENYIMPAN..." : "SHARE LINK"]
					})
				]
			}),
			saveUrl && /* @__PURE__ */ jsxs("div", {
				className: "p-4 border border-stone-200 bg-stone-50/50 rounded-xl font-sans text-xs text-stone-800 space-y-1.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: "block text-[9px] text-stone-500 font-bold uppercase tracking-wider",
					children: "LINK KALKULASI ANDA"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("input", {
						type: "text",
						readOnly: true,
						value: saveUrl,
						className: "flex-1 bg-white border border-stone-300 rounded-lg p-2 text-stone-800 text-[11px] focus:outline-none",
						onClick: (e) => e.target.select()
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => {
							navigator.clipboard.writeText(saveUrl);
							alert("Link berhasil disalin ke clipboard!");
						},
						className: "px-4 py-2 bg-stone-900 text-stone-100 text-[10px] uppercase font-bold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer",
						children: "Salin"
					})]
				})]
			}),
			saveError && /* @__PURE__ */ jsx("div", {
				className: "p-3 border border-red-300 bg-red-50 text-red-700 font-sans text-[11px] uppercase tracking-wider font-semibold rounded-lg",
				children: saveError
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		id: "calculator-detail",
		className: "font-sans text-stone-800 pb-20 lg:pb-0",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-5 space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm space-y-4",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "font-serif text-lg font-medium text-stone-900 uppercase border-b border-stone-200/60 pb-2 flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-amber-700" }), " 1. Informasi Proyek"]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-4 font-sans text-xs",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
										children: "Nama Klien *"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: clientName,
										onChange: (e) => setClientName(e.target.value),
										placeholder: "Masukkan Nama Lengkap",
										required: true,
										className: "w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
											children: "Nomor WhatsApp *"
										}), /* @__PURE__ */ jsx("input", {
											type: "tel",
											inputMode: "numeric",
											pattern: "[0-9]*",
											value: clientWhatsapp,
											onChange: (e) => setClientWhatsapp(e.target.value),
											placeholder: "Contoh: 0812345678",
											required: true,
											className: "w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
											children: "Email (Opsional)"
										}), /* @__PURE__ */ jsx("input", {
											type: "email",
											value: clientEmail,
											onChange: (e) => setClientEmail(e.target.value),
											placeholder: "nama@domain.com",
											className: "w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
											children: "Lokasi Pembangunan"
										}), /* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("input", {
												type: "text",
												value: projectLocation,
												onChange: (e) => setProjectLocation(e.target.value),
												placeholder: "Contoh: Bandung",
												className: "w-full bg-white border border-stone-300 rounded-lg p-3 pl-9 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
											}), /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-stone-400 absolute left-3 top-3.5" })]
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
											children: "Luas Bangunan (m²)"
										}), /* @__PURE__ */ jsx("input", {
											type: "number",
											inputMode: "numeric",
											pattern: "[0-9]*",
											value: projectArea || "",
											onChange: (e) => setProjectArea(Math.max(0, parseInt(e.target.value) || 0)),
											placeholder: "Luas Area",
											className: "w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-bold transition-colors"
										})] })]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm space-y-4",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "font-serif text-lg font-medium text-stone-900 uppercase border-b border-stone-200/60 pb-2 flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-amber-700" }), " 2. Tambah Item Pekerjaan"]
							}), /* @__PURE__ */ jsxs("form", {
								onSubmit: handleAddItem,
								className: "space-y-4 font-sans text-xs",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
										children: "Jenis Pekerjaan AHSP"
									}), /* @__PURE__ */ jsx("select", {
										value: tempItemSlug,
										onChange: (e) => setTempItemSlug(e.target.value),
										className: "w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium cursor-pointer transition-colors",
										children: ahspItems.map((item) => /* @__PURE__ */ jsxs("option", {
											value: item.slug,
											children: [
												"[",
												item.kodeAHSP,
												"] ",
												item.namaPekerjaan,
												" (",
												item.satuanVolume,
												")"
											]
										}, item.slug))
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]",
										children: "Volume Pekerjaan"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											type: "number",
											step: "any",
											inputMode: "decimal",
											value: tempVolume || "",
											onChange: (e) => setTempVolume(Math.max(0, parseFloat(e.target.value) || 0)),
											placeholder: "Volume",
											required: true,
											className: "flex-1 bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-bold transition-colors"
										}), /* @__PURE__ */ jsx("div", {
											className: "bg-stone-100 border border-stone-300 rounded-lg px-4 py-3 flex items-center justify-center font-bold text-stone-500 text-xs shrink-0",
											children: ahspRecord[tempItemSlug]?.satuanVolume || "-"
										})]
									})] }),
									/* @__PURE__ */ jsxs("button", {
										type: "submit",
										className: "w-full py-3 bg-amber-800 hover:bg-amber-900 text-stone-100 font-bold rounded-lg shadow-sm transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), "Tambah Ke Daftar RAB"]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm space-y-4",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "font-serif text-lg font-medium text-stone-900 uppercase border-b border-stone-200/60 pb-2 flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Sliders, { className: "w-5 h-5 text-amber-700" }), " 3. Profit & Pajak"]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-5 font-sans text-xs",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-center font-bold tracking-wider text-[9px]",
										children: [/* @__PURE__ */ jsx("span", { children: "FEE KONTRAKTOR / PROFIT" }), /* @__PURE__ */ jsxs("span", {
											className: "text-amber-800 font-bold text-xs",
											children: [profitRate, "%"]
										})]
									}), /* @__PURE__ */ jsx("input", {
										type: "range",
										min: "0",
										max: "30",
										value: profitRate,
										onChange: (e) => setProfitRate(parseInt(e.target.value) || 0),
										className: "w-full h-1.5 bg-stone-200 appearance-none cursor-pointer rounded-lg accent-amber-700"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-center font-bold tracking-wider text-[9px]",
										children: [/* @__PURE__ */ jsx("span", { children: "PAJAK (PPN)" }), /* @__PURE__ */ jsxs("span", {
											className: "text-amber-800 font-bold text-xs",
											children: [taxRate, "%"]
										})]
									}), /* @__PURE__ */ jsx("input", {
										type: "range",
										min: "0",
										max: "20",
										value: taxRate,
										onChange: (e) => setTaxRate(parseInt(e.target.value) || 0),
										className: "w-full h-1.5 bg-stone-200 appearance-none cursor-pointer rounded-lg accent-amber-700"
									})]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-7 space-y-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "hidden lg:block border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm",
						children: renderSummaryContent(false)
					}), /* @__PURE__ */ jsxs("div", {
						className: "border border-stone-200/80 bg-[#FAF9F6] rounded-2xl shadow-sm overflow-hidden",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex border-b border-stone-200 font-serif text-xs uppercase font-medium bg-stone-50/50",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("pekerjaan"),
									className: `flex-1 py-4 text-center cursor-pointer border-r border-stone-200 transition-all ${activeTab === "pekerjaan" ? "bg-amber-800 text-stone-100 font-bold" : "bg-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`,
									children: "Daftar Pekerjaan"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("material"),
									className: `flex-1 py-4 text-center cursor-pointer border-r border-stone-200 transition-all ${activeTab === "material" ? "bg-amber-800 text-stone-100 font-bold" : "bg-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`,
									children: "Material (BOM)"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveTab("upah"),
									className: `flex-1 py-4 text-center cursor-pointer transition-all ${activeTab === "upah" ? "bg-amber-800 text-stone-100 font-bold" : "bg-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`,
									children: "Tenaga Kerja"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-5 overflow-y-auto max-h-[500px] custom-scrollbar",
							children: [
								activeTab === "pekerjaan" && /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: selectedItems.length === 0 ? /* @__PURE__ */ jsxs("div", {
										className: "text-center py-12 space-y-2",
										children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "w-8 h-8 text-stone-300 mx-auto" }), /* @__PURE__ */ jsx("p", {
											className: "font-sans text-xs text-stone-500 font-medium",
											children: "Daftar item pekerjaan kosong. Silakan tambahkan item di panel kiri."
										})]
									}) : /* @__PURE__ */ jsx("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ jsxs("table", {
											className: "w-full font-sans text-xs text-left border-collapse min-w-[550px]",
											children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-stone-200 text-[9px] text-stone-400 font-bold uppercase tracking-wider",
												children: [
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3",
														children: "Kode"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3",
														children: "Pekerjaan"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Volume"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Harga Satuan"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Subtotal"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-center",
														children: "Hapus"
													})
												]
											}) }), /* @__PURE__ */ jsx("tbody", { children: calculation.items.map((item) => /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-stone-100 hover:bg-stone-50/50 transition-colors",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "py-3 font-semibold text-stone-500",
														children: item.kodeAHSP || "-"
													}),
													/* @__PURE__ */ jsxs("td", {
														className: "py-3 pr-4 max-w-[200px]",
														children: [/* @__PURE__ */ jsx("span", {
															className: "block font-semibold text-stone-900 leading-tight",
															children: item.namaPekerjaan
														}), /* @__PURE__ */ jsx("span", {
															className: "block text-[9px] text-stone-400 mt-0.5",
															children: item.kategoriPekerjaan
														})]
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center justify-end gap-1",
															children: [/* @__PURE__ */ jsx("input", {
																type: "number",
																step: "any",
																inputMode: "decimal",
																value: item.volume,
																onChange: (e) => handleUpdateVolume(item.slug, parseFloat(e.target.value) || 0),
																className: "w-12 bg-white border border-stone-300 rounded px-1.5 py-0.5 text-right font-bold text-amber-800 focus:outline-none focus:border-amber-700 text-xs"
															}), /* @__PURE__ */ jsx("span", {
																className: "text-[10px] text-stone-400 font-semibold",
																children: item.satuanVolume
															})]
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right text-stone-600 font-medium",
														children: formatRupiah(item.unitRate)
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right font-bold text-stone-900",
														children: formatRupiah(item.totalCost)
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-center",
														children: /* @__PURE__ */ jsx("button", {
															onClick: () => handleRemoveItem(item.slug),
															className: "text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer",
															title: "Hapus Item",
															children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
														})
													})
												]
											}, item.slug)) })]
										})
									})
								}),
								activeTab === "material" && /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: calculation.billOfMaterials.length === 0 ? /* @__PURE__ */ jsx("div", {
										className: "text-center py-12 text-stone-400",
										children: /* @__PURE__ */ jsx("p", {
											className: "font-sans text-xs font-medium",
											children: "Bahan material akan otomatis terhitung setelah Anda menambahkan item pekerjaan."
										})
									}) : /* @__PURE__ */ jsx("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ jsxs("table", {
											className: "w-full font-sans text-xs text-left border-collapse min-w-[500px]",
											children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-stone-200 text-[9px] text-stone-400 font-bold uppercase tracking-wider",
												children: [
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3",
														children: "Nama Material"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-center",
														children: "Satuan"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Volume Total"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Harga Satuan"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Subtotal"
													})
												]
											}) }), /* @__PURE__ */ jsx("tbody", { children: calculation.billOfMaterials.map((mat, idx) => /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-stone-100 hover:bg-stone-50/50 transition-colors",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "py-3 font-semibold text-stone-900 leading-tight",
														children: mat.nama
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-center text-stone-500 font-medium",
														children: mat.satuan
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right font-bold text-stone-800",
														children: mat.totalVolume.toLocaleString("id-ID", {
															minimumFractionDigits: 2,
															maximumFractionDigits: 3
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right text-stone-600 font-medium",
														children: formatRupiah(mat.hargaSatuan)
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right font-bold text-stone-900",
														children: formatRupiah(mat.subtotal)
													})
												]
											}, idx)) })]
										})
									})
								}),
								activeTab === "upah" && /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: calculation.laborRequirements.length === 0 ? /* @__PURE__ */ jsx("div", {
										className: "text-center py-12 text-stone-400",
										children: /* @__PURE__ */ jsx("p", {
											className: "font-sans text-xs font-medium",
											children: "Tenaga kerja akan otomatis terhitung setelah Anda menambahkan item pekerjaan."
										})
									}) : /* @__PURE__ */ jsx("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ jsxs("table", {
											className: "w-full font-sans text-xs text-left border-collapse min-w-[450px]",
											children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-stone-200 text-[9px] text-stone-400 font-bold uppercase tracking-wider",
												children: [
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3",
														children: "Tenaga Kerja"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-center",
														children: "Satuan"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "OH (Hari Orang)"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Tarif Harian"
													}),
													/* @__PURE__ */ jsx("th", {
														className: "py-2 pb-3 text-right",
														children: "Subtotal"
													})
												]
											}) }), /* @__PURE__ */ jsx("tbody", { children: calculation.laborRequirements.map((lab, idx) => /* @__PURE__ */ jsxs("tr", {
												className: "border-b border-stone-100 hover:bg-stone-50/50 transition-colors",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "py-3 font-semibold text-stone-900 leading-tight",
														children: lab.jenisPekerja
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-center text-stone-500 font-medium",
														children: lab.satuan
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right font-bold text-stone-800",
														children: lab.totalOH.toLocaleString("id-ID", {
															minimumFractionDigits: 2,
															maximumFractionDigits: 3
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right text-stone-600 font-medium",
														children: formatRupiah(lab.tarifHarian)
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3 text-right font-bold text-stone-900",
														children: formatRupiah(lab.subtotal)
													})
												]
											}, idx)) })]
										})
									})
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lg:hidden fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 text-stone-100 z-50 px-4 py-3 shadow-2xl flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-[9px] text-stone-400 font-bold uppercase tracking-wider",
						children: [
							"Total RAB Detail (",
							selectedItems.length,
							" Item)"
						]
					}), /* @__PURE__ */ jsx("span", {
						className: "font-serif text-lg font-semibold text-amber-500 leading-tight",
						children: formatRupiah(calculation.totalCost)
					})]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setIsBottomSheetOpen(true),
					className: "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-stone-100 px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 shadow cursor-pointer transition-colors uppercase tracking-wider",
					children: ["Lihat Ringkasan ", /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4" })]
				})]
			}),
			isBottomSheetOpen && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
				className: "lg:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity",
				onClick: () => setIsBottomSheetOpen(false)
			}), /* @__PURE__ */ jsxs("div", {
				className: "lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAF9F6] border-t border-stone-200 rounded-t-3xl z-50 shadow-2xl max-h-[85vh] overflow-y-auto px-6 pt-5 pb-8 transition-transform duration-300",
				children: [
					/* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center mb-4",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-serif text-lg font-medium text-stone-900",
							children: "RINGKASAN ESTIMASI"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsBottomSheetOpen(false),
							className: "p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
						})]
					}),
					renderSummaryContent(true)
				]
			})] })
		]
	});
};
//#endregion
//#region src/pages/rab/hasil/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const { id } = Astro.params;
	let initialData = void 0;
	let errorMsg = null;
	try {
		const calcResult = await supabaseFetch(`rab_calculations?id=eq.${id}&select=*`);
		if (calcResult && calcResult.length > 0) {
			const calc = calcResult[0];
			const leadResult = await supabaseFetch(`rab_leads?calculation_id=eq.${id}&select=*`);
			const lead = leadResult && leadResult.length > 0 ? leadResult[0] : null;
			initialData = {
				clientName: lead?.nama || "",
				clientWhatsapp: lead?.whatsapp || "",
				clientEmail: lead?.email || "",
				lokasi: calc.lokasi || "",
				luasBangunan: calc.luas_bangunan || 0,
				items: calc.items || [],
				profitRate: calc.profit_rate !== void 0 ? calc.profit_rate : 10,
				taxRate: calc.tax_rate !== void 0 ? calc.tax_rate : 11
			};
		} else errorMsg = "Estimasi kalkulasi tidak ditemukan atau telah dihapus.";
	} catch (err) {
		console.error("Error fetching calculation:", err);
		errorMsg = "Terjadi kesalahan internal saat memuat data estimasi.";
	}
	const reader = createReader(process.cwd(), keystatic_config_default);
	const rawAHSP = await reader.collections.ahspItem.all();
	const rawMaterials = await reader.collections.hargaBahan.all();
	const rawWages = await reader.collections.hargaUpah.all();
	const whatsappNumber = (await reader.singletons.siteSettings.read())?.whatsapp || "628123456789";
	const ahspItems = rawAHSP.map((item) => ({
		slug: item.slug,
		namaPekerjaan: item.entry.namaPekerjaan,
		kodeAHSP: item.entry.kodeAHSP,
		kategoriPekerjaan: item.entry.kategoriPekerjaan,
		satuanVolume: item.entry.satuanVolume,
		bahanKomponen: (item.entry.bahanKomponen || []).map((b) => ({
			bahanRef: b.bahanRef || "",
			koefisien: b.koefisien || 0
		})),
		upahKomponen: (item.entry.upahKomponen || []).map((u) => ({
			upahRef: u.upahRef || "",
			koefisien: u.koefisien || 0
		}))
	}));
	const materials = rawMaterials.map((m) => ({
		slug: m.slug,
		nama: m.entry.nama,
		satuan: m.entry.satuan,
		hargaSatuan: m.entry.hargaSatuan || 0,
		kategori: m.entry.kategori || "Lainnya"
	}));
	const wages = rawWages.map((w) => ({
		slug: w.slug,
		jenisPekerja: w.entry.jenisPekerja,
		satuan: w.entry.satuan || "OH",
		hargaSatuan: w.entry.hargaSatuan || 0
	}));
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Hasil Estimasi RAB — Creativa Studio" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="py-24 px-[6vw] max-w-7xl mx-auto relative"><div class="border-b border-stone-200/80 pb-8 mb-12"><span class="font-sans text-[11px] tracking-[0.15em] text-accent font-semibold uppercase block mb-2">SHARED ESTIMATION REPORT</span><h1 class="font-serif text-4xl sm:text-5xl font-medium text-text-primary leading-[1.05] mb-4">HASIL ESTIMASI <span class="italic text-accent">RAB</span></h1><p class="font-sans text-text-secondary text-[14px] sm:text-base max-w-3xl leading-relaxed">Berikut adalah laporan estimasi anggaran biaya proyek yang telah disimpan sebelumnya. Anda dapat memperbarui parameter, mengunduh file PDF resmi, atau berkonsultasi langsung dengan tim kami.</p></div>${errorMsg ? renderTemplate`<div class="border border-stone-200 bg-stone-50/50 p-8 rounded-lg text-center text-text-primary"><h2 class="font-serif text-xl text-red-600 uppercase mb-4 font-semibold">ERROR: DATA TIDAK DITEMUKAN</h2><p class="font-sans text-xs text-text-secondary mb-6">${errorMsg}</p><a href="/kalkulator-rab" class="inline-block px-6 py-3 bg-stone-900 text-stone-50 text-xs uppercase font-bold tracking-wider hover:bg-stone-800 transition-all rounded-md shadow-sm">Kembali ke Kalkulator</a></div>` : renderTemplate`${renderComponent($$result, "DetailEstimator", DetailEstimator, {
		"client:load": true,
		"ahspItems": ahspItems,
		"materials": materials,
		"wages": wages,
		"whatsappNumber": whatsappNumber,
		"initialData": initialData,
		"client:component-hydration": "load",
		"client:component-path": "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/components/DetailEstimator.tsx",
		"client:component-export": "DetailEstimator"
	})}`}</div>` })}`;
}, "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/pages/rab/hasil/[id].astro", void 0);
var $$file = "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/pages/rab/hasil/[id].astro";
var $$url = "/rab/hasil/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/rab/hasil/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
