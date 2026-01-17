/**
 * index.js
 *
 * Entry point for the admission/enrollment process.
 * Handles routing and orchestrates the admission flow.
 * Loaded at /admissionTab route. Not UI-heavy.
 *
 * This file is responsible ONLY for routing/navigation logic.
 * All UI and content is handled by admission.js and child components.
 */

import AdmissionPage from './admission';

export default function AdmissionEntry() {
  // This component acts as the flow controller for the admission process.
  // You can add navigation logic, context providers, or route guards here if needed.
  // For now, it simply renders the main AdmissionPage component.
  return <AdmissionPage />;
}
