import { BUSINESS_CONFIG } from '../data/masterData';

export function getWhatsAppUrl(customMessage?: string): string {
  const baseNumber = BUSINESS_CONFIG.whatsappNumber;
  const defaultText = 'Hello Discovery Home Tuition, I need a home tutor for my child.';
  const message = customMessage || defaultText;
  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppRequirementUrl(details: {
  studentClass?: string;
  subject?: string;
  board?: string;
  area?: string;
  parentName?: string;
}): string {
  let message = `Hello Discovery Home Tuition,\nI need a verified home tutor for my child in Orai.`;
  if (details.studentClass) message += `\n• Class: ${details.studentClass}`;
  if (details.board) message += `\n• Board: ${details.board}`;
  if (details.subject) message += `\n• Subject: ${details.subject}`;
  if (details.area) message += `\n• Locality/Area: ${details.area}, Orai`;
  if (details.parentName) message += `\n• Parent Name: ${details.parentName}`;
  message += `\nPlease share suitable tutor profiles and schedule a Free Demo.`;
  return getWhatsAppUrl(message);
}

export function getWhatsAppDemoUrl(details: {
  studentName?: string;
  studentClass?: string;
  subject?: string;
  area?: string;
  preferredDate?: string;
}): string {
  let message = `Hello Discovery Home Tuition,\nI would like to book a Free Demo Class in Orai.`;
  if (details.studentName) message += `\n• Student: ${details.studentName}`;
  if (details.studentClass) message += `\n• Class: ${details.studentClass}`;
  if (details.subject) message += `\n• Subject: ${details.subject}`;
  if (details.area) message += `\n• Area: ${details.area}`;
  if (details.preferredDate) message += `\n• Preferred Date: ${details.preferredDate}`;
  message += `\nPlease confirm tutor availability.`;
  return getWhatsAppUrl(message);
}

export function getWhatsAppTutorConnectUrl(tutorName: string, qualification: string): string {
  const message = `Hello Discovery Home Tuition,\nI am interested in booking a Free Demo Class with tutor *${tutorName}* (${qualification}) in Orai. Please share details.`;
  return getWhatsAppUrl(message);
}

export function getCallUrl(): string {
  return `tel:${BUSINESS_CONFIG.phone}`;
}
