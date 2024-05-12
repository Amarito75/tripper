import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const timeFormatter = (time: string) => {
  const isoDateTime = time;
  const date = new Date(isoDateTime);

  // Formater la date en anglais
  const formattedDate = format(date, "eee, d MMMM yyyy", { locale: enUS });

  // Formater l'heure
  const formattedTime = format(date, "HH:mm");

  return { formattedDate, formattedTime };
};

export const formatCustomDuration = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return ""; // Si la durée n'est pas au format attendu, retourne une chaîne vide

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;

  return `${hours}h${minutes.toString().padStart(2, "0")}`;
};
