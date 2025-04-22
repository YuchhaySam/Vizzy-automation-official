import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export function convertDateFormat(date:string){
  dayjs.extend(customParseFormat);
  let finalDate: string = "Invalid Date";
  const dateInput = date;
  const inputFormat = 'MM/YYYY';
  const dayjsObject = dayjs(dateInput, inputFormat);
  if (!dayjsObject.isValid()) {
    console.error("Invalid date input:", dateInput);
  } else {
    const outputFormat = 'MMM YY';
    finalDate = dayjsObject.format(outputFormat);
  }
  return finalDate;
}

