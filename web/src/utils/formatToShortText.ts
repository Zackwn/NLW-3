export const formatToShortText = (text: string): string => {
   return text.trim().length > 25
      ? `${text.trim().split('').slice(0, 22).join('')}...`
      : text.trim()
}