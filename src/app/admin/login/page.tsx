"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await login(password);
        if (!result.success) {
            setError(result.error || "Login failed");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
            <div className="w-full max-w-sm p-8 border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] shadow-2xl">
                <div className="text-center mb-10">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Secure Access</p>
                    <h1 className="font-serif text-3xl text-[var(--color-text)]">Admin Portal</h1>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-8">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-[var(--color-border)] px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors text-center font-mono tracking-widest text-lg"
                            autoFocus
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gold text-[#0F0F0F] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors rounded-sm disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                    
                    <p className="text-center text-[10px] text-[var(--color-muted)] mt-6 uppercase tracking-wider">
                        Paperlight Productions Admin
                    </p>
                </form>
            </div>
        </main>
    );
}
