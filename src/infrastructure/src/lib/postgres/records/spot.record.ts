export interface SpotRecord {
  _id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  country: string;
  image_link: string;
  latitude: number;
  longitude: number;
  submitted_by: string;
  wifi_quality: number;
  creator_name: string;
  summary: string;
}
