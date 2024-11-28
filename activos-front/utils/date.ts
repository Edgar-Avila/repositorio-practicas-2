export function formatDate(inputDate: string) {
  if(/^(\d{4})-(\d{2})-(\d{2})$/.test(inputDate)) {
    const [year, month, day] = inputDate.split('-');
    return `${day}/${month}/${year}`;
  }
  if(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)$/.test(inputDate)) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    const [hour, minute, second] = inputDate.split('T')[1].split('.')[0].split(':');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  if(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/.test(inputDate)) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    const [hour, minute, second] = inputDate.split('T')[1].split(':');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  if(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(inputDate)) {
    const [year, month, day] = inputDate.split(' ')[0].split('-');
    const [hour, minute, second] = inputDate.split(' ')[1].split(':');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  if(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(inputDate)) {
    const [year, month, day] = inputDate.split('T')[0].split('-');
    const [hour, minute, second] = inputDate.split('T')[1].split('Z')[0].split(':');
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  return inputDate;
}