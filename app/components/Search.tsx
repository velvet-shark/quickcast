"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import navigationData from "@/app/lib/navigation-data.json";

interface Command {
  text: string;
  href: string;
  category: string;
}

export function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  const scoreCommand = (command: Command, rawQuery: string) => {
    const normalizedQuery = normalize(rawQuery);
    if (!normalizedQuery) return 0;

    const text = normalize(command.text);
    const href = normalize(command.href);

    if (text === normalizedQuery) return 100;
    if (href === normalizedQuery) return 95;
    if (text.startsWith(normalizedQuery)) return 90;
    if (href.startsWith(normalizedQuery)) return 85;

    const textWords = new Set(text.split(" ").filter(Boolean));
    if (textWords.has(normalizedQuery)) return 80;

    const inTextIndex = text.indexOf(normalizedQuery);
    if (inTextIndex !== -1) return 70 - inTextIndex * 0.01;

    const inHrefIndex = href.indexOf(normalizedQuery);
    if (inHrefIndex !== -1) return 60 - inHrefIndex * 0.01;

    // Light similarity signal to keep partial matches, biased toward shorter labels
    const similarity = normalizedQuery.length / Math.max(text.length, normalizedQuery.length);
    return similarity * 50;
  };

  // Flatten navigation data into searchable array
  const allCommands = useMemo(() => {
    const commands: Command[] = [];
    Object.entries(navigationData.categories).forEach(([category, categoryCommands]) => {
      (categoryCommands as Array<{ text: string; href: string }>).forEach((command) => {
        commands.push({
          text: command.text,
          href: command.href,
          category
        });
      });
    });
    // Add the general cast command
    commands.push({
      text: "cast",
      href: "/cast",
      category: "General"
    });
    return commands;
  }, []);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return [];

    return allCommands
      .map((command) => ({ ...command, score: scoreCommand(command, query) }))
      .filter((command) => command.score > 0)
      .sort((a, b) => b.score - a.score || a.text.localeCompare(b.text))
      .map(({ score: _score, ...command }) => command);
  }, [query, allCommands]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            router.push(filteredCommands[selectedIndex].href);
            setQuery("");
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, router]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current && dropdownRef.current) {
      const dropdown = dropdownRef.current;
      const item = selectedItemRef.current;

      const dropdownRect = dropdown.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Check if item is below visible area
      if (itemRect.bottom > dropdownRect.bottom) {
        item.scrollIntoView({ block: "end", behavior: "smooth" });
      }
      // Check if item is above visible area
      else if (itemRect.top < dropdownRect.top) {
        item.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  const handleCommandClick = (href: string) => {
    router.push(href);
    setQuery("");
    setIsOpen(false);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeQuery = escapeRegExp(query);
    const parts = text.split(new RegExp(`(${safeQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="font-semibold text-neutral-900">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative border border-green-600 rounded-md">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search commands..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pr-8"
        />
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && filteredCommands.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto bg-white border border-neutral-200 rounded-md shadow-lg z-50"
        >
          {filteredCommands.map((command, index) => (
            <button
              key={command.href}
              ref={index === selectedIndex ? selectedItemRef : null}
              onClick={() => handleCommandClick(command.href)}
              className={`w-full px-3 py-2 text-left hover:bg-green-100 focus:bg-green-100 focus:outline-none ${
                index === selectedIndex ? "bg-green-100" : ""
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex flex-col gap-0.5">
                <code className="text-sm">{highlightMatch(command.text, query)}</code>
                <span className="text-xs text-neutral-500">{command.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && filteredCommands.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 p-3 bg-white border border-neutral-200 rounded-md shadow-lg z-50"
        >
          <p className="text-sm text-neutral-500">No commands found</p>
        </div>
      )}
    </div>
  );
}
