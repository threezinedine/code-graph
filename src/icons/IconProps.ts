import { BOLD_ICON_STROKE_WIDTH, NORMAL_ICON_STROKE_WIDTH } from "~/constants";

export const strokeWidths = {
	normal: NORMAL_ICON_STROKE_WIDTH,
	bold: BOLD_ICON_STROKE_WIDTH,
} as const;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	variant: keyof typeof strokeWidths;
}
