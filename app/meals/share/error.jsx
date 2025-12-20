"use client";

export default function Error({ error }) {
    return <main className="error">
        <h1>An erroe occurred!</h1>
        <p>Failed to create meal. Please try again later.</p>
    </main>;
}