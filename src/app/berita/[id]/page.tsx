"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiUser,
  FiClock,
  FiShare2,
  FiHeart,
  FiEye,
  FiTag,
  FiFacebook,
  FiTwitter,
  FiLinkedin
} from "react-icons/fi";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toggleLike } from "@/actions/like";
import { createClient } from "@/utils/supabase/client";

interface NewsDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  created_at: string;
  author: string;
  views: number;
  likes: number;
  image_url: string;
  tags: string[];
  content: string;
}

export default function BeritaDetailPage() {
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      setIsLoading(true);
      const supabase = createClient();
      
      const { data: detailData } = await supabase
        .from('berita')
        .select('*')
        .eq('slug', params.id)
        .single();
        
      if (detailData) {
        setNewsDetail(detailData);
        
        // Fetch related based on category
        const { data: relatedData } = await supabase
          .from('berita')
          .select('*')
          .eq('category', detailData.category)
          .neq('id', detailData.id)
          .limit(2);
          
        if (relatedData) setRelatedNews(relatedData);
      }
      setIsLoading(false);
    }
    
    if (params.id) {
      fetchDetail();
    }
  }, [params.id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-32 pb-20"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!newsDetail) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Berita tidak ditemukan</h1>
        <Link href="/berita" className="mt-4 text-primary hover:underline">Kembali ke daftar berita</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fc] min-h-screen pt-24 pb-20">
      
      {/* ── BACK BUTTON & HEADER INFO ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 mb-6">
        <Link href="/berita" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium text-sm mb-8">
          <FiArrowLeft /> Kembali ke Daftar Berita
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {newsDetail.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-on-surface-variant font-medium">
              <FiCalendar className="text-[var(--color-primary)]" /> {new Date(newsDetail.created_at).toLocaleDateString('id-ID')}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-base font-bold text-on-background">
            <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-outline-variant/30 shadow-sm">
              <FiEye className="text-[var(--color-primary)]" size={20} /> {newsDetail.views}
            </span>
            <button 
              onClick={async () => {
                const newLiked = !liked;
                setLiked(newLiked);
                await toggleLike('berita', newsDetail.id, newLiked);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-outline-variant/30 shadow-sm hover:border-red-200 transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center -ml-1 -mr-1 shrink-0">
                {liked ? (
                  <DotLottieReact src="/animations/Heart Animated.lottie" autoplay loop={false} />
                ) : (
                  <FiHeart className="text-gray-400 hover:text-red-500 transition-colors" size={20} />
                )}
              </div>
              <span className={liked ? "text-red-500 font-bold" : "text-gray-600 font-bold"}>
                {newsDetail.likes + (liked ? 1 : 0)}
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300 shadow-sm">
              <FiShare2 size={18} /> Bagikan
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-on-background leading-tight max-w-4xl mb-6">
          {newsDetail.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-on-surface-variant font-medium mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
              <FiUser />
            </div>
            <span>Oleh <span className="font-bold text-on-background">{newsDetail.author}</span></span>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="w-full aspect-[21/9] md:aspect-[21/8] rounded-3xl overflow-hidden shadow-lg border border-outline-variant/20"
        >
          <img 
            src={newsDetail.image_url} 
            alt={newsDetail.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* ── MAIN CONTENT & SIDEBAR ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Article Body */}
        <article className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 border border-outline-variant/20 shadow-sm">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-on-background prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-[var(--color-primary)] hover:prose-a:text-[var(--color-secondary)] prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-secondary)] prose-blockquote:bg-[var(--color-secondary)]/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-[var(--color-primary)] prose-blockquote:font-medium prose-blockquote:italic prose-li:text-on-surface-variant"
            dangerouslySetInnerHTML={{ __html: newsDetail.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-outline-variant/20">
            <h4 className="text-sm font-bold text-on-background mb-4 flex items-center gap-2">
              <FiTag className="text-[var(--color-primary)]" /> Tags Terkait
            </h4>
            <div className="flex flex-wrap gap-2">
              {newsDetail.tags.map((tag) => (
                <Link key={tag} href={`/berita?tag=${tag.toLowerCase()}`} className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-sm font-medium text-on-surface-variant hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Share Bottom */}
          <div className="mt-10 p-6 bg-[var(--color-primary)]/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[var(--color-primary)]/10">
            <span className="font-bold text-[var(--color-primary)]">Bagikan artikel ini:</span>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white text-blue-600 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all">
                <FiFacebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-sky-500 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all">
                <FiTwitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-blue-800 shadow-sm flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all">
                <FiLinkedin size={18} />
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Related News Widget */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-sm">
            <h3 className="text-lg font-bold text-on-background mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-[var(--color-secondary)] rounded-full"></span>
              Berita Terkait
            </h3>
            
            <div className="flex flex-col gap-5">
              {relatedNews.map((item) => (
                <Link key={item.id} href={`/berita/${item.slug}`} className="group flex gap-4 items-start">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-outline-variant/20">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-[var(--color-secondary)] uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-on-background group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                      <FiCalendar size={10} /> {item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/berita" className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
              Lihat Semua Berita
            </Link>
          </div>



        </aside>

      </section>

    </div>
  );
}
