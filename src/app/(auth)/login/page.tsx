"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const KlymeUppLogo = () => (
  <svg
    className="w-8 h-8 text-primary"
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError("Vul alle velden in");
        return;
      }

      // TODO: Call login API
      console.log("Login data:", formData);

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err) {
      setError("E-mailadres of wachtwoord is onjuist");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    // TODO: Implement social authentication
    console.log(`Sign in with ${provider}`);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side: Brand Panel */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy to-navy-light p-12 flex-col justify-between overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 text-white">
            <span className="material-symbols-outlined text-4xl">star</span>
          </div>
          <div className="absolute top-1/4 right-20 text-primary">
            <span className="material-symbols-outlined text-2xl">
              auto_awesome
            </span>
          </div>
          <div className="absolute bottom-1/4 left-1/4 text-white">
            <span className="material-symbols-outlined text-3xl">
              star_rate
            </span>
          </div>
          <div className="absolute top-1/2 right-1/3 text-primary opacity-40">
            <span className="material-symbols-outlined text-5xl">grade</span>
          </div>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <KlymeUppLogo />
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">
            KlymeUpp
          </h2>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-white text-5xl xl:text-6xl font-display font-extrabold leading-tight mb-6">
            Jouw reis <br /> begint hier
          </h1>

          {/* Illustration Area */}
          <div className="relative h-64 w-full flex items-center justify-center">
            <div className="relative">
              <div className="w-48 h-48 bg-primary/20 rounded-full blur-3xl absolute -top-10 -left-10"></div>
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-end translate-x-12 translate-y-4">
                    <span className="material-symbols-outlined text-primary text-5xl">
                      military_tech
                    </span>
                  </div>
                  <div className="flex justify-center -translate-y-4">
                    <span className="material-symbols-outlined text-white text-6xl">
                      emoji_events
                    </span>
                  </div>
                  <div className="flex justify-start -translate-x-12 -translate-y-12">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      rocket_launch
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 text-white">
                  <span
                    className="material-symbols-outlined text-8xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    person
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="relative z-10">
          <p className="text-white/80 text-lg font-sans font-medium border-l-4 border-primary pl-4">
            Geen diploma nodig. Alleen motivatie.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 py-12 lg:px-24">
        <div className="w-full max-w-[440px]">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <div className="bg-primary/10 p-2 rounded-lg mb-4">
              <KlymeUppLogo />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Welkom terug
            </h1>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-gray-200 mb-8">
            <Link href="/register">
              <button className="flex-1 py-4 text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition-colors">
                Registreren
              </button>
            </Link>
            <button className="flex-1 py-4 text-sm font-bold border-b-2 border-primary text-primary">
              Inloggen
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleSocialAuth("Google")}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Google
              </span>
            </button>
            <button
              onClick={() => handleSocialAuth("Apple")}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-900">
                ios
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Apple
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-400 font-medium">
              of met e-mail
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
                htmlFor="email"
              >
                E-mailadres
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="naam@voorbeeld.nl"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Wachtwoord
                </label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline font-semibold"
                >
                  Vergeten?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Je wachtwoord"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Bezig met inloggen..." : "Inloggen"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Nog geen account?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              Registreer nu
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
