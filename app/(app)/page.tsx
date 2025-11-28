"use client";
import Navbar from "@/components/Navbar";
import {
  AlertTriangle,
  Annoyed,
  BookOpen,
  BrainCircuit,
  Frown,
  Laugh,
  Mail,
  Meh,
  MessageSquare,
  Phone,
  Smile,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";

const supportFeatures = [
  {
    icon: User,
    title: "Professional Support",
    description:
      "Connect with licensed therapists and counselors who understand your journey.",
    imageUrl: "/assets/counselling.jpg", // Example image
  },
  {
    icon: BrainCircuit,
    title: "Mindfulness Practices",
    description:
      "Guided meditation, breathing exercises, and yoga for daily wellness.",
    imageUrl: "/assets/mindfulness.jpg", // Example image
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join a supportive community where you can share and connect with others.",
    imageUrl: "/assets/community.jpg", // Example image
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description:
      "Access articles, videos, and tools to better understand mental health.",
    imageUrl: "/assets/library.jpg", // Example image
  },
];

const moodOptions = [
  {
    label: "Excellent",
    icon: Laugh,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    accent: "ring-yellow-500",
  },
  {
    label: "Good",
    icon: Smile,
    color: "text-green-500",
    bg: "bg-green-50",
    accent: "ring-green-500",
  },
  {
    label: "Okay",
    icon: Meh,
    color: "text-blue-500",
    bg: "bg-blue-50",
    accent: "ring-blue-500",
  },
  {
    label: "Difficult",
    icon: Frown,
    color: "text-orange-500",
    bg: "bg-orange-50",
    accent: "ring-orange-500",
  },
  {
    label: "Struggling",
    icon: Annoyed,
    color: "text-red-500",
    bg: "bg-red-50",
    accent: "ring-red-500",
  },
];

const immediateSupportOptions = [
  {
    icon: Phone,
    title: "Crisis Hotline",
    details: "24/7 support available",
    contact: "1-800-273-8255",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    details: "Chat with a counselor",
    contact: "Start Chat",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Mail,
    title: "Email Support",
    details: "Get help via email",
    contact: "support@luminwell.com",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  return (
    <>
      <header className=" inset-x-0 top-0 z-50">
        <Navbar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      </header>
      {/* hero section */}
      <section className="bg-[linear-gradient(180deg,_rgba(219,_234,_254,_0.50)_0%,_rgba(243,_232,_255,_0.50)_100%)] isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
              Luminwell
            </h1>
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative px-3 py-4 text-gray-600 dark:text-gray-400">
                <h1>Your Mental Wellness Starts Here</h1>
              </div>
            </div>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              Find peace, balance, and support on your path to better mental
              health. We&apos;re here to help you thrive with tools, resources, and a
              caring community.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/sign-in"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:outline-blue-500">
                Get started
              </Link>
              <Link
                href="#"
                className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              How We Support You
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Comprehensive tools and resources designed to support your mental
              wellness journey
            </p>
          </div>

          {/* Feature Grid */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 sm:gap-16 lg:max-w-none lg:grid-cols-2">
            {supportFeatures.map((feature) => {
              const Icon = feature.icon; // Component from lucide-react
              return (
                <div
                  key={feature.title}
                  className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-gray-50 dark:bg-gray-900/50">
                  <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                    {" "}
                    <Image
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>

                      <h3 className="text-xl my-1 font-semibold leading-7 text-gray-900 dark:text-white pt-1">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-base text-gray-600 dark:text-gray-400 pl-16 -mt-3">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              How Are You Feeling Today?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Track your mood and emotions to better understand your mental
              wellness
            </p>
          </div>

          {/* Mood Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6 max-w-5xl w-full">
              {moodOptions.map((mood) => {
                const MoodIcon = mood.icon;
                // Check selection against the local state
                const isSelected = selectedMood === mood.label;

                return (
                  <div
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    role="button"
                    tabIndex={0}
                    className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl h-36 sm:h-40 transition-all duration-200 cursor-pointer text-center
                      ${mood.bg} 
                      ${
                        isSelected
                          ? `${mood.accent} ring-4 shadow-lg scale-[1.02]`
                          : "shadow-sm hover:shadow-md"
                      } 
                      border border-gray-200 dark:border-gray-700`}>
                    {/* Icon */}
                    <MoodIcon
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${mood.color}`}
                      aria-hidden="true"
                    />

                    {/* Label */}
                    <span
                      className={`mt-3 text-sm sm:text-base font-semibold transition-colors 
                        ${isSelected ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                      {mood.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Local State Display */}
          {selectedMood ? (
            <div className="mt-12 text-center text-xl font-medium text-gray-700 dark:text-gray-300">
              You have currently selected:{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {selectedMood}
              </span>
              .
            </div>
          ) : (
            <div className="mt-12 text-center text-xl font-medium text-gray-700 dark:text-gray-300">
              Click an icon above to log your current mood!
            </div>
          )}
        </div>
      </section>

      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Need Immediate Support?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              If you&apos;re in crisis or need someone to talk to, help is available
            </p>
          </div>

          {/* Support Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            {immediateSupportOptions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white dark:bg-gray-950 p-8 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700 transition hover:shadow-xl">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-full ${item.iconBg}`}>
                      <Icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {item.details}
                  </p>

                  {/* Contact Action (Link or Button) */}
                  {item.title === "Live Chat" ? (
                    <button className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition mt-2">
                      {item.contact}
                    </button>
                  ) : (
                    <Link
                      href={
                        item.title === "Crisis Hotline"
                          ? `tel:${item.contact}`
                          : `mailto:${item.contact}`
                      }
                      className="font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition mt-2 block">
                      {item.contact}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Emergency Services Banner */}
          <div className="mt-20 p-6 sm:p-8 rounded-xl border-t-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 max-w-5xl mx-auto shadow-md">
            <div className="flex items-start gap-4">
              <AlertTriangle className="flex-shrink-0 w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Emergency Services
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you or someone you know is in immediate danger, please call
                  **988** or go to your nearest emergency room. You are not
                  alone, and help is available.
                </p>
                <button
                  onClick={() => window.location.assign("https://988.ca")}
                  className="rounded-xl bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Get Help!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-950 border-t border-gray-800">
        <Footer />
      </footer>
    </>
  );
}
