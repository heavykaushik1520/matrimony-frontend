import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string or Date object to a readable format
 * @param {string|Date} dateString - Date string or Date object
 * @param {string} format - Format type: 'short', 'long', 'medium' (default: 'medium')
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, format = 'medium') {
  if (!dateString) return '—';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return '—';
    
    const options = {
      short: { year: 'numeric', month: '2-digit', day: '2-digit' },
      medium: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
    };
    
    return date.toLocaleDateString('en-US', options[format] || options.medium);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '—';
  }
}

/**
 * Format an array to a comma-separated string
 * @param {Array|string} value - Array or string value
 * @param {string} separator - Separator to use (default: ', ')
 * @returns {string} Formatted string
 */
export function formatArray(value, separator = ', ') {
  if (!value) return '—';
  
  try {
    // If it's already a string, try to parse it as JSON
    if (typeof value === 'string') {
      // Check if it looks like a JSON array string
      const trimmed = value.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return parsed.filter(item => item).join(separator);
          }
        } catch {
          // If parsing fails, return the string as is
          return value;
        }
      }
      return value;
    }
    
    // If it's an array
    if (Array.isArray(value)) {
      // Handle malformed array like: ["[\"Reading\"", "\"Music\"", "\"Sports\"]"]
      // First, try joining and parsing as JSON
      const joined = value.join(',');
      if (joined.trim().startsWith('[') && joined.trim().endsWith(']')) {
        try {
          const parsed = JSON.parse(joined);
          if (Array.isArray(parsed)) {
            return parsed.filter(item => item && item.trim()).join(separator);
          }
        } catch {
          // Continue to cleaning process
        }
      }
      
      // Clean up escaped quotes and brackets from each item
      const cleaned = value.map(item => {
        if (typeof item === 'string') {
          // Remove leading/trailing brackets, quotes, and escape characters
          return item
            .replace(/^\[?"?\\?"?|\\?"?"?\]?$/g, '')
            .replace(/^"|"$/g, '')
            .trim();
        }
        return String(item).trim();
      }).filter(item => item && item.trim() !== '');
      
      return cleaned.length > 0 ? cleaned.join(separator) : '—';
    }
    
    return String(value);
  } catch (error) {
    console.error('Error formatting array:', error);
    return '—';
  }
}


// Dynamically load Razorpay Checkout script once
let razorpayScriptPromise = null;
export function loadRazorpayCheckout() {
  if (typeof window !== 'undefined' && window.Razorpay) {
    return Promise.resolve(true);
  }
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
}


