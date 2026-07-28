import { Headphones, Ear, Volume2, Speaker, Rows3, Headset } from "lucide-react";

export const CATEGORIES = [
  {
    value: "HEADPHONE",
    label: "Headphones",
    icon: Headphones,
    color: "from-purple-500 to-indigo-600",
    description: "Over-ear & on-ear headphones",
  },
  {
    value: "EARPHONE",
    label: "Earphones",
    icon: Ear,
    color: "from-cyan-500 to-blue-600",
    description: "In-ear wired earphones",
  },
  {
    value: "EARBUDS",
    label: "Earbuds",
    icon: Volume2,
    color: "from-emerald-500 to-teal-600",
    description: "True wireless earbuds",
  },
  {
    value: "SPEAKER",
    label: "Speakers",
    icon: Speaker,
    color: "from-orange-500 to-red-600",
    description: "Bluetooth & portable speakers",
  },
  {
    value: "SOUNDBAR",
    label: "Soundbars",
    icon: Rows3,
    color: "from-pink-500 to-rose-600",
    description: "Home theater soundbars",
  },
  {
    value: "HEADSET",
    label: "Headsets",
    icon: Headset,
    color: "from-amber-500 to-yellow-600",
    description: "Gaming & work headsets",
  },
];

export const getCategoryMeta = (value) =>
  CATEGORIES.find((c) => c.value === value) || CATEGORIES[0];
