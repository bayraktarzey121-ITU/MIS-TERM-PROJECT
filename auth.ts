@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

@layer base {
  body {
    @apply bg-[#FDFCFB] text-gray-900 antialiased;
  }
}

/* Leaflet Container */
.leaflet-container {
  height: 100%;
  width: 100%;
  z-index: 1;
}

/* Custom scollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}

.mask-tc {
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

