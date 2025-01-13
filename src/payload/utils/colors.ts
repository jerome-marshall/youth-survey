export const colors = ["cyan", "orange", "red", "purple", "blue"] as const;

export const colorOptions = colors.map((color) => ({
  label: color.charAt(0).toUpperCase() + color.slice(1),
  value: color,
}));

export type Color = (typeof colors)[number];
