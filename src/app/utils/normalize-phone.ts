// utils/normalize-phone.ts
export function normalizePhone(phone: string): string {
  // Удаляем все символы, кроме цифр
  const digitsOnly = phone.replace(/\D/g, '');

  // Если начинается с '7' или '8', заменяем '7' на '8'
  if (digitsOnly.startsWith('7')) {
    return '8' + digitsOnly.substring(1);
  } else if (digitsOnly.startsWith('8')) {
    return digitsOnly;
  }

  // Если начинается с '9' (например, ввели сразу 9003456789), добавляем '8'
  if (digitsOnly.startsWith('9')) {
    return '8' + digitsOnly;
  }

  return digitsOnly;
}