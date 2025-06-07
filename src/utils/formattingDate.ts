/**
 * 날짜를 YYYY-MM-DD 형식의 문자열로 반환하는 함수
 * @returns {string} - YYYY-MM-DD 형식의 문자열
 */
export function formattingDate(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  console.log('formattingDate', month, date);
  const formattedYear = date.getFullYear();
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); // 0~11이므로 +1
  const formattedDay = String(date.getDate()).padStart(2, '0');

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}
